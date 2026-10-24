/* ------------------------------------------------------------------
   Land of Doodads - the scores server
   A Cloudflare Worker in front of a D1 database. The board is arcade
   style: every run counts, so one player can hold several places.

     GET  /top?level=backyard.coop&player=...
          the level's ten best runs, and where `player`'s best stands
     POST /runs   { level, player, runs: [{ run, name, doodad, score, time }] }
          up to a dozen runs on one level - a run that has been sent
          before is the same run, not another one

   The game sends its POST as text/plain on purpose. A JSON content type
   makes the browser ask permission first with an OPTIONS request, and
   that doubles every send against a free plan that counts requests.
------------------------------------------------------------------ */

const TOP = 10;
const MAX_RUNS = 12;          /* a whole table, plus a best that fell off it */

const LEVEL = /^[a-z0-9-]{1,24}\.[a-z0-9-]{1,24}$/;
const PLAYER = /^[a-z0-9]{16,32}$/;
const RUN = /^[a-z0-9]{1,20}$/;      /* when the run was saved, or 'pb' */
const DOODAD = /^[a-z0-9-]{0,24}$/;  /* empty for runs older than the doodads */
const NAME = /^[A-Z0-9 ]{3}$/;

/* A browser game cannot be made cheat-proof - whoever is playing can open
   the developer tools and send any number they like - so these are not a
   lock, only a doorstop against the lazy version. The best a single pillar
   can pay today is about twelve (spicy, tight, and a doodad that doubles
   planks), so twenty-five a second flown is far more than any honest run.
   A run sent without a time is one saved before it could be sent, and is
   held only to the ceiling. */
const CEILING = 100000;
const PER_SECOND = 25, HEADROOM = 30;

/* Initials an arcade would not put on its wall. Three letters do not leave
   room for much, and this is the whole of what they can spell. A name on
   the list is kept as ??? rather than refused, so the score still counts. */
const BLOCKED = new Set([
  'ASS', 'A55', 'AZZ', 'CUM', 'CNT', 'COK', 'COC', 'DIK', 'DIC', 'DIX',
  'FAG', 'FCK', 'FKU', 'FUC', 'FUK', 'FUQ', 'FUX', 'JIZ', 'KKK', 'KUM',
  'KYS', 'NGA', 'NGR', 'NIG', 'PIS', 'SHT', 'SUK', 'TIT', 'TWT', 'VAG',
  'WTF', 'XXX', 'SEX', 'HO3', 'HOE'
]);

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400'
};

function reply(body, status) {
  return new Response(JSON.stringify(body), {
    status: status || 200,
    headers: Object.assign({ 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }, CORS)
  });
}

/* Where a stored run stands: every run strictly above it, and every run
   level with it that got there first. "First" is the row id, which only
   ever grows, so it is the order the server heard about them in. */
function above(env, level, score, id) {
  return env.DB.prepare(
    'SELECT COUNT(*) AS n FROM runs WHERE level = ?1 AND (score > ?2 OR (score = ?2 AND id < ?3))'
  ).bind(level, score, id);
}

function playersOf(env, level) {
  return env.DB.prepare('SELECT players FROM levels WHERE level = ?1').bind(level);
}

function bestOf(env, level, player) {
  return env.DB.prepare(
    'SELECT id, score FROM runs WHERE level = ?1 AND player = ?2 ORDER BY score DESC, id ASC LIMIT 1'
  ).bind(level, player);
}

function count(result) {
  return result.results.length ? result.results[0].players : 0;
}

async function top(url, env) {
  const level = url.searchParams.get('level') || '';
  const player = url.searchParams.get('player') || '';
  if (!LEVEL.test(level)) return reply({ error: 'level' }, 400);

  const [board, players, mine] = await env.DB.batch([
    env.DB.prepare(
      'SELECT player, name, doodad, score, country FROM runs WHERE level = ?1 ORDER BY score DESC, id ASC LIMIT ?2'
    ).bind(level, TOP),
    playersOf(env, level),
    bestOf(env, level, player)
  ]);

  /* `player` never leaves the server: it is the one thing that lets a run
     be written under somebody's name, so the board says only which rows
     are yours */
  const rows = board.results.map(function (r) {
    return { name: r.name, doodad: r.doodad, score: r.score, country: r.country, me: r.player === player };
  });

  let you = null;
  if (PLAYER.test(player) && mine.results.length) {
    const m = mine.results[0];
    const n = await above(env, level, m.score, m.id).first('n');
    you = { score: m.score, rank: n + 1 };
  }
  return reply({ level: level, rows: rows, total: count(players), you: you });
}

