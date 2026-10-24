-- Land of Doodads - everyone's high scores
--
-- Every run, arcade style: the same initials can hold the whole top ten
-- if they earned it, the way they can on the table in the game. `player`
-- is a random id the game makes once per browser and never shows anyone;
-- `run` is the game's own name for the run (the moment it was saved to
-- the player's table), so a run that is sent twice is still one run.
--
-- Apply with:
--   npx wrangler@4.147.0 d1 execute doodads-scores --remote --file=schema.sql

CREATE TABLE IF NOT EXISTS runs (
  id      INTEGER PRIMARY KEY AUTOINCREMENT,  -- a tie goes to the lower: the run that got there first
  level   TEXT    NOT NULL,                   -- 'backyard.coop': room id . level id
  player  TEXT    NOT NULL,
  run     TEXT    NOT NULL,
  name    TEXT    NOT NULL,                   -- three letters
  doodad  TEXT    NOT NULL DEFAULT '',        -- who flew it; '' for runs older than the doodads
  score   INTEGER NOT NULL,
  country TEXT    NOT NULL DEFAULT '',        -- two letters, from Cloudflare
  device  TEXT    NOT NULL DEFAULT '',        -- 'phone', 'tablet' or 'computer'
  at      INTEGER NOT NULL,                   -- ms since 1970, when the server got it
  UNIQUE (level, player, run)
);

-- the board itself, and the count of every run above a given one
CREATE INDEX IF NOT EXISTS runs_board ON runs (level, score DESC);

-- How many players each level has. Kept as a counter rather than counted,
-- because D1 bills a COUNT(*) as every row it walks past.
CREATE TABLE IF NOT EXISTS levels (
  level   TEXT    PRIMARY KEY,
  players INTEGER NOT NULL DEFAULT 0
);
