const fallbackRaces = [
  {
    id: "australia",
    round: 1,
    name: "澳大利亚大奖赛",
    officialName: "FORMULA 1 QATAR AIRWAYS AUSTRALIAN GRAND PRIX 2026",
    date: "2026-03-06 至 03-08",
    circuit: "Albert Park Circuit, Melbourne",
    laps: 57,
    sprint: false,
    source: "https://www.formula1.com/en/racing/2026/Australia.html",
    resultSource: "https://www.formula1.com/en/results/2026/races/1279/australia/race-result",
    note: "揭幕战由梅赛德斯掌控节奏，George Russell 夺冠，Kimi Antonelli 完成亚军，Charles Leclerc 为法拉利拿到领奖台。",
    local: {
      title: "墨尔本 · 公园与海湾",
      kicker: "Albert Park",
      accent: "#34b7b6",
      accent2: "#f2c24d",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Melbourne%20skyline%20-%20Albert%20Park.jpg",
      facts: [
        ["城市气质", "湖畔街道赛", "阿尔伯特公园把城市天际线、湖面和临时围场揉在一起。"],
        ["当地节奏", "早春揭幕", "南半球初秋，天气切换快，长距离轮胎窗口更敏感。"],
        ["赛道性格", "流动高速", "改造后的 Albert Park 更强调高速弯衔接和 DRS 攻防。"],
        ["观赛记忆", "St Kilda 海风", "赛后人流常向海边、咖啡馆和市中心扩散。"]
      ]
    },
    track: "M46 118 C66 65 108 35 155 52 C198 68 246 44 270 78 C292 110 254 143 209 134 C172 127 154 156 113 146 C78 137 42 151 46 118",
    start: [46, 118],
    race: [
      ["1", "George Russell", "Mercedes", "57", "1:23:06.801", "25"],
      ["2", "Kimi Antonelli", "Mercedes", "57", "+2.974s", "18"],
      ["3", "Charles Leclerc", "Ferrari", "57", "+15.519s", "15"],
      ["4", "Max Verstappen", "Red Bull Racing", "57", "+19.433s", "12"],
      ["5", "Lewis Hamilton", "Ferrari", "57", "+23.112s", "10"],
      ["6", "Lando Norris", "McLaren", "57", "+29.085s", "8"],
      ["7", "Oliver Bearman", "Haas", "57", "+42.911s", "6"],
      ["8", "Yuki Tsunoda", "Red Bull Racing", "57", "+48.334s", "4"],
      ["9", "Isack Hadjar", "Racing Bulls", "57", "+58.902s", "2"],
      ["10", "Pierre Gasly", "Alpine", "57", "+64.116s", "1"],
      ["11", "Esteban Ocon", "Haas", "57", "+70.581s", "0"],
      ["12", "Alexander Albon", "Williams", "56", "+1 lap", "0"],
      ["13", "Nico Hulkenberg", "Audi", "56", "+1 lap", "0"],
      ["14", "Lance Stroll", "Aston Martin", "56", "+1 lap", "0"],
      ["15", "Carlos Sainz", "Williams", "55", "+2 laps", "0"],
      ["NC", "Oscar Piastri", "McLaren", "0", "DNS", "0"]
    ],
    fastest: [
      ["1", "Lando Norris", "McLaren", "1:20.010", "45"],
      ["2", "Kimi Antonelli", "Mercedes", "1:20.120", "47"],
      ["3", "George Russell", "Mercedes", "1:20.184", "48"],
      ["4", "Charles Leclerc", "Ferrari", "1:20.492", "44"],
      ["5", "Max Verstappen", "Red Bull Racing", "1:20.733", "42"]
    ],
    sprintResult: []
  },
  {
    id: "china",
    round: 2,
    name: "中国大奖赛",
    officialName: "FORMULA 1 HEINEKEN CHINESE GRAND PRIX 2026",
    date: "2026-03-13 至 03-15",
    circuit: "Shanghai International Circuit, Shanghai",
    laps: 56,
    sprint: true,
    source: "https://www.formula1.com/en/racing/2026/China.html",
    resultSource: "https://www.formula1.com/en/results/2026/races/1280/china/race-result",
    note: "赛季首个冲刺周。Antonelli 从杆位出发拿下个人首个大奖赛冠军，Russell 第二，Hamilton 为 Ferrari 登上领奖台。",
    local: {
      title: "上海 · 嘉定速度场",
      kicker: "Shanghai",
      accent: "#e43d30",
      accent2: "#f7d45a",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/F-1%20Circuit%20Shanghai%20-%20panoramio.jpg",
      facts: [
        ["城市气质", "都市北翼", "嘉定赛车场连接地铁、产业园区和上海周末观赛人潮。"],
        ["当地节奏", "春季冲刺周", "短练习直接进入冲刺排位，车队更早暴露调校取舍。"],
        ["赛道性格", "上字长弯", "1-2 号弯持续横向负载，对前胎温度和入弯耐心很挑剔。"],
        ["观赛记忆", "看台红海", "主看台视野开阔，长直道尾端是超车判断的关键点。"]
      ]
    },
    track: "M64 100 C68 50 135 45 150 86 C164 130 225 118 256 84 C283 58 303 94 277 126 C242 166 150 151 105 146 C70 143 44 126 64 100",
    start: [64, 100],
    race: [
      ["1", "Kimi Antonelli", "Mercedes", "56", "1:33:15.607", "25"],
      ["2", "George Russell", "Mercedes", "56", "+5.515s", "18"],
      ["3", "Lewis Hamilton", "Ferrari", "56", "+25.267s", "15"],
      ["4", "Charles Leclerc", "Ferrari", "56", "+26.782s", "12"],
      ["5", "Max Verstappen", "Red Bull Racing", "56", "+32.050s", "10"],
      ["6", "Yuki Tsunoda", "Red Bull Racing", "56", "+41.218s", "8"],
      ["7", "Carlos Sainz", "Williams", "56", "+52.496s", "6"],
      ["8", "Isack Hadjar", "Racing Bulls", "56", "+62.110s", "4"],
      ["9", "Fernando Alonso", "Aston Martin", "56", "+68.552s", "2"],
      ["10", "Oliver Bearman", "Haas", "56", "+73.884s", "1"],
      ["11", "Nico Hulkenberg", "Audi", "55", "+1 lap", "0"],
      ["12", "Lance Stroll", "Aston Martin", "55", "+1 lap", "0"],
      ["13", "Pierre Gasly", "Alpine", "55", "+1 lap", "0"],
      ["DNS", "Lando Norris", "McLaren", "0", "DNS", "0"],
      ["DNS", "Oscar Piastri", "McLaren", "0", "DNS", "0"],
      ["DNS", "Gabriel Bortoleto", "Audi", "0", "DNS", "0"],
      ["DNS", "Alexander Albon", "Williams", "0", "DNS", "0"]
    ],
    fastest: [
      ["1", "Kimi Antonelli", "Mercedes", "1:36.221", "51"],
      ["2", "George Russell", "Mercedes", "1:36.468", "52"],
      ["3", "Charles Leclerc", "Ferrari", "1:36.713", "50"],
      ["4", "Lewis Hamilton", "Ferrari", "1:36.901", "49"],
      ["5", "Max Verstappen", "Red Bull Racing", "1:37.020", "48"]
    ],
    sprintResult: [
      ["1", "Kimi Antonelli", "Mercedes", "19", "32:48.406", "8"],
      ["2", "George Russell", "Mercedes", "19", "+3.211s", "7"],
      ["3", "Charles Leclerc", "Ferrari", "19", "+7.806s", "6"],
      ["4", "Lewis Hamilton", "Ferrari", "19", "+9.144s", "5"],
      ["5", "Max Verstappen", "Red Bull Racing", "19", "+11.470s", "4"],
      ["6", "Oscar Piastri", "McLaren", "19", "+16.908s", "3"],
      ["7", "Lando Norris", "McLaren", "19", "+19.302s", "2"],
      ["8", "Carlos Sainz", "Williams", "19", "+24.553s", "1"]
    ]
  },
  {
    id: "japan",
    round: 3,
    name: "日本大奖赛",
    officialName: "FORMULA 1 ARAMCO JAPANESE GRAND PRIX 2026",
    date: "2026-03-27 至 03-29",
    circuit: "Suzuka Circuit, Suzuka",
    laps: 53,
    sprint: false,
    source: "https://www.formula1.com/en/racing/2026/Japan.html",
    resultSource: "https://www.formula1.com/en/results/2026/races/1281/japan/race-result",
    note: "铃鹿站 Antonelli 延续强势并接管积分榜领先。Piastri 和 Leclerc 分列二三，McLaren 与 Ferrari 的长距离速度都有明显存在感。",
    local: {
      title: "铃鹿 · 山林技术课",
      kicker: "Suzuka",
      accent: "#d83b49",
      accent2: "#86c66b",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Suzuka%20Circuit%20Main%20Straight.jpg",
      facts: [
        ["城市气质", "本田主场", "三重县的赛车文化扎根很深，围场外就是游乐园和家庭观赛氛围。"],
        ["当地节奏", "春季日本站", "樱花季前后天气清爽，风向变化会影响 S 弯和 130R 的信心。"],
        ["赛道性格", "八字交叉", "世界少见的立体交叉布局，连续弯要求底盘平衡极高。"],
        ["观赛记忆", "S 弯层次", "看车手一口气切过蛇形弯，是铃鹿最有辨识度的画面。"]
      ]
    },
    track: "M42 96 C78 46 120 54 142 89 C164 125 206 77 245 55 C284 35 300 86 265 111 C227 137 191 124 167 150 C141 179 82 161 59 133 C46 119 34 111 42 96",
    start: [42, 96],
    race: [
      ["1", "Kimi Antonelli", "Mercedes", "53", "1:28:03.403", "25"],
      ["2", "Oscar Piastri", "McLaren", "53", "+13.722s", "18"],
      ["3", "Charles Leclerc", "Ferrari", "53", "+15.270s", "15"],
      ["4", "Lewis Hamilton", "Ferrari", "53", "+22.693s", "12"],
      ["5", "George Russell", "Mercedes", "53", "+26.744s", "10"],
      ["6", "Max Verstappen", "Red Bull Racing", "53", "+31.204s", "8"],
      ["7", "Lando Norris", "McLaren", "53", "+43.810s", "6"],
      ["8", "Carlos Sainz", "Williams", "53", "+55.921s", "4"],
      ["9", "Yuki Tsunoda", "Red Bull Racing", "53", "+64.372s", "2"],
      ["10", "Alexander Albon", "Williams", "53", "+71.996s", "1"],
      ["11", "Fernando Alonso", "Aston Martin", "52", "+1 lap", "0"],
      ["12", "Lance Stroll", "Aston Martin", "52", "+1 lap", "0"],
      ["13", "Nico Hulkenberg", "Audi", "52", "+1 lap", "0"],
      ["14", "Esteban Ocon", "Haas", "52", "+1 lap", "0"],
      ["DNF", "Oliver Bearman", "Haas", "28", "Accident", "0"]
    ],
    fastest: [
      ["1", "Oscar Piastri", "McLaren", "1:31.022", "50"],
      ["2", "Kimi Antonelli", "Mercedes", "1:31.117", "49"],
      ["3", "Charles Leclerc", "Ferrari", "1:31.352", "48"],
      ["4", "George Russell", "Mercedes", "1:31.508", "47"],
      ["5", "Lewis Hamilton", "Ferrari", "1:31.644", "46"]
    ],
    sprintResult: []
  },
  {
    id: "miami",
    round: 4,
    name: "迈阿密大奖赛",
    officialName: "FORMULA 1 CRYPTO.COM MIAMI GRAND PRIX 2026",
    date: "2026-05-01 至 05-03",
    circuit: "Miami International Autodrome, Florida",
    laps: 57,
    sprint: true,
    source: "https://www.formula1.com/en/racing/2026/miami",
    resultSource: "https://www.formula1.com/en/results/2026/races/1284/miami/race-result",
    note: "Antonelli 在迈阿密从杆位拿到第三个连续周日胜利。Norris 夺得冲刺赛胜利并在正赛追至第二，Piastri 完成 McLaren 双领奖台。",
    local: {
      title: "迈阿密 · 海岸娱乐周",
      kicker: "Miami",
      accent: "#ff5c8a",
      accent2: "#36d6d1",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Miami%20skyline%20%281%29.jpg",
      facts: [
        ["城市气质", "体育场街区", "围绕 Hard Rock Stadium 搭建的临时赛道，派对感很强。"],
        ["当地节奏", "热带湿热", "高温与赛道演进快，安全车窗口和轮胎衰退都更容易搅局。"],
        ["赛道性格", "慢弯牵引", "中低速组合多，出弯牵引和制动稳定性直接决定长直道机会。"],
        ["观赛记忆", "粉蓝霓虹", "海滩色彩、音乐和夜生活让这一站更像一整个城市活动。"]
      ]
    },
    track: "M36 104 C60 64 98 54 132 73 C164 91 194 68 224 62 C261 55 297 82 280 116 C262 153 205 143 175 126 C144 108 126 153 84 148 C52 145 25 130 36 104",
    start: [36, 104],
    race: [
      ["1", "Kimi Antonelli", "Mercedes", "57", "1:33:19.273", "25"],
      ["2", "Lando Norris", "McLaren", "57", "+3.264s", "18"],
      ["3", "Oscar Piastri", "McLaren", "57", "+27.092s", "15"],
      ["4", "George Russell", "Mercedes", "57", "+43.051s", "12"],
      ["5", "Max Verstappen", "Red Bull Racing", "57", "+43.949s", "10"],
      ["6", "Charles Leclerc", "Ferrari", "57", "+44.245s", "8"],
      ["7", "Lewis Hamilton", "Ferrari", "57", "+58.618s", "6"],
      ["8", "Franco Colapinto", "Alpine", "57", "+61.871s", "4"],
      ["9", "Carlos Sainz", "Williams", "57", "+82.072s", "2"],
      ["10", "Alexander Albon", "Williams", "57", "+90.972s", "1"],
      ["11", "Liam Lawson", "Racing Bulls", "56", "+1 lap", "0"],
      ["12", "Oliver Bearman", "Haas", "56", "+1 lap", "0"],
      ["13", "Nico Hulkenberg", "Audi", "56", "+1 lap", "0"],
      ["14", "Esteban Ocon", "Haas", "56", "+1 lap", "0"],
      ["15", "Fernando Alonso", "Aston Martin", "56", "+1 lap", "0"]
    ],
    fastest: [
      ["1", "Lando Norris", "McLaren", "1:31.869", "45"],
      ["2", "Oscar Piastri", "McLaren", "1:31.949", "47"],
      ["3", "Kimi Antonelli", "Mercedes", "1:31.968", "46"],
      ["4", "George Russell", "Mercedes", "1:32.446", "43"],
      ["5", "Charles Leclerc", "Ferrari", "1:32.515", "44"]
    ],
    sprintResult: [
      ["1", "Lando Norris", "McLaren", "19", "31:10.102", "8"],
      ["2", "Oscar Piastri", "McLaren", "19", "+2.153s", "7"],
      ["3", "Charles Leclerc", "Ferrari", "19", "+6.824s", "6"],
      ["4", "George Russell", "Mercedes", "19", "+9.612s", "5"],
      ["5", "Max Verstappen", "Red Bull Racing", "19", "+12.063s", "4"],
      ["6", "Kimi Antonelli", "Mercedes", "19", "+13.777s", "3"],
      ["7", "Lewis Hamilton", "Ferrari", "19", "+18.509s", "2"],
      ["8", "Franco Colapinto", "Alpine", "19", "+23.440s", "1"],
      ["13", "Carlos Sainz", "Williams", "19", "+58.504s", "0"],
      ["18", "Alexander Albon", "Williams", "19", "+88.173s", "0"]
    ]
  }
];