/* one run off the wire, or the reason it was turned down */
function checkRun(r) {
  if (!r || typeof r !== 'object') return { error: 'run', status: 400 };
  const run = String(r.run || ''), doodad = String(r.doodad || ''), score = r.score;
  let name = String(r.name || '').toUpperCase();
  if (!RUN.test(run) || !DOODAD.test(doodad) || !NAME.test(name)) return { error: 'fields', status: 400 };
  if (!Number.isInteger(score) || score < 1 || score > CEILING) return { error: 'score', status: 422 };
  if (r.time !== undefined && r.time !== null) {
    const time = r.time;
    if (typeof time !== 'number' || !(time >= 0) || time > 86400) return { error: 'time', status: 400 };
    if (score > HEADROOM + PER_SECOND * time) return { error: 'score', status: 422 };
  }
  if (!name.trim()) name = 'AAA';
  if (BLOCKED.has(name)) name = '???';
  return { run: run, name: name, doodad: doodad, score: score };
}

async function keep(request, env, level, player, runs) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  if (env.POSTS) {
    const gate = await env.POSTS.limit({ key: ip });
    if (!gate.success) return { error: 'slow down', status: 429 };
  }

  /* Cloudflare's guess from the address, which is all that is kept of it.
     XX is "could not tell" and T1 is Tor; neither is a country. */
  let country = (request.cf && request.cf.country) || '';
  if (!/^[A-Z]{2}$/.test(country) || country === 'XX' || country === 'T1') country = '';

  const now = Date.now();
  const known = await env.DB.prepare('SELECT 1 FROM runs WHERE level = ?1 AND player = ?2 LIMIT 1')
                            .bind(level, player).first();
  /* a run sent again is the same run; it only ever moves up, which is how
     the one run called 'pb' - a best that fell off its player's table -
     follows that player's best */
  const writes = runs.map(function (r) {
    return env.DB.prepare(
      'INSERT INTO runs (level, player, run, name, doodad, score, country, at) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8) ' +
      'ON CONFLICT (level, player, run) DO UPDATE SET name = excluded.name, doodad = excluded.doodad, ' +
      'score = excluded.score, country = excluded.country, at = excluded.at WHERE excluded.score > runs.score'
    ).bind(level, player, r.run, r.name, r.doodad, r.score, country, now);
  });
  if (!known) {
    writes.push(env.DB.prepare(
      'INSERT INTO levels (level, players) VALUES (?1, 1) ON CONFLICT (level) DO UPDATE SET players = players + 1'
    ).bind(level));
  }
  await env.DB.batch(writes);

  /* where each run stands now - as stored, which for a resend of a lower
     score is the higher one already there */
  const stored = await env.DB.prepare('SELECT id, run, score FROM runs WHERE level = ?1 AND player = ?2')
                             .bind(level, player).all();
  const byRun = {};
  stored.results.forEach(function (s) { byRun[s.run] = s; });
  let best = null;
  stored.results.forEach(function (s) {
    if (!best || s.score > best.score || (s.score === best.score && s.id < best.id)) best = s;
  });
  const asks = runs.map(function (r) { return above(env, level, byRun[r.run].score, byRun[r.run].id); });
  asks.push(above(env, level, best.score, best.id), playersOf(env, level));
  const answers = await env.DB.batch(asks);
  const players = count(answers.pop());
  const bestAbove = answers.pop().results[0].n;
  return {
    level: level,
    ranks: answers.map(function (a) { return a.results[0].n + 1; }),
    best: { score: best.score, rank: bestAbove + 1 },
    players: players
  };
}

async function body(request) {
  const raw = await request.text();
  if (raw.length > 4096) return null;
  try {
    const b = JSON.parse(raw);
    return b && typeof b === 'object' ? b : null;
  } catch (e) { return null; }
}

async function submit(request, env) {
  const b = await body(request);
  if (!b) return reply({ error: 'json' }, 400);
  const level = String(b.level || ''), player = String(b.player || '');
  if (!LEVEL.test(level) || !PLAYER.test(player)) return reply({ error: 'fields' }, 400);
  if (!Array.isArray(b.runs) || !b.runs.length || b.runs.length > MAX_RUNS) return reply({ error: 'runs' }, 400);
  const runs = [];
  for (const r of b.runs) {
    const v = checkRun(r);
    if (v.error) return reply({ error: v.error }, v.status);
    if (runs.some(function (x) { return x.run === v.run; })) return reply({ error: 'twice' }, 400);
    runs.push(v);
  }
  const out = await keep(request, env, level, player, runs);
  return out.error ? reply({ error: out.error }, out.status) : reply(out);
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
    const url = new URL(request.url);
    try {
      if (url.pathname === '/top' && request.method === 'GET') return await top(url, env);
      if (url.pathname === '/runs' && request.method === 'POST') return await submit(request, env);
      /* The first board kept one best per player, and a copy of the game
         from that afternoon still sends it here. Taking it would put that
         best on the board twice once the copy is updated - the update sends
         the player's whole table, the same run included - so it is turned
         down in the way that copy reads as "do not send this again". */
      if (url.pathname === '/score' && request.method === 'POST') return reply({ error: 'retired' }, 422);
      if (url.pathname === '/') return reply({ game: 'Land of Doodads', board: 'everyone' });
      return reply({ error: 'not found' }, 404);
    } catch (e) {
      console.error(e && e.stack || e);
      return reply({ error: 'server' }, 500);
    }
  }
};
