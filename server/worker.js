/* ------------------------------------------------------------------
   Land of Doodads - the scores server
   A Cloudflare Worker in front of a D1 database. Two calls:

     GET  /top?level=backyard.coop&player=...
          the level's top ten, and where `player` stands on it
     POST /score   { level, player, name, doodad, score, time }
          a player's best on a level; kept only if it beats the last one

   The game sends its POST as text/plain on purpose. A JSON content type
   makes the browser ask permission first with an OPTIONS request, and
   that doubles every score against a free plan that counts requests.
------------------------------------------------------------------ */

const TOP = 10;

const LEVEL = /^[a-z0-9-]{1,24}\.[a-z0-9-]{1,24}$/;
const PLAYER = /^[a-z0-9]{16,32}$/;
const DOODAD = /^[a-z0-9-]{1,24}$/;
const NAME = /^[A-Z0-9 ]{3}$/;

/* A browser game cannot be made cheat-proof - whoever is playing can open
   the developer tools and send any number they like - so these are not a
   lock, only a doorstop against the lazy version. The best a single pillar
   can pay today is about twelve (spicy, tight, and a doodad that doubles
   planks), so twenty-five a second flown is far more than any honest run.
   A score sent without a time is a best saved before this server existed,
   and is held only to the ceiling. */
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

/* where a stored best stands: everyone strictly above it, and everyone
   level with it who got there first */
function rankOf(env, level, score, at) {
  return env.DB.prepare(
    'SELECT COUNT(*) AS above FROM scores WHERE level = ?1 AND (score > ?2 OR (score = ?2 AND at < ?3))'
  ).bind(level, score, at);
}

function totalOf(env, level) {
  return env.DB.prepare('SELECT players FROM levels WHERE level = ?1').bind(level);
}

async function top(url, env) {
  const level = url.searchParams.get('level') || '';
  const player = url.searchParams.get('player') || '';
  if (!LEVEL.test(level)) return reply({ error: 'level' }, 400);

  const [board, total, mine] = await env.DB.batch([
    env.DB.prepare(
      'SELECT player, name, doodad, score, country FROM scores WHERE level = ?1 ORDER BY score DESC, at ASC LIMIT ?2'
    ).bind(level, TOP),
    totalOf(env, level),
    env.DB.prepare('SELECT score, at FROM scores WHERE level = ?1 AND player = ?2').bind(level, player)
  ]);

  /* `player` never leaves the server: it is the one thing that lets a run
     write to a row, so the board says only which row is yours */
  const rows = board.results.map(function (r) {
    return { name: r.name, doodad: r.doodad, score: r.score, country: r.country, me: r.player === player };
  });
  const players = total.results.length ? total.results[0].players : 0;

  let you = null;
  if (PLAYER.test(player) && mine.results.length) {
    const m = mine.results[0];
    const above = await rankOf(env, level, m.score, m.at).first('above');
    you = { score: m.score, rank: above + 1 };
  }
  return reply({ level: level, rows: rows, total: players, you: you });
}

async function submit(request, env) {
  const raw = await request.text();
  if (raw.length > 1024) return reply({ error: 'size' }, 413);
  let b;
  try { b = JSON.parse(raw); } catch (e) { return reply({ error: 'json' }, 400); }
  if (!b || typeof b !== 'object') return reply({ error: 'json' }, 400);

  const level = String(b.level || ''), player = String(b.player || '');
  const doodad = String(b.doodad || ''), score = b.score;
  let name = String(b.name || '').toUpperCase();
  if (!LEVEL.test(level) || !PLAYER.test(player) || !DOODAD.test(doodad)) return reply({ error: 'fields' }, 400);
  if (!NAME.test(name)) return reply({ error: 'name' }, 400);
  if (!Number.isInteger(score) || score < 1 || score > CEILING) return reply({ error: 'score' }, 422);
  if (b.time !== undefined && b.time !== null) {
    const time = b.time;
    if (typeof time !== 'number' || !(time >= 0) || time > 86400) return reply({ error: 'time' }, 400);
    if (score > HEADROOM + PER_SECOND * time) return reply({ error: 'score' }, 422);
  }

  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  if (env.POSTS) {
    const gate = await env.POSTS.limit({ key: ip });
    if (!gate.success) return reply({ error: 'slow down' }, 429);
  }

  if (!name.trim()) name = 'AAA';
  if (BLOCKED.has(name)) name = '???';
  /* Cloudflare's guess from the address, which is all that is kept of it.
     XX is "could not tell" and T1 is Tor; neither is a country. */
  let country = (request.cf && request.cf.country) || '';
  if (!/^[A-Z]{2}$/.test(country) || country === 'XX' || country === 'T1') country = '';

  const now = Date.now();
  const had = await env.DB.prepare('SELECT score, at FROM scores WHERE level = ?1 AND player = ?2')
                          .bind(level, player).first();

  let best = score, at = now;
  if (!had) {
    await env.DB.batch([
      env.DB.prepare(
        'INSERT INTO scores (level, player, name, doodad, score, country, at) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)'
      ).bind(level, player, name, doodad, score, country, now),
      env.DB.prepare(
        'INSERT INTO levels (level, players) VALUES (?1, 1) ON CONFLICT (level) DO UPDATE SET players = players + 1'
      ).bind(level)
    ]);
  } else if (score > had.score) {
    await env.DB.prepare(
      'UPDATE scores SET name = ?3, doodad = ?4, score = ?5, country = ?6, at = ?7 WHERE level = ?1 AND player = ?2'
    ).bind(level, player, name, doodad, score, country, now).run();
  } else {
    /* not a better run: nothing is written, and the answer is where the
       best they already have stands */
    best = had.score; at = had.at;
  }

  const [above, total] = await env.DB.batch([rankOf(env, level, best, at), totalOf(env, level)]);
  return reply({
    level: level, best: best,
    rank: above.results[0].above + 1,
    total: total.results.length ? total.results[0].players : 1
  });
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
    const url = new URL(request.url);
    try {
      if (url.pathname === '/top' && request.method === 'GET') return await top(url, env);
      if (url.pathname === '/score' && request.method === 'POST') return await submit(request, env);
      if (url.pathname === '/') return reply({ game: 'Land of Doodads', board: 'everyone' });
      return reply({ error: 'not found' }, 404);
    } catch (e) {
      console.error(e && e.stack || e);
      return reply({ error: 'server' }, 500);
    }
  }
};
