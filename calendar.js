const f1CalendarRaces = [
  { round: 1, slug: "australia", name: "澳大利亚大奖赛", city: "Melbourne", country: "Australia", date: "2026-03-08", lat: -37.8497, lon: 144.968 },
  { round: 2, slug: "china", name: "中国大奖赛", city: "Shanghai", country: "China", date: "2026-03-15", lat: 31.3389, lon: 121.22 },
  { round: 3, slug: "japan", name: "日本大奖赛", city: "Suzuka", country: "Japan", date: "2026-03-29", lat: 34.8431, lon: 136.541 },
  { round: 4, slug: "bahrain", name: "巴林大奖赛", city: "Sakhir", country: "Bahrain", date: "2026-04-12", lat: 26.0325, lon: 50.5106 },
  { round: 5, slug: "saudi-arabia", name: "沙特阿拉伯大奖赛", city: "Jeddah", country: "Saudi Arabia", date: "2026-04-19", lat: 21.6319, lon: 39.1044 },
  { round: 6, slug: "miami", name: "迈阿密大奖赛", city: "Miami", country: "United States", date: "2026-05-03", lat: 25.958, lon: -80.2389 },
  { round: 7, slug: "canada", name: "加拿大大奖赛", city: "Montreal", country: "Canada", date: "2026-05-24", lat: 45.5006, lon: -73.5228 },
  { round: 8, slug: "monaco", name: "摩纳哥大奖赛", city: "Monte Carlo", country: "Monaco", date: "2026-06-07", lat: 43.7347, lon: 7.4206 },
  { round: 9, slug: "spain", name: "西班牙大奖赛", city: "Barcelona", country: "Spain", date: "2026-06-14", lat: 41.57, lon: 2.2611 },
  { round: 10, slug: "austria", name: "奥地利大奖赛", city: "Spielberg", country: "Austria", date: "2026-06-28", lat: 47.2197, lon: 14.7647 },
  { round: 11, slug: "britain", name: "英国大奖赛", city: "Silverstone", country: "United Kingdom", date: "2026-07-05", lat: 52.0786, lon: -1.0169 },
  { round: 12, slug: "belgium", name: "比利时大奖赛", city: "Spa-Francorchamps", country: "Belgium", date: "2026-07-19", lat: 50.4372, lon: 5.9714 },
  { round: 13, slug: "hungary", name: "匈牙利大奖赛", city: "Budapest", country: "Hungary", date: "2026-07-26", lat: 47.5789, lon: 19.2486 },
  { round: 14, slug: "netherlands", name: "荷兰大奖赛", city: "Zandvoort", country: "Netherlands", date: "2026-08-23", lat: 52.3888, lon: 4.5409 },
  { round: 15, slug: "italy", name: "意大利大奖赛", city: "Monza", country: "Italy", date: "2026-09-06", lat: 45.6206, lon: 9.2895 },
  { round: 16, slug: "spain-madrid", name: "马德里大奖赛", city: "Madrid", country: "Spain", date: "2026-09-13", lat: 40.463, lon: -3.617 },
  { round: 17, slug: "azerbaijan", name: "阿塞拜疆大奖赛", city: "Baku", country: "Azerbaijan", date: "2026-09-27", lat: 40.3725, lon: 49.8533 },
  { round: 18, slug: "singapore", name: "新加坡大奖赛", city: "Singapore", country: "Singapore", date: "2026-10-11", lat: 1.2914, lon: 103.864 },
  { round: 19, slug: "usa", name: "美国大奖赛", city: "Austin", country: "United States", date: "2026-10-25", lat: 30.1328, lon: -97.6411 },
  { round: 20, slug: "mexico", name: "墨西哥城大奖赛", city: "Mexico City", country: "Mexico", date: "2026-11-01", lat: 19.4042, lon: -99.0907 },
  { round: 21, slug: "brazil", name: "圣保罗大奖赛", city: "Sao Paulo", country: "Brazil", date: "2026-11-08", lat: -23.7036, lon: -46.6997 },
  { round: 22, slug: "las-vegas", name: "拉斯维加斯大奖赛", city: "Las Vegas", country: "United States", date: "2026-11-21", lat: 36.1147, lon: -115.173 },
  { round: 23, slug: "qatar", name: "卡塔尔大奖赛", city: "Lusail", country: "Qatar", date: "2026-11-29", lat: 25.49, lon: 51.4542 },
  { round: 24, slug: "abu-dhabi", name: "阿布扎比大奖赛", city: "Abu Dhabi", country: "United Arab Emirates", date: "2026-12-06", lat: 24.4672, lon: 54.6031 }
];

const earthTextureUrl = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r160/examples/textures/land_ocean_ice_cloud_2048.jpg";
let globeState = null;
let liveCompletedHints = new Set();
let liveCalendarStatuses = new Map();
let liveCalendarSynced = false;