let races = fallbackRaces;
let activeRace = races[races.length - 1];
let activeView = "race";
let activeMode = "races";
let standings = [];
let constructorStandings = [];
const syncIntervalMs = 120000;
let nextRefreshAt = Date.now() + syncIntervalMs;
let isRefreshing = false;
let dataStatus = {
  source: "内置缓存",
  updatedAt: null
};

const els = {
  raceCount: document.querySelector("#race-count"),
  raceList: document.querySelector("#race-list"),
  roundLabel: document.querySelector("#round-label"),
  raceName: document.querySelector("#race-name"),
  raceMeta: document.querySelector("#race-meta"),
  tagRow: document.querySelector("#tag-row"),
  trackPath: document.querySelector("#track-path"),
  trackPathShadow: document.querySelector("#track-path-shadow"),
  trackStart: document.querySelector("#track-start"),
  winner: document.querySelector("#winner"),
  winnerTeam: document.querySelector("#winner-team"),
  podiumGap: document.querySelector("#podium-gap"),
  fastestLap: document.querySelector("#fastest-lap"),
  fastestDriver: document.querySelector("#fastest-driver"),
  finishRate: document.querySelector("#finish-rate"),
  finishCount: document.querySelector("#finish-count"),
  raceTime: document.querySelector("#race-time"),
  podium: document.querySelector("#podium"),
  raceNote: document.querySelector("#race-note"),
  sourceLink: document.querySelector("#source-link"),
  localTitle: document.querySelector("#local-title"),
  localKicker: document.querySelector("#local-kicker"),
  localHero: document.querySelector("#local-hero"),
  localFacts: document.querySelector("#local-facts"),
  modeButtons: document.querySelectorAll(".mode-button"),
  raceDetails: document.querySelectorAll(".race-detail"),
  standingsSection: document.querySelector("#standings-section"),
  standingsGrid: document.querySelector("#standings-grid"),
  constructorsSection: document.querySelector("#constructors-section"),
  constructorsGrid: document.querySelector("#constructors-grid"),
  statusText: document.querySelector("#status-text"),
  statusDot: document.querySelector(".status-dot"),
  refreshButton: document.querySelector("#refresh-button"),
  syncCountdown: document.querySelector("#sync-countdown"),
  tableWrap: document.querySelector("#table-wrap"),
  tabs: document.querySelectorAll(".tab")
};

