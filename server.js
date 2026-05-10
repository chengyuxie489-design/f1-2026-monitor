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
    facts: [
      ["城市气质", "湖畔街道赛", "阿尔伯特公园把城市天际线、湖面和临时围场揉在一起。"],
      ["当地节奏", "早春揭幕", "南半球初秋，天气切换快，长距离轮胎窗口更敏感。"],
      ["赛道性格", "流动高速", "改造后的 Albert Park 更强调高速弯衔接和 DRS 攻防。"],
      ["观赛记忆", "St Kilda 海风", "赛后人流常向海边、咖啡馆和市中心扩散。"]
    ]
  },
  Shanghai: {
    title: "上海 · 嘉定速度场",
    kicker: "Shanghai",
    accent: "#e43d30",
    accent2: "#f7d45a",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/F-1%20Circuit%20Shanghai%20-%20panoramio.jpg",
    track: "M64 100 C68 50 135 45 150 86 C164 130 225 118 256 84 C283 58 303 94 277 126 C242 166 150 151 105 146 C70 143 44 126 64 100",
    start: [64, 100],
    facts: [
      ["城市气质", "都市北翼", "嘉定赛车场连接地铁、产业园区和上海周末观赛人潮。"],
      ["当地节奏", "春季冲刺周", "短练习直接进入冲刺排位，车队更早暴露调校取舍。"],
      ["赛道性格", "上字长弯", "1-2 号弯持续横向负载，对前胎温度和入弯耐心很挑剔。"],
      ["观赛记忆", "看台红海", "主看台视野开阔，长直道尾端是超车判断的关键点。"]
    ]
  },
  Suzuka: {
    title: "铃鹿 · 山林技术课",
    kicker: "Suzuka",
    accent: "#d83b49",
    accent2: "#86c66b",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Suzuka%20Circuit%20Main%20Straight.jpg",
    track: "M42 96 C78 46 120 54 142 89 C164 125 206 77 245 55 C284 35 300 86 265 111 C227 137 191 124 167 150 C141 179 82 161 59 133 C46 119 34 111 42 96",
    start: [42, 96],
    facts: [
      ["城市气质", "本田主场", "三重县的赛车文化扎根很深，围场外就是游乐园和家庭观赛氛围。"],
      ["当地节奏", "春季日本站", "樱花季前后天气清爽，风向变化会影响 S 弯和 130R 的信心。"],
      ["赛道性格", "八字交叉", "世界少见的立体交叉布局，连续弯要求底盘平衡极高。"],
      ["观赛记忆", "S 弯层次", "看车手一口气切过蛇形弯，是铃鹿最有辨识度的画面。"]
    ]
  },
  Miami: {
    title: "迈阿密 · 海岸娱乐周",
    kicker: "Miami",
    accent: "#ff5c8a",
    accent2: "#36d6d1",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Miami%20skyline%20%281%29.jpg",
    track: "M36 104 C60 64 98 54 132 73 C164 91 194 68 224 62 C261 55 297 82 280 116 C262 153 205 143 175 126 C144 108 126 153 84 148 C52 145 25 130 36 104",
    start: [36, 104],
    facts: [
      ["城市气质", "体育场街区", "围绕 Hard Rock Stadium 搭建的临时赛道，派对感很强。"],
      ["当地节奏", "热带湿热", "高温与赛道演进快，安全车窗口和轮胎衰退都更容易搅局。"],
      ["赛道性格", "慢弯牵引", "中低速组合多，出弯牵引和制动稳定性直接决定长直道机会。"],
      ["观赛记忆", "粉蓝霓虹", "海滩色彩、音乐和夜生活让这一站更像一整个城市活动。"]
    ]
  }
};

