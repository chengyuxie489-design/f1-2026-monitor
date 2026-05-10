const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");
const { existsSync } = require("node:fs");

const root = __dirname;
const port = Number(process.env.PORT || 4173);
const cacheDir = path.join(root, "data");
const cacheFile = path.join(cacheDir, "races-live.json");
const updateIntervalMs = Number(process.env.UPDATE_INTERVAL_MS || 120000);
const openF1 = "https://api.openf1.org/v1";
const apiCache = new Map();

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml; charset=utf-8",
  ".ico": "image/x-icon"
};

const raceNameByCircuit = {
  Melbourne: "澳大利亚大奖赛",
  Shanghai: "中国大奖赛",
  Suzuka: "日本大奖赛",
  Sakhir: "巴林大奖赛",
  Jeddah: "沙特阿拉伯大奖赛",
  Miami: "迈阿密大奖赛",
  Montreal: "加拿大大奖赛",
  "Monte Carlo": "摩纳哥大奖赛",
  Catalunya: "西班牙大奖赛",
  Spielberg: "奥地利大奖赛",
  Silverstone: "英国大奖赛",
  "Spa-Francorchamps": "比利时大奖赛",
  Hungaroring: "匈牙利大奖赛",
  Zandvoort: "荷兰大奖赛",
  Monza: "意大利大奖赛",
  Madring: "马德里大奖赛",
  Baku: "阿塞拜疆大奖赛",
  Singapore: "新加坡大奖赛",
  Austin: "美国大奖赛",
  "Mexico City": "墨西哥城大奖赛",
  Interlagos: "圣保罗大奖赛",
  "Las Vegas": "拉斯维加斯大奖赛",
  Lusail: "卡塔尔大奖赛",
  "Yas Marina Circuit": "阿布扎比大奖赛"
};

const localProfiles = {
  Melbourne: {
    title: "墨尔本 · 公园与海湾",
    kicker: "Albert Park",
    accent: "#34b7b6",
    accent2: "#f2c24d",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Melbourne%20skyline%20-%20Albert%20Park.jpg",
    track: "M46 118 C66 65 108 35 155 52 C198 68 246 44 270 78 C292 110 254 143 209 134 C172 127 154 156 113 146 C78 137 42 151 46 118",
    start: [46, 118],
    facts: [["城市气质", "湖畔街道赛", "Albert Park 把城市天际线、湖面和临时围场揉在一起。"]]
  },
  Shanghai: {
    title: "上海 · 嘉定速度场",
    kicker: "Shanghai",
    accent: "#e43d30",
    accent2: "#f7d45a",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/F-1%20Circuit%20Shanghai%20-%20panoramio.jpg",
    track: "M64 100 C68 50 135 45 150 86 C164 130 225 118 256 84 C283 58 303 94 277 126 C242 166 150 151 105 146 C70 143 44 126 64 100",
    start: [64, 100],
    facts: [["城市气质", "都市北翼", "嘉定赛车场连接地铁、产业园区和上海周末观赛人潮。"]]
  },
  Suzuka: {
    title: "铃鹿 · 山林技术课",
    kicker: "Suzuka",
    accent: "#d83b49",
    accent2: "#86c66b",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Suzuka%20Circuit%20Main%20Straight.jpg",
    track: "M42 96 C78 46 120 54 142 89 C164 125 206 77 245 55 C284 35 300 86 265 111 C227 137 191 124 167 150 C141 179 82 161 59 133 C46 119 34 111 42 96",
    start: [42, 96],
    facts: [["城市气质", "本田主场", "八字交叉布局与连续弯让铃鹿始终带着清晰的技术性。"]]
  },
  Miami: {
    title: "迈阿密 · 海岸娱乐周",
    kicker: "Miami",
    accent: "#ff5c8a",
    accent2: "#36d6d1",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Miami%20skyline%20%281%29.jpg",
    track: "M36 104 C60 64 98 54 132 73 C164 91 194 68 224 62 C261 55 297 82 280 116 C262 153 205 143 175 126 C144 108 126 153 84 148 C52 145 25 130 36 104",
    start: [36, 104],
    facts: [["城市气质", "体育场街区", "围绕 Hard Rock Stadium 搭建的临时赛道，派对感很强。"]]
  }
};