function safeText(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function cleanHex(value) {
  return String(value || "909090").replace(/^#/, "").slice(0, 6) || "909090";
}

function teamLogoSpec(team) {
  const key = String(team || "").toLowerCase();
  const specs = [
    [/mercedes/, ["MERCEDES", "AMG", "00D7B6"]],
    [/ferrari/, ["FERRARI", "SF", "ED1131"]],
    [/mclaren/, ["McLAREN", "MCL", "F47600"]],
    [/red bull/, ["RED BULL", "RBR", "4781D7"]],
    [/racing bulls|rb/, ["RACING BULLS", "RB", "6C98FF"]],
    [/williams/, ["WILLIAMS", "WIL", "1868DB"]],
    [/aston martin/, ["ASTON MARTIN", "AMR", "229971"]],
    [/alpine/, ["ALPINE", "ALP", "00A1E8"]],
    [/haas/, ["HAAS", "HAA", "9C9FA2"]],
    [/audi/, ["AUDI", "AUD", "F50537"]],
    [/cadillac/, ["CADILLAC", "CAD", "909090"]]
  ];
  const match = specs.find(([pattern]) => pattern.test(key))?.[1];
  return match || [String(team || "TEAM").toUpperCase(), String(team || "TM").slice(0, 3).toUpperCase(), "909090"];
}

function officialTeamLogoUrl(team) {
  const key = String(team || "").toLowerCase();
  const logos = [
    [/mercedes/, "https://media.formula1.com/image/upload/c_fit%2Ch_64/q_auto/v1740000001/common/f1/2025/mercedes/2025mercedeslogowhite.webp"],
    [/ferrari/, "https://media.formula1.com/image/upload/c_fit%2Ch_64/q_auto/v1740000001/common/f1/2025/ferrari/2025ferrarilogolight.webp"],
    [/mclaren/, "https://media.formula1.com/image/upload/c_fit%2Ch_64/q_auto/v1740000001/common/f1/2025/mclaren/2025mclarenlogowhite.webp"],
    [/red bull/, "https://media.formula1.com/image/upload/c_fit%2Ch_64/q_auto/v1740000001/common/f1/2025/redbullracing/2025redbullracinglogowhite.webp"],
    [/williams/, "https://media.formula1.com/image/upload/c_fit%2Ch_64/q_auto/v1740000001/common/f1/2025/williams/2025williamslogowhite.webp"],
    [/aston martin/, "https://media.formula1.com/image/upload/c_fit%2Ch_64/q_auto/v1740000001/common/f1/2025/astonmartin/2025astonmartinlogowhite.webp"],
    [/alpine/, "https://media.formula1.com/image/upload/c_fit%2Ch_64/q_auto/v1740000001/common/f1/2025/alpine/2025alpinelogowhite.webp"],
    [/haas/, "https://media.formula1.com/image/upload/c_fit%2Ch_64/q_auto/v1740000001/common/f1/2025/haas/2025haaslogowhite.webp"]
  ];
  return logos.find(([pattern]) => pattern.test(key))?.[1] || "";
}

function fallbackTeamLogoSvg(team, teamColor) {
  const [label, mark, fallbackColor] = teamLogoSpec(team);
  const color = cleanHex(teamColor || fallbackColor);
  return `
    <svg class="team-logo-fallback-svg" viewBox="0 0 240 160" role="img" focusable="false">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#${color}"/>
          <stop offset="1" stop-color="#ffffff" stop-opacity=".22"/>
        </linearGradient>
      </defs>
      <rect width="240" height="160" rx="22" fill="#11151d"/>
      <path d="M24 120 L74 34 H214 L164 120 Z" fill="url(#g)" opacity=".95"/>
      <path d="M32 126 H160 L208 44" fill="none" stroke="#fff" stroke-opacity=".72" stroke-width="8" stroke-linecap="round"/>
      <text x="36" y="86" fill="#fff" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="900">${safeText(mark)}</text>
      <text x="36" y="116" fill="#fff" fill-opacity=".82" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700">${safeText(label)}</text>
    </svg>
  `;
}

function teamLogoMarkup(team, teamColor) {
  const officialLogo = officialTeamLogoUrl(team);
  const fallbackLogo = fallbackTeamLogoSvg(team, teamColor);
  const fallbackClass = officialLogo ? "team-logo-fallback" : "team-logo-fallback visible";
  const officialImage = officialLogo
    ? `<img class="team-logo-official" src="${safeText(officialLogo)}" alt="${safeText(team)} 官方车队标志" loading="lazy" onerror="this.hidden=true; this.nextElementSibling.classList.add('visible')">`
    : "";

  return `
    <div class="standing-media team-logo" aria-label="${safeText(team)} 车队标志">
      <span class="logo-particles" aria-hidden="true"></span>
      ${officialImage}
      <div class="${fallbackClass}">${fallbackLogo}</div>
    </div>
  `;
}

function buildFallbackStandings() {
  const totals = new Map();
  for (const race of fallbackRaces) {
    for (const sessionRows of [race.race, race.sprintResult]) {
      for (const row of sessionRows) {
        const points = Number(row[5] || 0);
        if (!row[1]) continue;
        const current = totals.get(row[1]) || {
          position: 0,
          driver: row[1],
          team: row[2],
          teamColor: "909090",
          points: 0,
          wins: 0,
          podiums: 0
        };
        current.points += points;
        if (sessionRows === race.race && row[0] === "1") current.wins += 1;
        if (sessionRows === race.race && ["1", "2", "3"].includes(row[0])) current.podiums += 1;
        current.team = row[2] || current.team;
        totals.set(row[1], current);
      }
    }
  }

  return Array.from(totals.values())
    .sort((a, b) => b.points - a.points || b.wins - a.wins || a.driver.localeCompare(b.driver))
    .map((entry, index) => ({ ...entry, position: index + 1 }));
}

function buildFallbackConstructorStandings() {
  const teams = new Map();
  for (const race of fallbackRaces) {
    for (const sessionRows of [race.race, race.sprintResult]) {
      for (const row of sessionRows) {
        if (!row[2]) continue;
        const points = Number(row[5] || 0);
        const current = teams.get(row[2]) || {
          position: 0,
          team: row[2],
          teamColor: "909090",
          points: 0,
          wins: 0,
          podiums: 0,
          racePoints: 0,
          sprintPoints: 0,
          drivers: new Set()
        };

        current.points += points;
        if (sessionRows === race.sprintResult) current.sprintPoints += points;
        else current.racePoints += points;
        if (sessionRows === race.race && row[0] === "1") current.wins += 1;
        if (sessionRows === race.race && ["1", "2", "3"].includes(row[0])) current.podiums += 1;
        if (row[1]) current.drivers.add(row[1]);
        teams.set(row[2], current);
      }
    }
  }

  return Array.from(teams.values())
    .sort((a, b) => b.points - a.points || b.wins - a.wins || a.team.localeCompare(b.team))
    .map((entry, index) => ({
      ...entry,
      position: index + 1,
      drivers: Array.from(entry.drivers).sort()
    }));
}

function renderRaceList() {
  els.raceCount.textContent = races.length;
  els.raceList.innerHTML = races
    .map((race) => {
      const winner = race.race?.[0] || ["", "待确认", "", "", ""];
      return `
        <button class="race-card ${race.id === activeRace.id ? "active" : ""}" type="button" data-race="${race.id}">
          <div class="race-card-main">
            <div class="card-row">
              <small>ROUND ${safeText(race.round)}</small>
              <small>${race.sprint ? "冲刺周" : "常规周"}</small>
            </div>
            <strong>${safeText(race.name)}</strong>
            <div class="race-winner-line">
              <span>WIN</span>
              <small>${safeText(winner[1])} · ${safeText(winner[4])}</small>
            </div>
          </div>
          <svg viewBox="0 0 320 180" aria-hidden="true">
            <path d="${safeText(race.track)}"></path>
          </svg>
        </button>
      `;
    })
    .join("");

  document.querySelectorAll(".race-card").forEach((button) => {
    button.addEventListener("click", () => {
      activeRace = races.find((race) => race.id === button.dataset.race);
      activeView = "race";
      render();
    });
  });
}

function renderMode() {
  document.body.dataset.mode = activeMode;
  els.modeButtons.forEach((button) => button.classList.toggle("active", button.dataset.mode === activeMode));
  els.raceDetails.forEach((section) => {
    const showRaceDetail = activeMode === "races";
    section.hidden = !showRaceDetail;
    section.style.display = showRaceDetail ? "" : "none";
  });
  const showDrivers = activeMode === "standings";
  const showConstructors = activeMode === "constructors";
  els.standingsSection.hidden = !showDrivers;
  els.standingsSection.style.display = showDrivers ? "" : "none";
  els.constructorsSection.hidden = !showConstructors;
  els.constructorsSection.style.display = showConstructors ? "" : "none";
}

function setDataStatus(status) {
  dataStatus = { ...dataStatus, ...status };
  if (!els.statusText) return;

  const updated = dataStatus.updatedAt
    ? new Date(dataStatus.updatedAt).toLocaleString("zh-CN", { hour12: false })
    : "离线缓存";

  els.statusText.textContent = `${dataStatus.source} · ${updated}`;
  els.statusDot?.classList.toggle("loading", isRefreshing);
  if (els.refreshButton) {
    els.refreshButton.disabled = isRefreshing;
    els.refreshButton.textContent = isRefreshing ? "同步中" : "刷新";
  }
}

function updateCountdown() {
  if (!els.syncCountdown) return;
  const remaining = Math.max(0, nextRefreshAt - Date.now());
  const seconds = Math.ceil(remaining / 1000);
  els.syncCountdown.textContent = isRefreshing ? "正在同步 OpenF1" : `下一次同步 ${seconds}s`;
}

function renderSummary() {
  const podium = activeRace.race.slice(0, 3);
  const finishers = activeRace.race.filter((row) => /^\d+$/.test(row[0]) && row[3] !== "0").length;
  const rate = Math.round((finishers / activeRace.race.length) * 100);
  const root = document.documentElement;

  root.style.setProperty("--accent", activeRace.local.accent);
  root.style.setProperty("--accent-2", activeRace.local.accent2);
  root.style.setProperty("--race-image", `url("${activeRace.local.image}")`);
  root.style.setProperty("--local-image", `url("${activeRace.local.image}")`);

  els.roundLabel.textContent = `ROUND ${activeRace.round}`;
  els.raceName.textContent = activeRace.name;
  els.raceMeta.textContent = `${activeRace.officialName} · ${activeRace.date} · ${activeRace.circuit} · ${activeRace.laps} 圈`;
  els.tagRow.innerHTML = [
    `<span class="tag hot">已完赛</span>`,
    `<span class="tag">${activeRace.sprint ? "冲刺赛周" : "常规比赛周"}</span>`,
    `<span class="tag">${activeRace.local.kicker}</span>`,
    `<span class="tag">${activeRace.circuit.split(",")[0]}</span>`
  ].join("");

  els.trackPath.setAttribute("d", activeRace.track);
  els.trackPathShadow.setAttribute("d", activeRace.track);
  els.trackStart.setAttribute("cx", activeRace.start[0]);
  els.trackStart.setAttribute("cy", activeRace.start[1]);

  els.winner.textContent = podium[0][1];
  els.winnerTeam.textContent = podium[0][2];
  els.podiumGap.textContent = podium[2]?.[4]?.replace("s", "") || "待确认";
  els.fastestLap.textContent = activeRace.fastest?.[0]?.[3] || "待确认";
  els.fastestDriver.textContent = activeRace.fastest?.[0]?.[1] || "最快圈更新中";
  els.finishRate.textContent = `${rate}%`;
  els.finishCount.textContent = `${finishers}/${activeRace.race.length} 车手有分类成绩`;
  els.raceTime.textContent = activeRace.race[0][4];
  els.raceNote.textContent = activeRace.note;
  els.sourceLink.href = activeRace.resultSource;
  els.sourceLink.textContent = "查看官方结果";
  els.localTitle.textContent = activeRace.local.title;
  els.localKicker.textContent = activeRace.local.kicker;
  els.localHero.setAttribute("aria-label", activeRace.local.title);
  els.localFacts.innerHTML = activeRace.local.facts
    .map(
      ([label, value, detail]) => `
        <div class="local-fact">
          <span>${label}</span>
          <strong>${value}</strong>
          <small>${detail}</small>
        </div>
      `
    )
    .join("");
}

function renderPodium() {
  els.podium.innerHTML = activeRace.race
    .slice(0, 3)
    .map(
      (row) => `
        <div class="podium-card">
          <span class="pos">${row[0]}</span>
          <strong>${row[1]}</strong>
          <small>${row[2]}</small>
          <small>${row[4]} · ${row[5]} 分</small>
        </div>
      `
    )
    .join("");
}

function table(headers, rows) {
  if (!rows?.length) {
    return `<div class="empty-state">数据正在同步，暂无可展示记录。</div>`;
  }

  return `
    <table>
      <thead>
        <tr>${headers.map((header) => `<th>${safeText(header)}</th>`).join("")}</tr>
      </thead>
      <tbody>
        ${rows
          .map((row) => `<tr>${row.map((cell) => `<td>${safeText(cell)}</td>`).join("")}</tr>`)
          .join("")}
      </tbody>
    </table>
  `;
}

function renderTable() {
  els.tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.view === activeView));

  if (activeView === "race") {
    els.tableWrap.innerHTML = table(["名次", "车手", "车队", "圈数", "成绩/差距", "积分"], activeRace.race);
    return;
  }

  if (activeView === "fastest") {
    els.tableWrap.innerHTML = table(["排名", "车手", "车队", "最快圈", "发生圈"], activeRace.fastest);
    return;
  }

  if (!activeRace.sprintResult.length) {
    els.tableWrap.innerHTML = `<div class="empty-state">本站不是冲刺周，没有冲刺赛结果。</div>`;
    return;
  }

  els.tableWrap.innerHTML = table(["名次", "车手", "车队", "圈数", "成绩/差距", "积分"], activeRace.sprintResult);
}

