import { onCLS, onFID, onLCP, onTTFB } from "web-vitals";
import Chart from "chart.js/auto";
import axios from "axios";

const metricsData = [];

/**
 * Initialize Web Performance Monitoring.
 * @param {Object} config - Configuration options.
 * @param {string} config.endpoint - URL to send metrics.
 * @param {function} [config.onMetric] - Callback for handling metrics locally.
 */
export function initPerformanceMonitor({ endpoint, onMetric }) {
  const sendMetric = (metric) => {
    metricsData.push(metric);
    if (endpoint) {
      axios.post(endpoint, metric).catch((err) => console.error("Error sending metric:", err));
    }
    if (onMetric) {
      onMetric(metric);
    }
  };

  
  onCLS(sendMetric);
  onFID(sendMetric);
  onLCP(sendMetric);
  onTTFB(sendMetric);
}

/**
 * Generate a chart for performance metrics.
 * @param {string} containerId - The ID of the HTML container for the chart.
 */

let chartInstance = null;

export function generatePerformanceChart(containerId) {
  const ctx = document.getElementById(containerId).getContext("2d");

  const labels = metricsData.map((metric) => metric.name);
  const values = metricsData.map((metric) => metric.value);

  if (chartInstance) {
    chartInstance.destroy(); // Destroy the old chart before creating a new one
  }

  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Web Performance Metrics",
          data: values,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      options: {
        animation: {
          duration: 1000, // Smooth animation for updates
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// Update chart dynamically
let updateTimeout;
export function updateChart() {
  clearTimeout(updateTimeout);
  updateTimeout = setTimeout(() => {
    if (chartInstance) {
      chartInstance.data.labels = metricsData.map((metric) => metric.name);
      chartInstance.data.datasets[0].data = metricsData.map((metric) => metric.value);
      chartInstance.update();
    }
  }, 500); // Update at most every 500ms
}