let currentPayload = null;
let refreshPromise = null;
let lastSyncError = null;
let nextUpdateAt = null;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJson(url, options = {}) {
  const cacheMs = options.cacheMs ?? 60000;
  const cached = apiCache.get(url);
  if (cached && Date.now() - cached.time < cacheMs) return cached.data;

  let lastError;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(options.timeoutMs || 20000),
        headers: { "User-Agent": "f1-2026-monitor/1.1" }
      });
      if (response.ok) {
        const data = await response.json();
        apiCache.set(url, { time: Date.now(), data });
        return data;
      }
      lastError = new Error(`${response.status} ${response.statusText}: ${url}`);
    } catch (error) {
      lastError = error;
    }
    await sleep(600 * (attempt + 1));
  }

  if (cached?.data) return cached.data;
  throw lastError;
}

function driverName(driver) {
  return `${driver?.first_name || ""} ${driver?.last_name || ""}`.trim() || driver?.full_name || String(driver?.driver_number || "");
}

function cleanTeamColor(color) {
  return String(color || "909090").replace(/^#/, "").slice(0, 6) || "909090";
}

function secondsToRaceTime(seconds) {
  if (seconds == null || Number.isNaN(Number(seconds))) return "";
  const ms = Math.round(Number(seconds) * 1000);
  const minutes = Math.floor(ms / 60000);
  const secs = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${String(secs).padStart(2, "0")}.${String(ms % 1000).padStart(3, "0")}`;
}

function formatGap(result, winnerDuration) {
  if (result.position === 1 && result.duration) return secondsToRaceTime(result.duration);
  if (typeof result.gap_to_leader === "number") return `+${result.gap_to_leader.toFixed(3)}s`;
  if (typeof result.gap_to_leader === "string") return result.gap_to_leader.toLowerCase();
  if (result.dns) return "DNS";
  if (result.dnf) return "DNF";
  if (result.dsq) return "DSQ";
  if (result.duration && winnerDuration) return `+${(result.duration - winnerDuration).toFixed(3)}s`;
  return "";
}

function normalizeRows(results, drivers) {
  const driverMap = new Map(drivers.map((driver) => [driver.driver_number, driver]));
  const winnerDuration = results.find((result) => result.position === 1)?.duration;
  return results
    .slice()
    .sort((a, b) => (a.position ?? 999) - (b.position ?? 999))
    .map((result) => {
      const driver = driverMap.get(result.driver_number) || {};
      const status = result.dns ? "DNS" : result.dnf ? "DNF" : result.dsq ? "DSQ" : result.position ?? "NC";
      return [String(status), driverName(driver), driver.team_name || "-", String(result.number_of_laps ?? 0), formatGap(result, winnerDuration), String(Number(result.points || 0))];
    });
}

async function sessionRows(sessionKey) {
  const [results, drivers] = await Promise.all([
    fetchJson(`${openF1}/session_result?session_key=${sessionKey}`),
    fetchJson(`${openF1}/drivers?session_key=${sessionKey}`)
  ]);
  return { results, drivers, rows: normalizeRows(results, drivers) };
}

async function fastestLaps(sessionKey, drivers) {
  try {
    const laps = await fetchJson(`${openF1}/laps?session_key=${sessionKey}`, { cacheMs: 120000 });
    const driverMap = new Map(drivers.map((driver) => [driver.driver_number, driver]));
    const bestByDriver = new Map();
    for (const lap of laps) {
      if (!lap.lap_duration || lap.is_pit_out_lap) continue;
      const current = bestByDriver.get(lap.driver_number);
      if (!current || lap.lap_duration < current.lap_duration) bestByDriver.set(lap.driver_number, lap);
    }
    return Array.from(bestByDriver.values()).sort((a, b) => a.lap_duration - b.lap_duration).slice(0, 5).map((lap, index) => {
      const driver = driverMap.get(lap.driver_number) || {};
      return [String(index + 1), driverName(driver), driver.team_name || "-", secondsToRaceTime(lap.lap_duration), String(lap.lap_number)];
    });
  } catch {
    return [];
  }
}

function genericProfile(session) {
  return {
    title: `${session.location} · 当地赛周`,
    kicker: session.circuit_short_name,
    accent: "#f03638",
    accent2: "#31d0aa",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80",
    track: "M44 98 C70 52 126 42 164 70 C195 93 228 54 268 78 C302 98 282 144 239 144 C193 144 180 120 144 142 C104 166 32 144 44 98",
    start: [44, 98],
    facts: [["数据状态", "实时同步", "比赛结果由 OpenF1 定时更新；网络波动时会保留最近一次可用快照。"]]
  };
}

async function buildRace(session, index, sprintSessions) {
  const raceData = await sessionRows(session.session_key);
  const sprintSession = sprintSessions.find((item) => item.meeting_key === session.meeting_key);
  const [fastest, sprintData] = await Promise.all([
    fastestLaps(session.session_key, raceData.drivers),
    sprintSession ? sessionRows(sprintSession.session_key).catch(() => null) : null
  ]);
  const profile = localProfiles[session.circuit_short_name] || genericProfile(session);
  const date = new Intl.DateTimeFormat("zh-CN", { timeZone: "UTC", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(session.date_start));
  const winner = raceData.rows[0]?.[1] || "待确认";
  const second = raceData.rows[1]?.[1] || "第二名";
  const third = raceData.rows[2]?.[1] || "第三名";

  return {
    id: `${session.country_code.toLowerCase()}-${session.meeting_key}`,
    meetingKey: session.meeting_key,
    sessionKey: session.session_key,
    round: index + 1,
    name: raceNameByCircuit[session.circuit_short_name] || `${session.country_name}大奖赛`,
    officialName: `FORMULA 1 ${session.country_name.toUpperCase()} GRAND PRIX 2026`,
    date,
    circuit: `${session.circuit_short_name}, ${session.location}`,
    laps: Number(raceData.results.find((result) => result.position === 1)?.number_of_laps || 0),
    sprint: Boolean(sprintSession),
    source: `https://openf1.org/?session_key=${session.session_key}`,
    resultSource: `https://api.openf1.org/v1/session_result?session_key=${session.session_key}`,
    note: `${session.location} 站由 ${winner} 获胜，${second} 与 ${third} 登上领奖台。结果由 OpenF1 自动同步。`,
    local: profile,
    track: profile.track,
    start: profile.start,
    race: raceData.rows,
    fastest,
    sprintResult: sprintData?.rows || [],
    standingsSource: {
      race: raceData.results,
      raceDrivers: raceData.drivers,
      sprint: sprintData?.results || [],
      sprintDrivers: sprintData?.drivers || []
    }
  };
}

