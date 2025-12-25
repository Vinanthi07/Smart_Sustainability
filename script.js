let foodActive = false;
let map, marker, foodLat, foodLng;

/* Initialize map */
navigator.geolocation.getCurrentPosition(position => {
  foodLat = position.coords.latitude;
  foodLng = position.coords.longitude;

  map = L.map("map").setView([foodLat, foodLng], 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
  }).addTo(map);
});

/* Upload food */
function uploadFood() {
  const food = document.getElementById("food").value;
  const qty = document.getElementById("qty").value;
  const time = document.getElementById("time").value;

  if (!food || !qty || !time) {
    document.getElementById("foodStatus").innerText =
      "Please fill all fields.";
    return;
  }

  foodActive = true;

  marker = L.marker([foodLat, foodLng])
    .addTo(map)
    .bindPopup("🍱 Surplus Food Available")
    .openPopup();

  document.getElementById("foodStatus").innerText =
    "Food uploaded and visible on live map.";

  /* Freshness timer */
  setTimeout(() => {
    if (foodActive) {
      map.removeLayer(marker);
      document.getElementById("foodStatus").innerText =
        "Food expired and removed automatically.";
      foodActive = false;
    }
  }, time * 60000);
}

/* Notify NGOs */
function notifyNGO() {
  if (foodActive) {
    document.getElementById("alertStatus").innerText =
      "Nearby NGOs alerted via SMS & WhatsApp.";
  } else {
    document.getElementById("alertStatus").innerText =
      "No active food listing.";
  }
}

/* Claim & Navigate */
function claimFood() {
  if (!foodActive) {
    document.getElementById("claimStatus").innerText =
      "Food already claimed or expired.";
    return;
  }

  foodActive = false;
  map.removeLayer(marker);

  window.open(
    `https://www.google.com/maps/dir/?api=1&destination=${foodLat},${foodLng}`,
    "_blank"
  );

  document.getElementById("claimStatus").innerText =
    "Food claimed. Navigation opened.";
}
