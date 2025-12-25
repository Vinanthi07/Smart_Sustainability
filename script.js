/* FOOD */
/* ===== FOOD WITH FRESHNESS TIMER ===== */

let foods = [];

function addFood() {
  const name = foodName.value;
  const qty = foodQty.value;
  const minutes = expiry.value;

  if (!name || !qty || !minutes) {
    foodStatus.innerText = "Fill all fields";
    return;
  }

  const expiryTime = Date.now() + minutes * 60000;

  foods.push({ name, qty, expiryTime });
  foodStatus.innerText = "Food uploaded successfully";

  updateFoodList();
}

function updateFoodList() {
  const now = Date.now();
  foodList.innerHTML = "";

  foods = foods.filter(f => f.expiryTime > now);

  if (foods.length === 0) {
    foodList.innerText = "No fresh food available";
    return;
  }

  foods.forEach(f => {
    const remaining = Math.floor((f.expiryTime - now) / 60000);
    foodList.innerHTML +=
      `<div>🍱 ${f.name} (${f.qty}) – Fresh for ${remaining} min</div>`;
  });

  setTimeout(updateFoodList, 60000);
}


/* ===== AI WASTE DETECTION (FIXED) ===== */

let model, webcam;

async function startAIDetection() {
  const status = document.getElementById("wasteStatus");
  status.innerText = "Loading AI model...";

  try {
    const modelURL = "YOUR_MODEL_URL/model.json";
    const metadataURL = "YOUR_MODEL_URL/metadata.json";

    model = await tmImage.load(modelURL, metadataURL);

    webcam = new tmImage.Webcam(300, 300, true);
    await webcam.setup(); // permission popup happens here
    await webcam.play();

    document.getElementById("webcamContainer").appendChild(webcam.canvas);

    status.innerText = "Camera started. Detecting waste...";
    window.requestAnimationFrame(predictWaste);

  } catch (err) {
    console.error(err);
    status.innerText =
      "Camera failed. Allow camera permission & use HTTPS.";
  }
}

async function predictWaste() {
  if (!webcam || !model) return;

  const prediction = await model.predict(webcam.canvas);

  let best = prediction.reduce((a, b) =>
    a.probability > b.probability ? a : b
  );

  document.getElementById("wasteStatus").innerText =
    `Detected: ${best.className} (${(best.probability * 100).toFixed(1)}%)`;

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
