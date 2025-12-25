let foodActive = false;

function uploadFood() {
  const food = document.getElementById("foodName").value;
  const qty = document.getElementById("quantity").value;
  const time = document.getElementById("timer").value;

  if (food && qty && time) {
    foodActive = true;
    document.getElementById("donorStatus").innerText =
      "Food listed successfully. Timer started.";

    setTimeout(() => {
      if (foodActive) {
        document.getElementById("donorStatus").innerText =
          "Food expired. Listing removed automatically.";
        foodActive = false;
      }
    }, time * 60000);
  } else {
    document.getElementById("donorStatus").innerText =
      "Please fill all fields.";
  }
}

function sendAlerts() {
  if (foodActive) {
    document.getElementById("alertStatus").innerText =
      "Nearby NGOs alerted via SMS & WhatsApp.";
  } else {
    document.getElementById("alertStatus").innerText =
      "No active food listing available.";
  }
}

function claimFood() {
  if (foodActive) {
    foodActive = false;
    document.getElementById("claimStatus").innerText =
      "Food claimed. Navigate to location to rescue food.";
  } else {
    document.getElementById("claimStatus").innerText =
      "Food already claimed or expired.";
  }
}
