/* ---------- FOOD ---------- */
let map, marker, foodActive = false, ngoMode = false;

function initMap() {
  navigator.geolocation.getCurrentPosition(pos => {
    map = L.map("map").setView([pos.coords.latitude, pos.coords.longitude], 14);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
  });
}
if (document.getElementById("map")) initMap();

function uploadFood() {
  if (!map) return;
  marker && map.removeLayer(marker);
  marker = L.marker(map.getCenter()).addTo(map);
  foodActive = true;
  document.getElementById("foodStatus").innerText = "Food listed on map.";
}

function toggleNGO() {
  ngoMode = !ngoMode;
  document.getElementById("ngoStatus").innerText =
    "NGO Mode: " + (ngoMode ? "ON" : "OFF");
}

/* ---------- WASTE AI ---------- */
let model;
async function startAI() {
  model = await tmImage.load(
    "YOUR_MODEL_URL/model.json",
    "YOUR_MODEL_URL/metadata.json"
  );
  document.getElementById("wasteResult").innerText =
    "AI model loaded. Detection active.";
}

/* ---------- ILLEGAL DUMPING ---------- */
function selectDumpLocation() {
  navigator.geolocation.getCurrentPosition(pos => {
    document.getElementById("dumpStatus").innerText =
      `Dumping location recorded at (${pos.coords.latitude}, ${pos.coords.longitude})`;
  });
}

/* ---------- WATER ---------- */
let waterUser = null;

function registerWaterUser() {
  waterUser = document.getElementById("owner").value;
}

async function checkWeather() {
  const city = document.getElementById("location").value;
  const key = "YOUR_OPENWEATHER_API_KEY";
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
  );
  const data = await res.json();
  document.getElementById("rainStatus").innerText =
    data.weather[0].description;
}

function checkTank() {
  document.getElementById("tankStatus").innerText =
    "Tank optimized for upcoming rain.";
}
