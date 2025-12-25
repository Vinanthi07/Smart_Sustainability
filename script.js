//* ================== FOOD ================== */
let foods = [];
let map, markers = [];

function addFood() {
  const name = document.getElementById("foodName").value;
  const qty = document.getElementById("foodQty").value;
  const minutes = parseInt(document.getElementById("expiry").value);

  if (!name || !qty || !minutes) {
    document.getElementById("foodStatus").innerText = "Fill all fields";
    return;
  }

  const expiryTime = Date.now() + minutes * 60000;
  foods.push({ name, qty, expiryTime });

  document.getElementById("foodStatus").innerText = "Food uploaded successfully";
  updateFoodList();

  if (!map) initMap();
}

function updateFoodList() {
  const now = Date.now();
  const listDiv = document.getElementById("foodList");
  listDiv.innerHTML = "";

  foods = foods.filter(f => f.expiryTime > now);

  if (foods.length === 0) { listDiv.innerText = "No food available"; return; }

  foods.forEach(f => {
    const remaining = Math.ceil((f.expiryTime - now) / 60000);
    listDiv.innerHTML += `🍱 ${f.name} (${f.qty}) - Fresh for ${remaining} min<br>`;
  });

  setTimeout(updateFoodList, 60000);
}

function initMap() {
  navigator.geolocation.getCurrentPosition(pos => {
    map = L.map("map").setView([pos.coords.latitude, pos.coords.longitude], 14);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    foods.forEach(f => {
      const marker = L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map)
        .bindPopup(`🍱 ${f.name} (${f.qty})`);
      markers.push(marker);
    });
  });
}

/* ================== WASTE ================== */
function startCamera() {
  const video = document.getElementById("camera");
  const status = document.getElementById("wasteStatus");

  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
      status.innerText = "Camera started. Select waste type manually.";
    })
    .catch(() => status.innerText = "Camera permission denied");
}

function markDump() {
  navigator.geolocation.getCurrentPosition(pos => {
    document.getElementById("dumpStatus").innerText =
      `Dump location: (${pos.coords.latitude}, ${pos.coords.longitude})`;
  });
}

/* ================== WATER ================== */
let user = {};

function registerUser() {
  user.name = document.getElementById("owner").value;
  user.city = document.getElementById("city").value;

  if(!user.name || !user.city) {
    regStatus.innerText = "Fill all fields";
    return;
  }
  regStatus.innerText = `Registered: ${user.name}, ${user.city}`;
}

function predictRain() {
  if(!user.city) { rainStatus.innerText="Register first"; return;}
  rainStatus.innerText = `Rain predicted in ${user.city} (demo data)`;
}

function checkTank() {
  if(!user.name) { tankStatus.innerText="Register first"; return;}
  tankStatus.innerText = `Tank at ${user.name}'s location is optimal`;
}
