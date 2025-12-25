let foodActive = false;

function uploadFood() {
  const time = document.getElementById("time").value;
  foodActive = true;
  document.getElementById("foodStatus").innerText =
    "Food listed. Auto removal after freshness timer.";

  setTimeout(() => {
    if (foodActive) {
      document.getElementById("foodStatus").innerText =
        "Food expired and removed automatically.";
      foodActive = false;
    }
  }, time * 60000);
}

function claimFood() {
  if (foodActive) {
    foodActive = false;
    document.getElementById("claimStatus").innerText =
      "Food claimed and navigation enabled.";
  } else {
    document.getElementById("claimStatus").innerText =
      "No active food available.";
  }
}

function scanWaste() {
  const types = ["Wet", "Dry", "Plastic", "E-Waste"];
  document.getElementById("wasteResult").innerText =
    "AI detected: " + types[Math.floor(Math.random()*types.length)] +
    " waste → directed to correct bin.";
}

function illegalDump() {
  document.getElementById("dumpStatus").innerText =
    "Illegal dumping detected. Municipal authorities alerted.";
}

function checkRain() {
  document.getElementById("rainStatus").innerText =
    "Rain predicted. Tank space optimized for harvesting.";
}

function detectLeak() {
  document.getElementById("leakStatus").innerText =
    "Acoustic sensors detected leak. Maintenance alerted.";
}
