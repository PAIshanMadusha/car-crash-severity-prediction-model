// Chart.js instance
let probabilityChart = null;

// Handle form submission
document
  .getElementById("predictionForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    // Disable button and show loading state
    const btn = document.getElementById("predictBtn");
    btn.disabled = true;
    btn.innerHTML = "<span>Predicting...</span>";

    // Gather form data
    const formData = new FormData(e.target);
    const data = {};

    // Convert FormData to JSON object
    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      // Send POST request to server
      const response = await fetch("/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Parse JSON response
      const result = await response.json();

      // Display results
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

// Display prediction results
function displayResults(result) {
  // Get DOM elements
  const resultsSection = document.getElementById("resultsSection");
  const emptyState = document.getElementById("emptyState");
  const resultsContent = document.getElementById("resultsContent");

  // Show results section
  resultsSection.style.display = "block";

  // Hide empty state
  emptyState.style.display = "none";

  // Show results content
  resultsContent.style.display = "block";

  // Scroll to results
  resultsSection.scrollIntoView({ behavior: "smooth" });

  // Update prediction value
  document.getElementById("predictionValue").textContent = result.prediction;

  // Update risk badge
  const riskBadge = document.getElementById("riskBadge");
  riskBadge.textContent = `${result.risk_level} Risk`;
  riskBadge.style.backgroundColor = result.risk_color;
  riskBadge.style.color = "#fff";

  // Update confidence bar
  const confidence = (result.confidence * 100).toFixed(1);
  document.getElementById("confidenceFill").style.width = confidence + "%";
  document.getElementById("confidenceValue").textContent = confidence + "%";

  // Update chart
  updateChart(result.probabilities);

  // Update probability list
  updateProbabilityList(result.probabilities);
}

// Update Chart.js bar chart
function updateChart(probabilities) {
  // Get chart context
  const ctx = document.getElementById("probabilityChart").getContext("2d");

  // Destroy existing chart if it exists
  if (probabilityChart) {
    probabilityChart.destroy();
  }

  // Extract labels from probabilities
  const labels = Object.keys(probabilities);
  // Map probabilities to percentage values
  const values = Object.values(probabilities).map((v) => (v * 100).toFixed(1));

  // Create new bar chart
  probabilityChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Probability (%)",
          data: values,
          backgroundColor: [
            "rgba(231, 76, 60, 0.8)",
            "rgba(46, 204, 113, 0.8)",
            "rgba(243, 156, 18, 0.8)",
          ],
          borderColor: [
            "rgba(231, 76, 60, 1)",
            "rgba(46, 204, 113, 1)",
            "rgba(243, 156, 18, 1)",
          ],
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Severity Probabilities Distribution",
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: function (value) {
              return value + "%";
            },
          },
        },
      },
    },
  });
}

// Update probability list
function updateProbabilityList(probabilities) {
  // Get list container
  const listContainer = document.getElementById("probabilityList");
  listContainer.innerHTML = "";

  // Sort probabilities in descending order
  const sorted = Object.entries(probabilities).sort((a, b) => b[1] - a[1]);

  // Create list items
  sorted.forEach(([severity, prob]) => {
    const item = document.createElement("div");
    item.className = "prob-item";

    const label = document.createElement("span");
    label.className = "prob-label";
    label.textContent = severity;

    const value = document.createElement("span");
    value.className = "prob-value";
    value.textContent = (prob * 100).toFixed(1) + "%";

    // Color code based on severity
    if (severity === "Fatal") {
      value.style.color = "#e74c3c";
    } else if (severity === "Severe Injury") {
      value.style.color = "#f39c12";
    } else {
      value.style.color = "#2ecc71";
    }

    item.appendChild(label);
    item.appendChild(value);
    listContainer.appendChild(item);
  });
}

// Keyboard shortcut for form submission
document.addEventListener("keydown", function (e) {
  // Check for Ctrl+Enter or Cmd+Enter
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    document
      .getElementById("predictionForm")
      .dispatchEvent(new Event("submit"));
  }
});

// Export functions for testing
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    displayResults,
    updateChart,
    updateProbabilityList,
  };
}
