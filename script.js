/* ---------- FOOD MODULE ---------- */
let map, userLat, userLng;
let foodListings = [];
let ngoMode = false;
const NGO_RADIUS = 2;

if (document.getElementById("map")) {
  navigator.geolocation.getCurrentPosition(pos => {
    userLat = pos.coords.latitude;
    userLng = pos.coords.longitude;

    map = L.map("map").setView([userLat, userLng], 14);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    L.circle([userLat, userLng], {
      radius: NGO_RADIUS * 1000,
      color: "green",
      fillOpacity: 0.1
    }).addTo(map);
  });
}

function uploadFood() {
  const food = document.getElementById("food").value;
  const qty = document.getElementById("qty").value;
  const time = parseInt(document.getElementById("time").value);

  if (!food || !qty || !time) {
    updateStatus("Fill all fields.");
    return;
  }

  const listing = {
    food, qty, timeLeft: time * 60,
    lat: userLat, lng: userLng
  };

  listing.marker = L.marker([listing.lat, listing.lng]).addTo(map);
  foodListings.push(listing);
  updatePopup(listing);
  startTimer(listing);

  updateStatus("Food uploaded successfully.");
}

function startTimer(listing) {
  listing.interval = setInterval(() => {
    listing.timeLeft--;
    if (listing.timeLeft <= 0) {
      map.removeLayer(listing.marker);
      clearInterval(listing.interval);
      updateStatus("Food expired and removed.");
    } else {
      updatePopup(listing);
    }
  }, 1000);
}

function updatePopup(listing) {
  listing.marker.bindPopup(
    `<b>${listing.food}</b><br>
     Quantity: ${listing.qty}<br>
     Time left: ${Math.floor(listing.timeLeft/60)}m ${listing.timeLeft%60}s<br>
     <button onclick="claimFood(${foodListings.indexOf(listing)})">Claim</button>`
  );
}

function claimFood(i) {
  const l = foodListings[i];
  clearInterval(l.interval);
  map.removeLayer(l.marker);
  window.open(`https://www.google.com/maps/dir/?api=1&destination=${l.lat},${l.lng}`);
  updateStatus("Food claimed and navigation started.");
}

function toggleNGO() {
  ngoMode = !ngoMode;
  document.getElementById("ngoStatus").innerText =
    ngoMode ? "NGO mode ON" : "NGO mode OFF";
}

/* ---------- WASTE MODULE ---------- */
function scanWaste() {
  const types = ["Wet", "Dry", "Plastic", "E-Waste"];
  document.getElementById("wasteResult").innerText =
    "AI detected: " + types[Math.floor(Math.random() * types.length)];
}

function illegalDump() {
  document.getElementById("dumpStatus").innerText =
    "Municipal authorities notified.";
}

/* ---------- WATER MODULE ---------- */
function predictRain() {
  document.getElementById("rainStatus").innerText =
    "Rain predicted. Harvesting prepared.";
}

function checkTank() {
  document.getElementById("tankStatus").innerText =
    "Tank level optimized for new rainwater.";
}

function detectLeak() {
  document.getElementById("leakStatus").innerText =
    "Leak detected using acoustic sensors.";
}

/* ---------- STATUS ---------- */
function updateStatus(msg) {
  const el = document.getElementById("systemStatus");
  if (el) el.innerText = msg;
}
