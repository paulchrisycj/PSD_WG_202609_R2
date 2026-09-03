// ============================================
// League Stats Tracker
// ============================================
// Complete each function below.
// Open index.html in your browser to run the tests.
//
// 💡 Debugging tip: if you're stuck or a function isn't returning what
// you expect, console.log() your inputs and your outputs! Log the
// parameters at the top of the function, and log the value right
// before you return it. See the console.log(players) inside
// getPlayerNames below for an example — open your browser's console
// (usually F12 or Cmd+Option+J) to see what it prints.
// ============================================

// Each player has the following shape:
// {
//   name:          string   — player's name
//   team:          string   — e.g. "Hawks", "Wolves", "Sharks"
//   position:      string   — "Guard" | "Forward" | "Center"
//   points:        number[] — points scored in each game this season
//   minutesPlayed: number   — average minutes played per game (0–48)
// }

// ============================================
// EXAMPLE (already done for you!)
// ============================================

/**
 * EXAMPLE — this one is already finished. Read it before you start.
 *
 * Returns an array of every player's name, in the same order as the
 * input array.
 *
 * This shows the basic pattern you'll reuse for the rest of the
 * challenge: take the `players` array, use an array method to pull
 * out exactly what you need, and return a new array.
 *
 * @param {Array} players
 * @returns {string[]}
 *
 * Example:
 *   getPlayerNames(players)
 *   // => ["Maya", "Owen", "Diego", ...]
 */
function getPlayerNames(players) {
  console.log(players) // Open your console in your browser
  return players.map(player => player.name);
}

// ============================================
// CORE FUNCTIONS
// ============================================

/**
 * Returns the average points per game for a single player.
 * If the player has no points, return 0.
 *
 * Hint: you will find this function useful when writing
 * many of the other functions below! Try destructuring
 * `points` straight out of the parameter list.
 *
 * @param {{ name: string, team: string, position: string, points: number[], minutesPlayed: number }} player
 * @returns {number}
 *
 * Example:
 *   getPlayerAverage({ name: "Maya", team: "Hawks", position: "Guard", points: [24, 30, 30], minutesPlayed: 34 })
 *   // => 28
 */
function getPlayerAverage(player) {
  // TODO: your code here
}

/**
 * Returns the average points per game across all players on a given team.
 * Each player contributes their own average as a single data point.
 * If no players match the team, return 0.
 *
 * @param {Array} players
 * @param {string} team
 * @returns {number}
 */
function getTeamAverage(players, team) {
  // TODO: your code here
}

/**
 * Returns the player object with the highest average points per game.
 * Returns null if the array is empty.
 * If multiple players share the highest average, returns the first one found.
 *
 * @param {Array} players
 * @returns {Object|null}
 */
function getTopScorer(players) {
  // TODO: your code here
}

/**
 * Returns a new array containing only players who play the given position.
 * The match is case-sensitive. If no players match, return an empty array.
 *
 * @param {Array} players
 * @param {string} position
 * @returns {Array}
 */
function getPositionGroup(players, position) {
  // TODO: your code here
}

/**
 * Returns a formatted string describing the player:
 *   "<name> (<position>, <team>) — <avg> ppg"
 * The average is rounded to one decimal place.
 *
 * @param {Object} player
 * @returns {string}
 *
 * Example:
 *   getPlayerSummary({ name: "Maya", team: "Hawks", position: "Guard", points: [24, 30, 30], minutesPlayed: 34 })
 *   // => "Maya (Guard, Hawks) — 28.0 ppg"
 */
function getPlayerSummary(player) {
  // TODO: your code here
}

// ============================================
// STRETCH GOALS
// ============================================

/**
 * Returns a new array where each player object has an added `allStar`
 * property (true/false) based on whether their average points per game
 * is greater than or equal to threshold.
 *
 * Do NOT modify the original array or its objects.
 *
 * @param {Array} players
 * @param {number} threshold
 * @returns {Array}
 *
 * Example:
 *   tagAllStars(players, 20)
 *   // => [
 *   //   { name: "Maya", ..., allStar: true  },  // avg 28
 *   //   { name: "Owen", ..., allStar: false },  // avg 18
 *   //   ...
 *   // ]
 */
function tagAllStars(players, threshold) {
  // TODO: your code here
}

/**
 * Returns a new array containing players who are considered "bench risks".
 * A player is a bench risk if EITHER of the following is true:
 *   - Their average points per game is below minAvg
 *   - Their minutesPlayed is below minMinutes
 *
 * @param {Array} players
 * @param {number} minAvg
 * @param {number} minMinutes
 * @returns {Array}
 *
 * Example:
 *   getBenchWarmers(players, 15, 20)
 *   // => [ Diego, Liam, Ruby ]
 */
function getBenchWarmers(players, minAvg, minMinutes) {
  // TODO: your code here
}

/**
 * Returns a new array with one entry per team — { team, average, rank } —
 * sorted by team average points per game descending (1 = highest).
 *
 * Teams with equal averages share the same rank, and the next rank
 * is skipped (e.g. two teams at rank 1 means the next rank is 3).
 *
 * Do NOT modify the original players array or its objects.
 *
 * Tip: try grouping players into a plain object keyed by team name,
 * then use Object.entries() to turn that object back into an array
 * you can map() and sort().
 *
 * @param {Array} players
 * @returns {Array}
 *
 * Example:
 *   getTeamStandings(players)
 *   // => [
 *   //   { team: "Hawks",  average: 19.5,  rank: 1 },
 *   //   { team: "Wolves", average: 19.5,  rank: 1 },
 *   //   { team: "Sharks", average: 19.25, rank: 3 },
 *   // ]
 */
function getTeamStandings(players) {
  // TODO: your code here
}