function renderStandings() {
  const rows = standings.length ? standings : buildFallbackStandings();
  const maxPoints = Math.max(...rows.map((entry) => Number(entry.points) || 0), 1);

  if (!rows.length) {
    els.standingsGrid.innerHTML = `<div class="empty-state">积分榜正在同步。</div>`;
    return;
  }

  els.standingsGrid.innerHTML = rows
    .map((entry) => {
      const score = Math.round(((Number(entry.points) || 0) / maxPoints) * 100);
      const isTopThree = Number(entry.position) <= 3;
      const portrait = isTopThree && entry.headshotUrl
        ? `<div class="standing-media driver-portrait"><img src="${safeText(entry.headshotUrl)}" alt="${safeText(entry.driver)} 2026 定妆照" loading="lazy" onerror="this.closest('.standing-media').remove()"></div>`
        : "";
      return `
      <article class="standings-card ${isTopThree ? "top-standing" : ""}" style="--team-color:#${safeText(cleanHex(entry.teamColor))}; --score:${score}%">
        ${portrait}
        <div class="rank-badge">${safeText(entry.position)}</div>
        <div class="driver-cell">
          <strong>${safeText(entry.driver)}</strong>
          <span>${safeText(entry.acronym || "")}</span>
        </div>
        <div class="team-chip">
          <span class="team-swatch"></span>
          <span>${safeText(entry.team)}</span>
        </div>
        <span class="wins-cell">${safeText(entry.wins)} 胜 · ${safeText(entry.podiums)} 台</span>
        <div class="points-cell"><strong>${safeText(entry.points)}</strong><span>PTS</span></div>
        <div class="points-meter"><span></span></div>
      </article>
    `;
    })
    .join("");
}

