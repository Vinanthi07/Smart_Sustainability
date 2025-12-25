let map;
let userLat, userLng;
let foodListings = [];
const NGO_RADIUS = 2; // km

// Initialize map with user location
navigator.geolocation.getCurrentPosition(pos => {
  userLat = pos.coords.latitude;
  userLng = pos.coords.longitude;

  map = L.map("map").setView([userLat, userLng], 14);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
  }).addTo(map);

  L.circle([userLat, userLng], {
    radius: NGO_RADIUS * 1000,
    color: "green",
    fillOpacity: 0.1
  }).addTo(map).bindPopup("NGO visibility radius");
});

// Upload food
function uploadFood() {
  const food = document.getElementById("food").value;
  const qty = document.getElementById("qty").value;
  const time = parseInt(document.getElementById("time").value);

  if (!food || !qty || !time) {
    document.getElementById("foodStatus").innerText =
      "Please fill all fields.";
    return;
  }

  const listing = {
    food,
    qty,
    timeLeft: time * 60, // seconds
    lat: userLat,
    lng: userLng
  };

  listing.marker = L.marker([listing.lat, listing.lng]).addTo(map);

  foodListings.push(listing);
  updatePopup(listing);
  startCountdown(listing);

  document.getElementById("foodStatus").innerText =
    "Food uploaded and visible to nearby NGOs.";
}

// Update marker popup
function updatePopup(listing) {
  listing.marker.bindPopup(`
    <b>${listing.food}</b><br>
    Quantity: ${listing.qty}<br>
    ⏱ Time left: <span id="t${listing.timeLeft}">${formatTime(listing.timeLeft)}</span><br><br>
    <button onclick="claimFood(${foodListings.indexOf(listing)})">
      Claim & Navigate
    </button>
  `);
}

// Countdown logic
function startCountdown(listing) {
  listing.interval = setInterval(() => {
    listing.timeLeft--;

    if (listing.timeLeft <= 0) {
      map.removeLayer(listing.marker);
      clearInterval(listing.interval);
      document.getElementById("systemStatus").innerText =
        "A food listing expired and was removed.";
      return;
    }

    updatePopup(listing);
  }, 1000);
}

// Claim food
function claimFood(index) {
  const listing = foodListings[index];
  clearInterval(listing.interval);
  map.removeLayer(listing.marker);

  window.open(
    `https://www.google.com/maps/dir/?api=1&destination=${listing.lat},${listing.lng}`,
    "_blank"
  );

  document.getElementById("systemStatus").innerText =
    "Food claimed successfully. Navigation started.";
}

// Time format helper
function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}m ${s}s`;
}
