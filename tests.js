// ============================================
// League Stats Tracker — Test Suite
// ============================================
// This file is shared by Question/ and Solution/.
// It expects the following functions to be defined
// by solution.js, which must be loaded first:
//   getPlayerAverage, getTeamAverage, getTopScorer,
//   getPositionGroup, getPlayerSummary, tagAllStars,
//   getBenchWarmers, getTeamStandings
// ============================================

function runTests() {
  const output = document.getElementById("test-output");
  const summary = document.getElementById("summary");
  output.innerHTML = "";
  summary.style.display = "none";

  let passed = 0;
  let failed = 0;

  // ---- Helpers ----

  function deepEqual(a, b) {
    if (a === b) return true;
    if (a === null || b === null) return a === b;
    if (typeof a !== typeof b) return false;
    if (typeof a !== "object") return a === b;
    if (Array.isArray(a) !== Array.isArray(b)) return false;
    const keysA = Object.keys(a), keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    return keysA.every(k => deepEqual(a[k], b[k]));
  }

  function fmt(val) {
    return JSON.stringify(val);
  }

  function addSectionTitle(label) {
    const el = document.createElement("div");
    el.className = "test-section-title";
    el.textContent = label;
    output.appendChild(el);
  }

  function test(name, fn) {
    const el = document.createElement("div");
    const body = document.createElement("div");
    body.className = "test-body";

    try {
      const result = fn();
      if (result === true) {
        el.className = "test-case pass";
        el.innerHTML = `<span class="icon">&#10003;</span>`;
        body.innerHTML = `<div class="test-name">${name}</div>`;
        passed++;
      } else {
        el.className = "test-case fail";
        el.innerHTML = `<span class="icon">&#10007;</span>`;
        body.innerHTML = `<div class="test-name">${name}</div>
          <div class="test-detail">${result}</div>`;
        failed++;
      }
    } catch (e) {
      el.className = "test-case fail";
      el.innerHTML = `<span class="icon">&#10007;</span>`;
      body.innerHTML = `<div class="test-name">${name}</div>
        <div class="test-detail">Error: ${e.message}</div>`;
      failed++;
    }

    el.appendChild(body);
    output.appendChild(el);
  }

  // Same rendering as test(), but for the worked example only — it does
  // NOT count toward passed/failed, so the final score always reflects
  // just the 40 graded test cases below.
  function demoTest(name, fn) {
    const el = document.createElement("div");
    const body = document.createElement("div");
    body.className = "test-body";

    try {
      const result = fn();
      if (result === true) {
        el.className = "test-case pass";
        el.innerHTML = `<span class="icon">&#10003;</span>`;
        body.innerHTML = `<div class="test-name">${name}</div>`;
      } else {
        el.className = "test-case fail";
        el.innerHTML = `<span class="icon">&#10007;</span>`;
        body.innerHTML = `<div class="test-name">${name}</div>
          <div class="test-detail">${result}</div>`;
      }
    } catch (e) {
      el.className = "test-case fail";
      el.innerHTML = `<span class="icon">&#10007;</span>`;
      body.innerHTML = `<div class="test-name">${name}</div>
        <div class="test-detail">Error: ${e.message}</div>`;
    }

    el.appendChild(body);
    output.appendChild(el);
  }

  // ---- Test data ----
  // Averages: Maya=28, Owen=18, Diego=11, Priya=21, Noah=32, Zara=15,
  //           Liam=9, Sofia=22, Ethan=20, Ivy=29, Ruby=7, Kai=21
  // Team averages: Hawks=19.5, Wolves=19.5 (tied), Sharks=19.25
  // Positions:
  //   Guard:   Maya, Priya, Zara, Ivy
  //   Forward: Owen, Noah, Sofia, Ruby
  //   Center:  Diego, Liam, Ethan, Kai
  // Noah is NOT the first element — top scorer must be found by logic

  const maya  = { name: "Maya",  team: "Hawks",  position: "Guard",   points: [24, 30, 30], minutesPlayed: 34 };
  const owen  = { name: "Owen",  team: "Hawks",  position: "Forward", points: [16, 18, 20], minutesPlayed: 22 };
  const diego = { name: "Diego", team: "Hawks",  position: "Center",  points: [10, 12, 11], minutesPlayed: 15 };
  const priya = { name: "Priya", team: "Hawks",  position: "Guard",   points: [20, 22, 21], minutesPlayed: 28 };
  const noah  = { name: "Noah",  team: "Wolves", position: "Forward", points: [30, 33, 33], minutesPlayed: 36 };
  const zara  = { name: "Zara",  team: "Wolves", position: "Guard",   points: [14, 16, 15], minutesPlayed: 20 };
  const liam  = { name: "Liam",  team: "Wolves", position: "Center",  points: [8, 10, 9],   minutesPlayed: 12 };
  const sofia = { name: "Sofia", team: "Wolves", position: "Forward", points: [20, 22, 24], minutesPlayed: 26 };
  const ethan = { name: "Ethan", team: "Sharks", position: "Center",  points: [18, 21, 21], minutesPlayed: 24 };
  const ivy   = { name: "Ivy",   team: "Sharks", position: "Guard",   points: [28, 30, 29], minutesPlayed: 33 };
  const ruby  = { name: "Ruby",  team: "Sharks", position: "Forward", points: [6, 8, 7],    minutesPlayed: 10 };
  const kai   = { name: "Kai",   team: "Sharks", position: "Center",  points: [20, 22, 21], minutesPlayed: 27 };

  const players = [maya, owen, diego, priya, noah, zara, liam, sofia, ethan, ivy, ruby, kai];

  // ============================================
  // getPlayerNames (example — already done for you, not scored)
  // ============================================

  addSectionTitle("getPlayerNames (example — already done for you)");

  demoTest("Returns an array of every player's name, in order", () => {
    const result = getPlayerNames(players);
    const expected = players.map(p => p.name);
    return deepEqual(result, expected)
      ? true
      : `Expected ${fmt(expected)}, got ${fmt(result)}`;
  });

  demoTest("Returns an empty array when given no players", () => {
    const result = getPlayerNames([]);
    return Array.isArray(result) && result.length === 0
      ? true
      : `Expected [], got ${fmt(result)}`;
  });

  // ============================================
  // getPlayerAverage
  // ============================================

  addSectionTitle("getPlayerAverage");

  test("Returns the correct average for Maya (24, 30, 30 → 28)", () => {
    const result = getPlayerAverage(maya);
    return result === 28 ? true : `Expected 28, got ${fmt(result)}`;
  });

  test("Returns the correct average for Sofia (20, 22, 24 → 22)", () => {
    const result = getPlayerAverage(sofia);
    return result === 22 ? true : `Expected 22, got ${fmt(result)}`;
  });

  test("Returns the correct average for Ruby (6, 8, 7 → 7)", () => {
    const result = getPlayerAverage(ruby);
    return result === 7 ? true : `Expected 7, got ${fmt(result)}`;
  });

  test("Returns 0 when points array is empty", () => {
    const result = getPlayerAverage({ name: "X", team: "Hawks", position: "Guard", points: [], minutesPlayed: 10 });
    return result === 0 ? true : `Expected 0, got ${fmt(result)}`;
  });

  test("Works correctly with a single score", () => {
    const result = getPlayerAverage({ name: "X", team: "Hawks", position: "Guard", points: [17], minutesPlayed: 10 });
    return result === 17 ? true : `Expected 17, got ${fmt(result)}`;
  });

  // ============================================
  // getTeamAverage
  // ============================================

  addSectionTitle("getTeamAverage");

  test("Returns the correct team average for Hawks (28, 18, 11, 21 → 19.5)", () => {
    const result = getTeamAverage(players, "Hawks");
    return result === 19.5 ? true : `Expected 19.5, got ${fmt(result)}`;
  });

  test("Returns the correct team average for Sharks (20, 29, 7, 21 → 19.25)", () => {
    const result = getTeamAverage(players, "Sharks");
    return result === 19.25 ? true : `Expected 19.25, got ${fmt(result)}`;
  });

  test("Returns 0 when no players match the team", () => {
    const result = getTeamAverage(players, "Raptors");
    return result === 0 ? true : `Expected 0, got ${fmt(result)}`;
  });

  test("Returns 0 for an empty players array", () => {
    const result = getTeamAverage([], "Hawks");
    return result === 0 ? true : `Expected 0, got ${fmt(result)}`;
  });

  test("Works with a single matching player", () => {
    const result = getTeamAverage([maya], "Hawks");
    return result === 28 ? true : `Expected 28, got ${fmt(result)}`;
  });

  // ============================================
  // getTopScorer
  // ============================================

  addSectionTitle("getTopScorer");

  test("Returns the player with the highest average (Noah, avg 32) — Noah is NOT the first element", () => {
    const result = getTopScorer(players);
    return result && result.name === "Noah"
      ? true
      : `Expected Noah, got ${fmt(result && result.name)}`;
  });

  test("Returns null for an empty array", () => {
    const result = getTopScorer([]);
    return result === null ? true : `Expected null, got ${fmt(result)}`;
  });

  test("Works with a single player", () => {
    const result = getTopScorer([diego]);
    return result && result.name === "Diego"
      ? true
      : `Expected Diego, got ${fmt(result)}`;
  });

  test("Returns the first player when averages are tied", () => {
    const tied = [
      { name: "First",  team: "Hawks", position: "Guard", points: [20, 20], minutesPlayed: 20 },
      { name: "Second", team: "Hawks", position: "Guard", points: [20, 20], minutesPlayed: 20 }
    ];
    const result = getTopScorer(tied);
    return result && result.name === "First"
      ? true
      : `Expected "First" (first tied player), got "${result && result.name}"`;
  });

  // ============================================
  // getPositionGroup
  // ============================================

  addSectionTitle("getPositionGroup");

  test("Returns all Guards (Maya, Priya, Zara, Ivy)", () => {
    const result = getPositionGroup(players, "Guard");
    const names = result.map(p => p.name).sort();
    const expected = ["Ivy", "Maya", "Priya", "Zara"].sort();
    return deepEqual(names, expected)
      ? true
      : `Expected ${fmt(expected)}, got ${fmt(names)}`;
  });

  test("Returns all Centers (Diego, Liam, Ethan, Kai)", () => {
    const result = getPositionGroup(players, "Center");
    const names = result.map(p => p.name).sort();
    const expected = ["Diego", "Ethan", "Kai", "Liam"].sort();
    return deepEqual(names, expected)
      ? true
      : `Expected ${fmt(expected)}, got ${fmt(names)}`;
  });

  test("Returns an empty array for a position with no players", () => {
    const result = getPositionGroup(players, "Point Guard");
    return Array.isArray(result) && result.length === 0
      ? true
      : `Expected [], got ${fmt(result)}`;
  });

  test("Matching is case-sensitive ('guard' does not match 'Guard')", () => {
    const result = getPositionGroup(players, "guard");
    return Array.isArray(result) && result.length === 0
      ? true
      : `Expected [] for lowercase "guard", got ${result.length} player(s)`;
  });

  test("Does not modify the original array", () => {
    const copy = [
      { name: "A", team: "Hawks",  position: "Guard",   points: [20], minutesPlayed: 20 },
      { name: "B", team: "Wolves", position: "Forward", points: [15], minutesPlayed: 20 }
    ];
    getPositionGroup(copy, "Guard");
    return copy.length === 2
      ? true
      : `Original array was modified (length became ${copy.length})`;
  });

  // ============================================
  // getPlayerSummary
  // ============================================

  addSectionTitle("getPlayerSummary");

  test("Formats Maya's summary correctly", () => {
    const result = getPlayerSummary(maya);
    return result === "Maya (Guard, Hawks) — 28.0 ppg"
      ? true
      : `Expected "Maya (Guard, Hawks) — 28.0 ppg", got ${fmt(result)}`;
  });

  test("Formats Ruby's summary correctly", () => {
    const result = getPlayerSummary(ruby);
    return result === "Ruby (Forward, Sharks) — 7.0 ppg"
      ? true
      : `Expected "Ruby (Forward, Sharks) — 7.0 ppg", got ${fmt(result)}`;
  });

  test("Rounds the average to one decimal place", () => {
    const result = getPlayerSummary({ name: "X", team: "Hawks", position: "Center", points: [10, 11, 12], minutesPlayed: 15 });
    return result === "X (Center, Hawks) — 11.0 ppg"
      ? true
      : `Expected "X (Center, Hawks) — 11.0 ppg", got ${fmt(result)}`;
  });

  test("Handles a non-whole average correctly", () => {
    const result = getPlayerSummary({ name: "Y", team: "Wolves", position: "Guard", points: [10, 11], minutesPlayed: 15 });
    return result === "Y (Guard, Wolves) — 10.5 ppg"
      ? true
      : `Expected "Y (Guard, Wolves) — 10.5 ppg", got ${fmt(result)}`;
  });

  test("Returns a string", () => {
    const result = getPlayerSummary(noah);
    return typeof result === "string"
      ? true
      : `Expected a string, got ${typeof result}`;
  });

  // ============================================
  // tagAllStars (stretch)
  // ============================================

  addSectionTitle("tagAllStars (stretch)");

  test("Tags the correct All-Stars at threshold 20", () => {
    const result = tagAllStars(players, 20);
    if (!Array.isArray(result)) return `Expected an array, got ${fmt(result)}`;
    const allStarMap = {};
    for (let i = 0; i < result.length; i++) {
      allStarMap[result[i].name] = result[i].allStar;
    }
    const expected = {
      Maya: true, Owen: false, Diego: false, Priya: true,
      Noah: true, Zara: false, Liam: false, Sofia: true,
      Ethan: true, Ivy: true, Ruby: false, Kai: true
    };
    for (const name in expected) {
      if (allStarMap[name] !== expected[name]) {
        return `${name}: expected allStar ${expected[name]}, got ${allStarMap[name]}`;
      }
    }
    return true;
  });

  test("Returns an array of the same length as input", () => {
    const result = tagAllStars(players, 20);
    return result.length === players.length
      ? true
      : `Expected length ${players.length}, got ${result.length}`;
  });

  test("Does not add allStar field to the original objects", () => {
    const original = [{ name: "Test", team: "Hawks", position: "Guard", points: [25, 25], minutesPlayed: 20 }];
    tagAllStars(original, 20);
    return !("allStar" in original[0])
      ? true
      : `Original object was mutated — "allStar" was added to the original`;
  });

  test("Boundary: average exactly equal to threshold is an All-Star", () => {
    const player = { name: "X", team: "Hawks", position: "Guard", points: [20, 20, 20], minutesPlayed: 20 };
    const result = tagAllStars([player], 20);
    return result[0].allStar === true
      ? true
      : `Average 20 with threshold 20 should be an All-Star, got ${result[0].allStar}`;
  });

  test("Boundary: average just below threshold is not an All-Star", () => {
    const player = { name: "X", team: "Hawks", position: "Guard", points: [19, 19, 19], minutesPlayed: 20 };
    const result = tagAllStars([player], 20);
    return result[0].allStar === false
      ? true
      : `Average 19 with threshold 20 should not be an All-Star, got ${result[0].allStar}`;
  });

  test("Preserves the player's other fields", () => {
    const result = tagAllStars([maya], 20);
    return result[0].name === "Maya" && result[0].team === "Hawks" && result[0].position === "Guard"
      ? true
      : `Expected other fields to be preserved, got ${fmt(result[0])}`;
  });

  // ============================================
  // getBenchWarmers (stretch)
  // ============================================

  addSectionTitle("getBenchWarmers (stretch)");

  test("Flags players who fail the average OR minutes threshold (minAvg=15, minMinutes=20)", () => {
    const result = getBenchWarmers(players, 15, 20);
    const names = result.map(p => p.name).sort();
    const expected = ["Diego", "Liam", "Ruby"].sort();
    return deepEqual(names, expected)
      ? true
      : `Expected ${fmt(expected)}, got ${fmt(names)}`;
  });

  test("Flags players purely for low scoring (minAvg=12, minMinutes=5)", () => {
    const result = getBenchWarmers(players, 12, 5);
    const names = result.map(p => p.name).sort();
    const expected = ["Diego", "Liam", "Ruby"].sort();
    return deepEqual(names, expected)
      ? true
      : `Expected ${fmt(expected)}, got ${fmt(names)}`;
  });

  test("Flags players purely for low minutes (minAvg=5, minMinutes=20)", () => {
    const result = getBenchWarmers(players, 5, 20);
    const names = result.map(p => p.name).sort();
    const expected = ["Diego", "Liam", "Ruby"].sort();
    return deepEqual(names, expected)
      ? true
      : `Expected ${fmt(expected)}, got ${fmt(names)}`;
  });

  test("Returns an empty array when no one is a bench risk", () => {
    const result = getBenchWarmers(players, 1, 1);
    return Array.isArray(result) && result.length === 0
      ? true
      : `Expected [], got names: ${fmt(result.map(p => p.name))}`;
  });

  test("Does not modify the original array", () => {
    const copy = [
      { name: "A", team: "Hawks", position: "Guard", points: [10], minutesPlayed: 15 },
      { name: "B", team: "Hawks", position: "Guard", points: [30], minutesPlayed: 30 }
    ];
    getBenchWarmers(copy, 15, 20);
    return copy.length === 2
      ? true
      : `Original array was modified (length became ${copy.length})`;
  });

  // ============================================
  // getTeamStandings (stretch)
  // ============================================

  addSectionTitle("getTeamStandings (stretch)");

  test("Returns one entry per team, sorted by average descending", () => {
    const result = getTeamStandings(players);
    if (!Array.isArray(result)) return `Expected an array, got ${fmt(result)}`;
    if (result.length !== 3) return `Expected 3 team entries, got ${result.length}`;
    for (let i = 0; i < result.length - 1; i++) {
      if (result[i].average < result[i + 1].average) {
        return `Not sorted descending at index ${i}: ${result[i].team}(${result[i].average}) before ${result[i + 1].team}(${result[i + 1].average})`;
      }
    }
    return true;
  });

  test("Assigns correct ranks, with Hawks and Wolves tied at rank 1 and Sharks at rank 3", () => {
    const result = getTeamStandings(players);
    const rankMap = {};
    const avgMap = {};
    for (let i = 0; i < result.length; i++) {
      rankMap[result[i].team] = result[i].rank;
      avgMap[result[i].team] = result[i].average;
    }
    if (avgMap["Hawks"] !== 19.5) return `Hawks: expected average 19.5, got ${avgMap["Hawks"]}`;
    if (avgMap["Wolves"] !== 19.5) return `Wolves: expected average 19.5, got ${avgMap["Wolves"]}`;
    if (avgMap["Sharks"] !== 19.25) return `Sharks: expected average 19.25, got ${avgMap["Sharks"]}`;
    if (rankMap["Hawks"] !== 1) return `Hawks: expected rank 1, got ${rankMap["Hawks"]}`;
    if (rankMap["Wolves"] !== 1) return `Wolves: expected rank 1, got ${rankMap["Wolves"]}`;
    if (rankMap["Sharks"] !== 3) return `Sharks: expected rank 3 (rank 2 skipped), got ${rankMap["Sharks"]}`;
    return true;
  });

  test("Tied teams share a rank and the next rank is skipped (3-team check)", () => {
    const tied = [
      { name: "A", team: "Red",   position: "Guard", points: [90, 90], minutesPlayed: 20 },
      { name: "B", team: "Blue",  position: "Guard", points: [90, 90], minutesPlayed: 20 },
      { name: "C", team: "Green", position: "Guard", points: [70, 70], minutesPlayed: 20 }
    ];
    const result = getTeamStandings(tied);
    const rankMap = {};
    for (let i = 0; i < result.length; i++) {
      rankMap[result[i].team] = result[i].rank;
    }
    if (rankMap["Red"] !== 1) return `Red: expected rank 1, got ${rankMap["Red"]}`;
    if (rankMap["Blue"] !== 1) return `Blue: expected rank 1, got ${rankMap["Blue"]}`;
    if (rankMap["Green"] !== 3) return `Green: expected rank 3 (rank 2 skipped), got ${rankMap["Green"]}`;
    return true;
  });

  test("Does not modify the original players array or its objects", () => {
    const copy = [
      { name: "A", team: "Hawks", position: "Guard", points: [20], minutesPlayed: 20 },
      { name: "B", team: "Hawks", position: "Guard", points: [10], minutesPlayed: 20 }
    ];
    getTeamStandings(copy);
    return copy.length === 2 && !("rank" in copy[0]) && !("average" in copy[0])
      ? true
      : `Original array/objects were mutated`;
  });

  test("Works correctly when every player is on the same team (single entry, rank 1)", () => {
    const oneTeam = [
      { name: "A", team: "Comets", position: "Guard",   points: [20, 20], minutesPlayed: 20 },
      { name: "B", team: "Comets", position: "Forward", points: [10, 10], minutesPlayed: 20 }
    ];
    const result = getTeamStandings(oneTeam);
    return result.length === 1 && result[0].team === "Comets" && result[0].average === 15 && result[0].rank === 1
      ? true
      : `Expected a single "Comets" entry with average 15 and rank 1, got ${fmt(result)}`;
  });

  // ---- Summary ----

  const total = passed + failed;
  summary.style.display = "block";
  summary.textContent = `${passed} / ${total} tests passed`;
  if (failed === 0) {
    summary.className = "all-pass";
  } else if (passed === 0) {
    summary.className = "all-fail";
  } else {
    summary.className = "some-fail";
  }
}