function addResultToStandings(table, result, driver, sessionType) {
  if (!driver) return;
  const key = driver.driver_number;
  const current = table.get(key) || {
    position: 0,
    driverNumber: key,
    driver: driverName(driver),
    acronym: driver.name_acronym || "",
    team: driver.team_name || "-",
    teamColor: cleanTeamColor(driver.team_colour),
    headshotUrl: driver.headshot_url || "",
    points: 0,
    wins: 0,
    podiums: 0,
    racePoints: 0,
    sprintPoints: 0
  };
  const points = Number(result.points || 0);
  current.points += points;
  if (sessionType === "sprint") current.sprintPoints += points;
  else current.racePoints += points;
  if (sessionType === "race" && result.position === 1) current.wins += 1;
  if (sessionType === "race" && [1, 2, 3].includes(result.position)) current.podiums += 1;
  current.team = driver.team_name || current.team;
  current.teamColor = cleanTeamColor(driver.team_colour || current.teamColor);
  current.headshotUrl = driver.headshot_url || current.headshotUrl;
  table.set(key, current);
}

function addResultToConstructors(table, result, driver, sessionType) {
  if (!driver) return;
  const team = driver.team_name || "Unknown";
  const current = table.get(team) || { position: 0, team, teamColor: cleanTeamColor(driver.team_colour), points: 0, wins: 0, podiums: 0, racePoints: 0, sprintPoints: 0, drivers: new Set() };
  const points = Number(result.points || 0);
  current.points += points;
  if (sessionType === "sprint") current.sprintPoints += points;
  else current.racePoints += points;
  if (sessionType === "race" && result.position === 1) current.wins += 1;
  if (sessionType === "race" && [1, 2, 3].includes(result.position)) current.podiums += 1;
  current.teamColor = cleanTeamColor(driver.team_colour || current.teamColor);
  current.drivers.add(driverName(driver));
  table.set(team, current);
}

