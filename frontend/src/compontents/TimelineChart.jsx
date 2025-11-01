import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

export default function TimelineChart({ history }) {
  const ref = useRef();

  useEffect(() => {
    if (!history?.length) return;
    const ctx = ref.current.getContext("2d");

    // destroy any previous chart instance
    if (window.myChart) {
      window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: history.map((h) => h.month),
        datasets: [
          {
            label: "People Worked (लोगों की संख्या)",
            data: history.map((h) => h.people),
            borderColor: "#22c55e",
            backgroundColor: "rgba(34, 197, 94, 0.15)",
            fill: true,
            tension: 0.4,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: "#16a34a",
          },
          {
            label: "Wages Paid ₹ (भुगतान)",
            data: history.map((h) => h.wages / 1000000), // show in millions
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.15)",
            fill: true,
            tension: 0.4,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: "#1d4ed8",
            yAxisID: "y2",
          },
        ],
      },
      options: {
        responsive: true,
        interaction: { mode: "index", intersect: false },
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { font: { size: 13 } },
            position: "bottom",
          },
          tooltip: {
            backgroundColor: "#1e293b",
            titleFont: { size: 13, weight: "bold" },
            bodyFont: { size: 12 },
            cornerRadius: 6,
            callbacks: {
              label: (context) => {
                const label = context.dataset.label || "";
                const value = context.parsed.y;
                if (context.dataset.label.includes("₹")) {
                  return `${label}: ₹${(value * 1000000).toLocaleString()}`;
                }
                return `${label}: ${value.toLocaleString()}`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "People Worked",
              color: "#16a34a",
              font: { size: 13, weight: "bold" },
            },
            grid: { color: "rgba(0,0,0,0.05)" },
          },
          y2: {
            beginAtZero: true,
            position: "right",
            title: {
              display: true,
              text: "Wages (₹ Lakhs)",
              color: "#2563eb",
              font: { size: 13, weight: "bold" },
            },
            grid: { drawOnChartArea: false },
          },
          x: {
            grid: { color: "rgba(0,0,0,0.03)" },
          },
        },
      },
    });
  }, [history]);

  return (
    <div className="bg-white rounded-2xl mt-20 p-20 shadow-md ">
      <h3 className="text-xl font-semibold mb-2 text-gray-700 text-center">
        📊 District Performance (जिला प्रदर्शन)
      </h3>
      <div className="h-80">
        <canvas ref={ref}></canvas>
      </div>
      <p className="text-xs text-gray-500 text-center mt-2">
        Data represents the last 6 months
      </p>
    </div>
  );
}