function calendarSafe(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function calendarRaceStatus(race) {
  const liveStatus = liveCalendarStatuses.get(race.slug) || liveCalendarStatuses.get(String(race.round));
  if (liveStatus) return liveStatus;
  if (liveCalendarSynced) {
    return liveCompletedHints.has(race.slug) || liveCompletedHints.has(race.city.toLowerCase()) || liveCompletedHints.has(race.country.toLowerCase())
      ? "completed"
      : "scheduled";
  }
  return new Date(`${race.date}T23:59:59`).getTime() <= Date.now() ? "completed" : "scheduled";
}

function calendarRows() {
  return f1CalendarRaces.map((race) => {
    const status = calendarRaceStatus(race);
    return { ...race, status, completed: status === "completed", cancelled: status === "cancelled" };
  });
}

function calendarStatusLabel(status) {
  return ({ completed: "已完赛", cancelled: "已取消", "pending-results": "待结果", scheduled: "待举行" })[status] || "待举行";
}

async function syncCompletedCalendarRaces() {
  try {
    const response = await fetch(`/api/races?calendar=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) return;
    const payload = await response.json();
    if (!Array.isArray(payload.races)) return;
    liveCompletedHints = new Set();
    liveCalendarStatuses = new Map();
    liveCalendarSynced = true;
    if (Array.isArray(payload.calendar)) {
      payload.calendar.forEach((race) => {
        if (race.slug && race.status) liveCalendarStatuses.set(race.slug, race.status);
        if (race.round && race.status) liveCalendarStatuses.set(String(race.round), race.status);
      });
    }
    payload.races.forEach((race) => {
      `${race.id || ""} ${race.name || ""} ${race.officialName || ""} ${race.circuit || ""} ${race.local?.kicker || ""}`
        .toLowerCase()
        .split(/[^a-z0-9-]+/)
        .filter(Boolean)
        .forEach((token) => liveCompletedHints.add(token));
    });
    renderCalendarStrip();
    updateGlobeMarkers();
  } catch {}
}

function loadEarthTexture() {
  const texture = new THREE.TextureLoader().load(earthTextureUrl, () => {
    if (globeState) globeState.renderer.render(globeState.scene, globeState.camera);
  });
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function latLonToVector(lat, lon, radius = 2.05) {
  const phi = (90 - lat) * Math.PI / 180;
  const theta = (lon + 180) * Math.PI / 180;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function frontRotationForLongitude(lon) {
  return -lon * Math.PI / 180 - Math.PI / 2;
}

function initGlobe() {
  const canvas = document.querySelector("#globe-canvas");
  const stage = document.querySelector("#globe-stage");
  const labelLayer = document.querySelector("#globe-label-layer");
  if (globeState || !canvas || !stage || !labelLayer || !window.THREE) return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0.3, 6.2);

  const earthGroup = new THREE.Group();
  const markerGroup = new THREE.Group();
  scene.add(earthGroup, markerGroup);

  earthGroup.add(new THREE.Mesh(
    new THREE.SphereGeometry(2, 128, 128),
    new THREE.MeshStandardMaterial({ map: loadEarthTexture(), color: "#f7fbff", roughness: 0.96, metalness: 0.02 })
  ));
  earthGroup.add(new THREE.Mesh(
    new THREE.SphereGeometry(2.08, 96, 96),
    new THREE.MeshBasicMaterial({ color: "#64d2ff", transparent: true, opacity: 0.12, side: THREE.BackSide })
  ));
  earthGroup.add(new THREE.Mesh(
    new THREE.SphereGeometry(2.012, 48, 24),
    new THREE.MeshBasicMaterial({ color: "#ffffff", wireframe: true, transparent: true, opacity: 0.038 })
  ));

  scene.add(new THREE.AmbientLight("#9fc7ff", 1.18));
  const key = new THREE.DirectionalLight("#ffffff", 2.35);
  key.position.set(4, 3, 6);
  scene.add(key);
  const rim = new THREE.DirectionalLight("#31d0aa", 1.2);
  rim.position.set(-5, -1, -2);
  scene.add(rim);

  globeState = { renderer, scene, camera, earthGroup, markerGroup, labelLayer, stage, labels: [], drag: { active: false, x: 0, y: 0 } };
  earthGroup.rotation.y = frontRotationForLongitude(103);
  markerGroup.rotation.copy(earthGroup.rotation);

  stage.addEventListener("pointerdown", (event) => {
    globeState.drag = { active: true, x: event.clientX, y: event.clientY };
    stage.setPointerCapture(event.pointerId);
  });
  stage.addEventListener("pointermove", (event) => {
    if (!globeState.drag.active) return;
    const dx = event.clientX - globeState.drag.x;
    const dy = event.clientY - globeState.drag.y;
    earthGroup.rotation.y += dx * 0.006;
    earthGroup.rotation.x = Math.max(-0.72, Math.min(0.72, earthGroup.rotation.x + dy * 0.004));
    markerGroup.rotation.copy(earthGroup.rotation);
    globeState.drag = { active: true, x: event.clientX, y: event.clientY };
  });
  ["pointerup", "pointercancel", "pointerleave"].forEach((type) => {
    stage.addEventListener(type, () => { if (globeState) globeState.drag.active = false; });
  });

  window.addEventListener("resize", resizeGlobe);
  updateGlobeMarkers();
  resizeGlobe();
  animateGlobe();
}

function resizeGlobe() {
  if (!globeState) return;
  const rect = globeState.stage.getBoundingClientRect();
  const width = Math.max(320, rect.width);
  const height = Math.max(360, rect.height);
  globeState.renderer.setSize(width, height, false);
  globeState.camera.aspect = width / height;
  globeState.camera.updateProjectionMatrix();
}

function updateGlobeMarkers() {
  if (!globeState) return;
  globeState.markerGroup.clear();
  globeState.labels.forEach((label) => label.element.remove());
  globeState.labels = [];

  calendarRows().forEach((race) => {
    const position = latLonToVector(race.lat, race.lon);
    const color = race.cancelled ? "#8f98aa" : race.completed ? "#f1c75b" : "#64d2ff";
    const marker = new THREE.Mesh(new THREE.SphereGeometry(race.completed ? 0.055 : 0.043, 18, 18), new THREE.MeshBasicMaterial({ color }));
    marker.position.copy(position);
    globeState.markerGroup.add(marker);

    const pulse = new THREE.Mesh(
      new THREE.SphereGeometry(race.completed ? 0.082 : 0.068, 18, 18),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.18 })
    );
    pulse.position.copy(position.clone().multiplyScalar(1.006));
    globeState.markerGroup.add(pulse);

    const label = document.createElement("button");
    label.type = "button";
    label.className = `globe-label ${race.status}`;
    label.innerHTML = `<span>R${race.round}</span>${calendarSafe(race.city)}`;
    label.addEventListener("click", () => focusGlobeRace(race));
    globeState.labelLayer.appendChild(label);
    globeState.labels.push({ element: label, position });
  });
}

function focusGlobeRace(race) {
  if (!globeState) return;
  globeState.earthGroup.rotation.y = frontRotationForLongitude(race.lon);
  globeState.earthGroup.rotation.x = Math.max(-0.72, Math.min(0.72, (race.lat * Math.PI / 180) * 0.55));
  globeState.markerGroup.rotation.copy(globeState.earthGroup.rotation);
}

function updateGlobeLabels() {
  if (!globeState) return;
  const rect = globeState.stage.getBoundingClientRect();
  const cameraDirection = new THREE.Vector3();
  globeState.camera.getWorldDirection(cameraDirection);

  globeState.labels.forEach(({ element, position }) => {
    const world = position.clone().applyEuler(globeState.markerGroup.rotation);
    const visible = world.clone().normalize().dot(cameraDirection.clone().negate()) > -0.12;
    const projected = world.project(globeState.camera);
    const x = (projected.x * 0.5 + 0.5) * rect.width;
    const y = (-projected.y * 0.5 + 0.5) * rect.height;
    element.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    element.style.opacity = visible ? "1" : "0";
    element.style.pointerEvents = visible ? "auto" : "none";
  });
}

function animateGlobe() {
  if (!globeState) return;
  requestAnimationFrame(animateGlobe);
  if (document.body.dataset.mode === "calendar" && !globeState.drag.active) {
    globeState.earthGroup.rotation.y += 0.0012;
    globeState.markerGroup.rotation.copy(globeState.earthGroup.rotation);
  }
  updateGlobeLabels();
  globeState.renderer.render(globeState.scene, globeState.camera);
}

function renderCalendarStrip() {
  const strip = document.querySelector("#calendar-strip");
  if (!strip) return;
  strip.innerHTML = calendarRows().map((race) => `
    <button class="calendar-card ${race.status}" type="button" data-round="${race.round}">
      <span>R${calendarSafe(race.round)}</span>
      <strong>${calendarSafe(race.name)}</strong>
      <small>${calendarSafe(race.city)} · ${calendarSafe(race.date)} · ${calendarSafe(calendarStatusLabel(race.status))}</small>
    </button>
  `).join("");

  strip.querySelectorAll(".calendar-card").forEach((button) => {
    button.addEventListener("click", () => {
      const race = calendarRows().find((item) => String(item.round) === button.dataset.round);
      if (race) focusGlobeRace(race);
    });
  });
}

function showCalendarIfNeeded() {
  const section = document.querySelector("#calendar-section");
  if (!section) return;
  const visible = document.body.dataset.mode === "calendar";
  section.hidden = !visible;
  section.style.display = visible ? "block" : "none";
  if (visible) {
    if (!window.THREE) {
      const strip = document.querySelector("#calendar-strip");
      if (strip) strip.innerHTML = `<div class="empty-state">3D 地球资源正在加载，请稍候刷新。</div>`;
      return;
    }
    initGlobe();
    renderCalendarStrip();
    requestAnimationFrame(resizeGlobe);
  }
}

document.querySelectorAll(".mode-button").forEach((button) => {
  button.addEventListener("click", () => requestAnimationFrame(showCalendarIfNeeded));
});

new MutationObserver(showCalendarIfNeeded).observe(document.body, { attributes: true, attributeFilter: ["data-mode"] });
renderCalendarStrip();
syncCompletedCalendarRaces();
showCalendarIfNeeded();
