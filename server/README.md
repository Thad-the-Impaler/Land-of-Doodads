# Everyone's high scores

The game's own tables (MY SCORES) live in each player's browser. The
EVERYONE board lives here: a Cloudflare Worker (`worker.js`) in front of a
D1 database (`schema.sql`), on Cloudflare's free plan. The game talks to it
from `js/world.js`.

Every command below runs from this `server/` folder. Wrangler is not
installed into the project (that would put `node_modules` in iCloud); `npx`
fetches the pinned version into its own cache.

## Deploying a change to the server

```bash
npx wrangler@4.147.0 deploy
```

## Looking at the board

```bash
npx wrangler@4.147.0 d1 execute doodads-scores --remote --command "SELECT level, name, doodad, score, country, datetime(at/1000,'unixepoch') AS at FROM runs ORDER BY level, score DESC LIMIT 50"
```

Or in the dashboard: **Storage & databases → D1 → doodads-scores → Console**.

## Removing a score that is obviously fake

Find it with the query above, then delete it by level and score:

```bash
npx wrangler@4.147.0 d1 execute doodads-scores --remote --command "DELETE FROM runs WHERE level = 'backyard.coop' AND score = 99999"
```

The player counts in the `levels` table are left alone. They count everyone
who has ever posted to a level, which is the "37 PLAYERS" on the board.

## What it checks, and what it cannot

- Arcade style: every run that made a player's own table, so one player can
  hold several places. A run is named by when it was saved, so sending it
  twice still makes it one run.
- A score must be a whole number from 1 to 100,000, and no more than
  30 + 25 points for every second flown.
- Thirty posts a minute from any one address.
- Initials an arcade would not put up are stored as `???`.

None of that stops a determined cheat: a browser game cannot keep a secret
from the person playing it. These checks stop the lazy version, and the
DELETE above handles the rest.

## What it keeps about people

Three letters, a doodad, a score, the time, a two-letter country (Cloudflare's
guess from the connection), and a random id the game makes once per browser.
No IP addresses, names or emails.

## Free plan limits

100,000 requests a day (each run that makes a player's own table is one; each
level looked at on the EVERYONE tab is one a minute at most), 5 million rows
read and 100,000 written a day, 5 GB stored. Past a daily limit the board
says OFFLINE until midnight UTC; nothing is lost.