function buildStandings(races) {
  const drivers = new Map();
  const teams = new Map();
  for (const race of races) {
    const raceDrivers = new Map((race.standingsSource?.raceDrivers || []).map((driver) => [driver.driver_number, driver]));
    const sprintDrivers = new Map((race.standingsSource?.sprintDrivers || []).map((driver) => [driver.driver_number, driver]));
    for (const result of race.standingsSource?.race || []) {
      addResultToStandings(drivers, result, raceDrivers.get(result.driver_number), "race");
      addResultToConstructors(teams, result, raceDrivers.get(result.driver_number), "race");
    }
    for (const result of race.standingsSource?.sprint || []) {
      addResultToStandings(drivers, result, sprintDrivers.get(result.driver_number), "sprint");
      addResultToConstructors(teams, result, sprintDrivers.get(result.driver_number), "sprint");
    }
  }
  const standings = Array.from(drivers.values()).sort((a, b) => b.points - a.points || b.wins - a.wins || b.podiums - a.podiums || a.driver.localeCompare(b.driver)).map((entry, index) => ({ ...entry, position: index + 1, points: Number(entry.points.toFixed(1)), racePoints: Number(entry.racePoints.toFixed(1)), sprintPoints: Number(entry.sprintPoints.toFixed(1)) }));
  const constructorStandings = Array.from(teams.values()).sort((a, b) => b.points - a.points || b.wins - a.wins || b.podiums - a.podiums || a.team.localeCompare(b.team)).map((entry, index) => ({ ...entry, position: index + 1, points: Number(entry.points.toFixed(1)), racePoints: Number(entry.racePoints.toFixed(1)), sprintPoints: Number(entry.sprintPoints.toFixed(1)), drivers: Array.from(entry.drivers).sort() }));
  return { standings, constructorStandings };
}

function usablePayload(payload) {
  return Boolean(payload && Array.isArray(payload.races) && payload.races.length);
}

function annotate(payload, metadata = {}) {
  const updatedTime = payload?.updatedAt ? new Date(payload.updatedAt).getTime() : NaN;
  return {
    source: payload?.source || "OpenF1 warming",
    updatedAt: payload?.updatedAt || null,
    races: payload?.races || [],
    standings: payload?.standings || [],
    constructorStandings: payload?.constructorStandings || [],
    syncStatus: metadata.syncStatus || payload?.syncStatus || "live",
    stale: metadata.stale ?? payload?.stale ?? false,
    lastSyncError: metadata.lastSyncError ?? payload?.lastSyncError ?? null,
    nextUpdateAt,
    cacheAgeMs: Number.isFinite(updatedTime) ? Math.max(0, Date.now() - updatedTime) : null
  };
}

async function readCache() {
  if (!existsSync(cacheFile)) return null;
  try {
    const payload = JSON.parse(await fs.readFile(cacheFile, "utf8"));
    return usablePayload(payload) ? payload : null;
  } catch (error) {
    console.warn(`[sync] cache read failed: ${error.message}`);
    return null;
  }
}

async function writeCache(payload) {
  await fs.mkdir(cacheDir, { recursive: true });
  await fs.writeFile(cacheFile, JSON.stringify(payload, null, 2), "utf8");
}

