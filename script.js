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
/* ===== AI WASTE DETECTION ===== */

let model, webcam, maxPredictions;

async function startAIDetection() {
  const modelURL = "YOUR_MODEL_URL/model.json";
  const metadataURL = "YOUR_MODEL_URL/metadata.json";

  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  webcam = new tmImage.Webcam(300, 300, true);
  await webcam.setup();
  await webcam.play();
  document.getElementById("video").replaceWith(webcam.canvas);

  window.requestAnimationFrame(predictWaste);
}

async function predictWaste() {
  const prediction = await model.predict(webcam.canvas);

  let highest = prediction[0];
  for (let i = 1; i < prediction.length; i++) {
    if (prediction[i].probability > highest.probability) {
      highest = prediction[i];
    }
  }

  document.getElementById("wasteStatus").innerText =
    `Detected Waste: ${highest.className} (${(highest.probability * 100).toFixed(1)}%)`;

  window.requestAnimationFrame(predictWaste);
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
