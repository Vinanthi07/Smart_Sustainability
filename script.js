/* FOOD */
let foods = [];

function addFood() {
  const name = foodName.value;
  const qty = foodQty.value;
  if (!name || !qty) return;

  foods.push(`${name} (${qty})`);
  foodList.innerHTML = foods.join("<br>");
  foodStatus.innerText = "Food uploaded successfully";

  navigator.geolocation.getCurrentPosition(pos => {
    const map = L.map("map").setView([pos.coords.latitude, pos.coords.longitude], 14);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
    L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map);
  });
}

/* WASTE */
function startCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => video.srcObject = stream)
    .catch(() => wasteStatus.innerText = "Camera access denied");
}

function detectWaste(type) {
  wasteStatus.innerText = `Detected waste type: ${type}`;
}

/* ILLEGAL DUMP */
function markDump() {
  navigator.geolocation.getCurrentPosition(pos => {
    dumpStatus.innerText =
      `Location recorded: ${pos.coords.latitude}, ${pos.coords.longitude}`;
  });
}

/* WATER */
let user = {};

function registerUser() {
  user.name = owner.value;
  user.city = city.value;
  regStatus.innerText = "Registered successfully";
}

async function predictRain() {
  if (!user.city) {
    rainStatus.innerText = "Register location first";
    return;
  }
  rainStatus.innerText = `Checking weather for ${user.city}... (demo data)`;
}

function checkTank() {
  tankStatus.innerText = "Tank level optimal. Ready for rainwater harvesting.";
}