async function refreshData() {
  const now = Date.now();
  const [raceSessions, sprintSessions] = await Promise.all([
    fetchJson(`${openF1}/sessions?year=2026&session_name=Race`, { cacheMs: 120000 }),
    fetchJson(`${openF1}/sessions?year=2026&session_name=Sprint`, { cacheMs: 120000 })
  ]);

  const checks = await Promise.all(raceSessions.map(async (session) => {
    if (session.is_cancelled || new Date(session.date_end || session.date_start).getTime() > now) return null;
    try {
      const results = await fetchJson(`${openF1}/session_result?session_key=${session.session_key}`, { cacheMs: 120000 });
      return results.some((result) => result.position === 1) ? session : null;
    } catch {
      return null;
    }
  }));

  const completed = checks.filter(Boolean);
  const races = (await Promise.all(completed.map((session, index) => buildRace(session, index, sprintSessions).catch((error) => {
    console.warn(`[sync] skipped ${session.location}: ${error.message}`);
    return null;
  })))).filter(Boolean);
  const { standings, constructorStandings } = buildStandings(races);
  races.forEach((race) => delete race.standingsSource);

  const payload = { source: "OpenF1 实时源", updatedAt: new Date().toISOString(), races, standings, constructorStandings };
  if (races.length) await writeCache(payload);
  console.log(`[sync] updated ${races.length} races at ${payload.updatedAt}`);
  return payload;
}

function warmingPayload(error) {
  return annotate(currentPayload || {}, {
    syncStatus: "warming",
    stale: true,
    lastSyncError: error?.message || lastSyncError || "Live sync is warming"
  });
}

function runRefresh() {
  if (!refreshPromise) {
    refreshPromise = refreshData()
      .then((payload) => {
        lastSyncError = null;
        nextUpdateAt = new Date(Date.now() + updateIntervalMs).toISOString();
        currentPayload = annotate(payload, { syncStatus: "live", stale: false, lastSyncError: null });
        return currentPayload;
      })
      .catch(async (error) => {
        lastSyncError = error.message;
        nextUpdateAt = new Date(Date.now() + updateIntervalMs).toISOString();
        const fallback = usablePayload(currentPayload) ? currentPayload : await readCache();
        currentPayload = fallback ? annotate(fallback, { syncStatus: "stale-cache", stale: true, lastSyncError }) : warmingPayload(error);
        console.warn(`[sync] refresh failed, serving fallback: ${error.message}`);
        return currentPayload;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

async function getPayload() {
  if (usablePayload(currentPayload)) return annotate(currentPayload);
  const cached = await readCache();
  if (cached) {
    currentPayload = annotate(cached, { syncStatus: "cached-warming", stale: true, lastSyncError });
    runRefresh();
    return currentPayload;
  }
  return runRefresh();
}

function json(response, status, payload) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": "*"
  });
  response.end(JSON.stringify(payload));
}

async function serveApi(response) {
  const payload = await getPayload().catch((error) => warmingPayload(error));
  json(response, 200, payload);
}

async function serveStatic(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const requested = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const filePath = path.normalize(path.join(root, requested));
  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }
  try {
    const data = await fs.readFile(filePath);
    response.writeHead(200, { "Content-Type": mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream", "Cache-Control": "no-cache" });
    response.end(data);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}

const server = http.createServer((request, response) => {
  if (request.url.startsWith("/api/health")) {
    json(response, 200, {
      ok: true,
      source: currentPayload?.source || "warming",
      syncStatus: currentPayload?.syncStatus || "warming",
      stale: Boolean(currentPayload?.stale),
      lastSyncError,
      nextUpdateAt,
      updatedAt: currentPayload?.updatedAt || null,
      races: currentPayload?.races?.length || 0,
      standings: currentPayload?.standings?.length || 0,
      constructorStandings: currentPayload?.constructorStandings?.length || 0
    });
    return;
  }
  if (request.url.startsWith("/api/races")) {
    serveApi(response);
    return;
  }
  if (request.url.startsWith("/api/refresh")) {
    runRefresh().then((payload) => json(response, 200, payload)).catch((error) => json(response, 200, warmingPayload(error)));
    return;
  }
  serveStatic(request, response);
});

server.listen(port, "0.0.0.0", () => {
  console.log(`F1 monitor listening on http://0.0.0.0:${port}`);
});

runRefresh();
setInterval(() => {
  runRefresh();
}, updateIntervalMs);