function renderConstructorStandings() {
  const rows = constructorStandings.length ? constructorStandings : buildFallbackConstructorStandings();
  const maxPoints = Math.max(...rows.map((entry) => Number(entry.points) || 0), 1);

  if (!rows.length) {
    els.constructorsGrid.innerHTML = `<div class="empty-state">车队积分榜正在同步。</div>`;
    return;
  }

  els.constructorsGrid.innerHTML = rows
    .map((entry) => {
      const drivers = Array.isArray(entry.drivers) ? entry.drivers.join(" / ") : "";
      const score = Math.round(((Number(entry.points) || 0) / maxPoints) * 100);
      const isTopThree = Number(entry.position) <= 3;
      const logoMarkup = isTopThree ? teamLogoMarkup(entry.team, entry.teamColor) : "";
      return `
        <article class="standings-card constructor-card ${isTopThree ? "top-standing" : ""}" style="--team-color:#${safeText(cleanHex(entry.teamColor))}; --score:${score}%">
          ${logoMarkup}
          <div class="rank-badge">${safeText(entry.position)}</div>
          <div class="driver-cell">
            <strong>${safeText(entry.team)}</strong>
            <span>${safeText(drivers)}</span>
          </div>
          <div class="team-chip">
            <span class="team-swatch"></span>
            <span>正赛 ${safeText(entry.racePoints ?? 0)} 分</span>
          </div>
          <span class="wins-cell">冲刺 ${safeText(entry.sprintPoints ?? 0)} 分 · ${safeText(entry.podiums)} 台</span>
          <div class="points-cell"><strong>${safeText(entry.points)}</strong><span>PTS</span></div>
          <div class="points-meter"><span></span></div>
        </article>
      `;
    })
    .join("");
}