function genericProfile(session) {
  return {
    title: `${session.location} · 当地赛周`,
    kicker: session.circuit_short_name,
    accent: "#f03638",
    accent2: "#31d0aa",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80",
    track: "M44 98 C70 52 126 42 164 70 C195 93 228 54 268 78 C302 98 282 144 239 144 C193 144 180 120 144 142 C104 166 32 144 44 98",
    start: [44, 98],
    facts: [
      ["城市气质", session.location, `${session.country_name} 赛周，页面会随 OpenF1 数据自动补齐最新结果。`],
      ["当地时间", `UTC${session.gmt_offset.slice(0, 6)}`, "比赛时间来自 OpenF1 session 元数据。"],
      ["赛道性格", session.circuit_short_name, "新分站先使用通用赛道画像，可继续补充专属地点文案。"],
      ["数据状态", "实时同步", "正赛、最快圈与冲刺赛结果由后台定时更新。"]
    ]
  };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJson(url, options = {}) {
  const cacheMs = options.cacheMs ?? 60000;
  const cached = apiCache.get(url);
  if (cached && Date.now() - cached.time < cacheMs) return cached.data;

  let lastError;
  for (let attempt = 0; attempt <= 3; attempt++) {
    const response = await fetch(url, {
      headers: { "User-Agent": "f1-2026-monitor/1.0" }
    });

    if (response.ok) {
      const data = await response.json();
      apiCache.set(url, { time: Date.now(), data });
      return data;
    }

    lastError = new Error(`${response.status} ${response.statusText}: ${url}`);
    if (response.status !== 429 || attempt === 3) break;
    await sleep(1500 * (attempt + 1));
  }

  throw lastError;
}

function secondsToRaceTime(seconds) {
  if (seconds == null || Number.isNaN(Number(seconds))) return "";
  const ms = Math.round(Number(seconds) * 1000);
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const secs = Math.floor((ms % 60000) / 1000);
  const millis = String(ms % 1000).padStart(3, "0");
  if (hours > 0) return `${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${millis}`;
  return `${minutes}:${String(secs).padStart(2, "0")}.${millis}`;
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

function driverName(driver) {
  return `${driver.first_name || ""} ${driver.last_name || ""}`.trim() || driver.full_name || String(driver.driver_number);
}

function cleanTeamColor(color) {
  return String(color || "909090").replace(/^#/, "").slice(0, 6) || "909090";
}

function normalizeRows(results, drivers) {
  const driverMap = new Map(drivers.map((driver) => [driver.driver_number, driver]));
  const winner = results.find((result) => result.position === 1);
  const winnerDuration = winner?.duration;

  return results
    .slice()
    .sort((a, b) => (a.position ?? 999) - (b.position ?? 999))
    .map((result) => {
      const driver = driverMap.get(result.driver_number) || {};
      const status = result.dns ? "DNS" : result.dnf ? "DNF" : result.dsq ? "DSQ" : result.position ?? "NC";
      return [
        String(status),
        driverName(driver),
        driver.team_name || "-",
        String(result.number_of_laps ?? 0),
        formatGap(result, winnerDuration),
        String(Number(result.points || 0))
      ];
    });
}

async function fastestLaps(sessionKey, drivers) {
  const driverMap = new Map(drivers.map((driver) => [driver.driver_number, driver]));
  const laps = await fetchJson(`${openF1}/laps?session_key=${sessionKey}`);
  const bestByDriver = new Map();

  for (const lap of laps) {
    if (!lap.lap_duration || lap.is_pit_out_lap) continue;
    const current = bestByDriver.get(lap.driver_number);
    if (!current || lap.lap_duration < current.lap_duration) bestByDriver.set(lap.driver_number, lap);
  }

  return Array.from(bestByDriver.values())
    .sort((a, b) => a.lap_duration - b.lap_duration)
    .slice(0, 5)
    .map((lap, index) => {
      const driver = driverMap.get(lap.driver_number) || {};
      return [
        String(index + 1),
        driverName(driver),
        driver.team_name || "-",
        secondsToRaceTime(lap.lap_duration),
        String(lap.lap_number)
      ];
    });
}

async function sessionRows(sessionKey) {
  const [results, drivers] = await Promise.all([
    fetchJson(`${openF1}/session_result?session_key=${sessionKey}`),
    fetchJson(`${openF1}/drivers?session_key=${sessionKey}`)
  ]);

  return {
    results,
    drivers,
    rows: normalizeRows(results, drivers)
  };
}

async function buildRace(session, index, sprintSessions) {
  const raceData = await sessionRows(session.session_key);
  const sprintSession = sprintSessions.find((item) => item.meeting_key === session.meeting_key);
  let sprintData = null;
  let sprintResult = [];

  if (sprintSession) {
    try {
      sprintData = await sessionRows(sprintSession.session_key);
      sprintResult = sprintData.rows;
    } catch (error) {
      console.warn(`Sprint result unavailable for ${session.location}: ${error.message}`);
    }
  }

  let fastest = [];
  try {
    fastest = await fastestLaps(session.session_key, raceData.drivers);
  } catch (error) {
    console.warn(`Fastest laps unavailable for ${session.location}: ${error.message}`);
  }

  const profile = localProfiles[session.circuit_short_name] || genericProfile(session);
  const date = new Intl.DateTimeFormat("zh-CN", {
    timeZone: "UTC",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date(session.date_start));

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
    sprintResult,
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

function buildStandings(races) {
  const table = new Map();

  for (const race of races) {
    const raceDrivers = new Map((race.standingsSource?.raceDrivers || []).map((driver) => [driver.driver_number, driver]));
    const sprintDrivers = new Map((race.standingsSource?.sprintDrivers || []).map((driver) => [driver.driver_number, driver]));

    for (const result of race.standingsSource?.race || []) {
      addResultToStandings(table, result, raceDrivers.get(result.driver_number), "race");
    }

    for (const result of race.standingsSource?.sprint || []) {
      addResultToStandings(table, result, sprintDrivers.get(result.driver_number), "sprint");
    }

  }

  return Array.from(table.values())
    .sort((a, b) => b.points - a.points || b.wins - a.wins || b.podiums - a.podiums || a.driver.localeCompare(b.driver))
    .map((entry, index) => ({
      ...entry,
      position: index + 1,
      points: Number(entry.points.toFixed(1)),
      racePoints: Number(entry.racePoints.toFixed(1)),
      sprintPoints: Number(entry.sprintPoints.toFixed(1))
    }));
}

function addResultToConstructors(table, result, driver, sessionType) {
  if (!driver) return;
  const team = driver.team_name || "Unknown";
  const current = table.get(team) || {
    position: 0,
    team,
    teamColor: cleanTeamColor(driver.team_colour),
    points: 0,
    wins: 0,
    podiums: 0,
    racePoints: 0,
    sprintPoints: 0,
    drivers: new Set()
  };

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

function buildConstructorStandings(races) {
  const table = new Map();

  for (const race of races) {
    const raceDrivers = new Map((race.standingsSource?.raceDrivers || []).map((driver) => [driver.driver_number, driver]));
    const sprintDrivers = new Map((race.standingsSource?.sprintDrivers || []).map((driver) => [driver.driver_number, driver]));

    for (const result of race.standingsSource?.race || []) {
      addResultToConstructors(table, result, raceDrivers.get(result.driver_number), "race");
    }

    for (const result of race.standingsSource?.sprint || []) {
      addResultToConstructors(table, result, sprintDrivers.get(result.driver_number), "sprint");
    }
  }

  return Array.from(table.values())
    .sort((a, b) => b.points - a.points || b.wins - a.wins || b.podiums - a.podiums || a.team.localeCompare(b.team))
    .map((entry, index) => ({
      ...entry,
      position: index + 1,
      points: Number(entry.points.toFixed(1)),
      racePoints: Number(entry.racePoints.toFixed(1)),
      sprintPoints: Number(entry.sprintPoints.toFixed(1)),
      drivers: Array.from(entry.drivers).sort()
    }));
}

async function refreshData() {
  const now = Date.now();
  const [raceSessions, sprintSessions] = await Promise.all([
    fetchJson(`${openF1}/sessions?year=2026&session_name=Race`),
    fetchJson(`${openF1}/sessions?year=2026&session_name=Sprint`)
  ]);

  const completedRaceSessions = [];
  for (const session of raceSessions) {
    if (session.is_cancelled || new Date(session.date_end || session.date_start).getTime() > now) continue;
    const results = await fetchJson(`${openF1}/session_result?session_key=${session.session_key}`);
    if (results.some((result) => result.position === 1)) completedRaceSessions.push(session);
  }

  const races = [];
  for (const [index, session] of completedRaceSessions.entries()) {
    races.push(await buildRace(session, index, sprintSessions));
  }
  const standings = buildStandings(races);
  const constructorStandings = buildConstructorStandings(races);
  races.forEach((race) => delete race.standingsSource);

  const payload = {
    source: "OpenF1 实时源",
    updatedAt: new Date().toISOString(),
    races,
    standings,
    constructorStandings
  };

  await fs.mkdir(cacheDir, { recursive: true });
  await fs.writeFile(cacheFile, JSON.stringify(payload, null, 2), "utf8");
  console.log(`[sync] updated ${races.length} races at ${payload.updatedAt}`);
  return payload;
}

async function readCache() {
  if (!existsSync(cacheFile)) return null;
  return JSON.parse(await fs.readFile(cacheFile, "utf8"));
}

let currentPayload = null;
let refreshPromise = null;

function runRefresh() {
  if (!refreshPromise) {
    refreshPromise = refreshData()
      .then((payload) => {
        currentPayload = payload;
        return payload;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

async function getPayload() {
  if (currentPayload?.races?.length) return currentPayload;
  currentPayload = await readCache();
  if (currentPayload?.races?.length) return currentPayload;
  currentPayload = await runRefresh();
  return currentPayload;
}

async function serveApi(response) {
  try {
    const payload = await getPayload();
    response.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*"
    });
    response.end(JSON.stringify(payload));
  } catch (error) {
    response.writeHead(503, { "Content-Type": "application/json; charset=utf-8" });
    response.end(JSON.stringify({ error: error.message }));
  }
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
    response.writeHead(200, {
      "Content-Type": mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-cache"
    });
    response.end(data);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}

const server = http.createServer((request, response) => {
  if (request.url.startsWith("/api/health")) {
    response.writeHead(200, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
    response.end(JSON.stringify({
      ok: true,
      source: currentPayload?.source || "warming",
      updatedAt: currentPayload?.updatedAt || null,
      races: currentPayload?.races?.length || 0,
      standings: currentPayload?.standings?.length || 0
    }));
    return;
  }
  if (request.url.startsWith("/api/races")) {
    serveApi(response);
    return;
  }
  if (request.url.startsWith("/api/refresh")) {
    runRefresh()
      .then((payload) => {
        response.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        response.end(JSON.stringify(payload));
      })
      .catch((error) => {
        response.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
        response.end(JSON.stringify({ error: error.message }));
      });
    return;
  }
  serveStatic(request, response);
});

server.listen(port, "0.0.0.0", () => {
  console.log(`F1 monitor listening on http://0.0.0.0:${port}`);
});

runRefresh()
  .catch(async (error) => {
    console.warn(`[sync] initial refresh failed: ${error.message}`);
    currentPayload = await readCache();
  });

setInterval(() => {
  runRefresh()
    .catch((error) => console.warn(`[sync] refresh failed: ${error.message}`));
}, updateIntervalMs);
