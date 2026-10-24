-- Land of Doodads - everyone's high scores
--
-- One row per player per level: their best, and nothing else. An arcade
-- table on one machine can hold the same initials ten times over, but a
-- board for the whole world that did that would be one keen player's
-- top ten. `player` is a random id the game makes once per browser and
-- never shows anyone; it is how a second run finds the first one's row.
--
-- Apply with:
--   npx wrangler@4.147.0 d1 execute doodads-scores --remote --file=schema.sql

CREATE TABLE IF NOT EXISTS scores (
  level   TEXT    NOT NULL,              -- 'backyard.coop': room id . level id
  player  TEXT    NOT NULL,
  name    TEXT    NOT NULL,              -- three letters
  doodad  TEXT    NOT NULL,              -- who flew it
  score   INTEGER NOT NULL,
  country TEXT    NOT NULL DEFAULT '',   -- two letters, from Cloudflare
  at      INTEGER NOT NULL,              -- ms since 1970; a tie goes to the earlier
  PRIMARY KEY (level, player)
);

-- the board itself, and the count of everyone above a given score
CREATE INDEX IF NOT EXISTS scores_board ON scores (level, score DESC, at);

-- How many players each level has. Kept as a counter rather than counted,
-- because D1 bills a COUNT(*) as every row it walks past, and "312th of
-- 4,881" would cost 4,881 reads every time somebody looked at it.
CREATE TABLE IF NOT EXISTS levels (
  level   TEXT    PRIMARY KEY,
  players INTEGER NOT NULL DEFAULT 0
);