function render() {
  renderRaceList();
  renderSummary();
  renderPodium();
  renderTable();
  renderStandings();
  renderConstructorStandings();
  renderMode();
  setDataStatus(dataStatus);
}

els.tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activeView = tab.dataset.view;
    renderTable();
  });
});

els.modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeMode = button.dataset.mode;
    renderMode();
  });
});

async function loadLiveData() {
  try {
    isRefreshing = true;
    setDataStatus(dataStatus);
    const selectedId = activeRace?.id;
    const response = await fetch(`/api/races?ts=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`API ${response.status}`);
    const payload = await response.json();
    if (!Array.isArray(payload.races) || !payload.races.length) {
      throw new Error("empty races payload");
    }
    if (!payload.races.every((race) => race.id && race.name && Array.isArray(race.race) && race.local?.title)) {
      throw new Error("invalid races payload");
    }

    races = payload.races;
    standings = Array.isArray(payload.standings) ? payload.standings : [];
    constructorStandings = Array.isArray(payload.constructorStandings) ? payload.constructorStandings : [];
    activeRace = races.find((race) => race.id === selectedId) || races[races.length - 1];
    setDataStatus({
      source: payload.source || "OpenF1 实时源",
      updatedAt: payload.updatedAt || new Date().toISOString()
    });
  } catch (error) {
    if (!standings.length) standings = buildFallbackStandings();
    if (!constructorStandings.length) constructorStandings = buildFallbackConstructorStandings();
    if (races === fallbackRaces) {
      setDataStatus({
        source: "内置缓存",
        updatedAt: null
      });
    }
  } finally {
    isRefreshing = false;
    nextRefreshAt = Date.now() + syncIntervalMs;
    setDataStatus(dataStatus);
  }

  render();
}

standings = buildFallbackStandings();
constructorStandings = buildFallbackConstructorStandings();
loadLiveData();
setInterval(loadLiveData, syncIntervalMs);
setInterval(updateCountdown, 1000);
els.refreshButton?.addEventListener("click", loadLiveData);
