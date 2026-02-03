let probabilityChart = null;

document
  .getElementById("predictionForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn = document.getElementById("predictBtn");
    btn.disabled = true;
    btn.innerHTML = "<span>Predicting...</span>";

    const formData = new FormData(e.target);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      const response = await fetch("/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        displayResults(result);
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Prediction failed. Please try again!");
    } finally {
      btn.disabled = false;
      btn.innerHTML =
        '<span>Predict Severity</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2"/></svg>';
    }
  });
