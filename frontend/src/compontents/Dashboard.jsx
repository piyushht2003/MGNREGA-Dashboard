import React, { useEffect, useState } from "react";
import MetricCard from "./MetricCard";
import { useUI } from "../context/UIContext";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const { lang } = useUI();

  useEffect(() => {
    fetch("http://localhost:4000/api/district/Bhopal")
      .then((res) => res.json())
      .then(setData)
      .catch(() => setData(null));
  }, []);

  if (!data) return <p className="text-center py-10">Loading district data...</p>;

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Work Demand (in lakhs)",
        data: [10, 12, 15, 9, 18],
        borderColor: "#2563eb",
        tension: 0.4,
        fill: true,
        backgroundColor: "rgba(37,99,235,0.15)",
      },
    ],
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-[2fr,1fr] gap-8">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-blue-800 dark:text-blue-300">
          {lang === "en"
            ? `${data.district} District Overview`
            : `${data.district} ज़िले का सारांश`}
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          <MetricCard
            title={lang === "en" ? "People Worked" : "काम करने वाले लोग"}
            subtitle="Number of workers employed under MGNREGA"
            value={data.peopleWorked}
            last={data.lastPeopleWorked}
            icon="👷"
            color="from-blue-500 to-blue-600"
          />
          <MetricCard
            title={lang === "en" ? "Wages Paid" : "भुगतान की गई मजदूरी"}
            subtitle="Total wages disbursed this month"
            value={data.totalWages}
            last={data.lastTotalWages}
            icon="💰"
            color="from-green-500 to-green-600"
          />
          <MetricCard
            title={lang === "en" ? "Projects Ongoing" : "चल रहे प्रोजेक्ट"}
            subtitle="Number of projects active"
            value={data.projectsOngoing}
            last={data.lastProjectsOngoing}
            icon="🏗️"
            color="from-orange-500 to-orange-600"
          />
        </div>

        <div className="mt-8 p-4 bg-white  rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-3 text-blue-700">
            {lang === "en"
              ? "Monthly Work Demand Trend"
              : "मासिक कार्य मांग प्रवृत्ति"}
          </h3>
          <Line data={chartData} />
        </div>

        <div className="mt-6 bg-blue-50 p-4 rounded-xl">
          <h4 className="font-semibold text-blue-700 ">
            {lang === "en" ? "Insight" : "जानकारी"}
          </h4>
          <p className="text-gray-700  text-sm mt-1">
            {lang === "en"
              ? "This month, Bhopal recorded a 12% increase in employment demand compared to April. Wage disbursal also grew steadily, reflecting a positive trend in rural job creation."
              : "इस महीने, भोपाल में अप्रैल की तुलना में रोजगार की मांग में 12% की वृद्धि हुई। मजदूरी भुगतान में भी वृद्धि हुई, जो ग्रामीण रोजगार सृजन की सकारात्मक दिशा को दर्शाता है।"}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-blue-800 ">
          {lang === "en" ? "Know MGNREGA Better" : "मनरेगा को समझें"}
        </h3>
        <ul className="space-y-3 text-sm text-gray-700 leading-relaxed">
          <li>📅 {lang === "en" ? "Started in 2006 to ensure rural livelihood." : "2006 में ग्रामीण आजीविका सुनिश्चित करने के लिए शुरू हुआ।"}</li>
          <li>👩‍🌾 {lang === "en" ? "Guarantees 100 days of wage employment per household annually." : "प्रत्येक ग्रामीण परिवार को प्रति वर्ष 100 दिन का रोजगार सुनिश्चित करता है।"}</li>
          <li>💰 {lang === "en" ? "Focuses on unskilled manual work in local areas." : "स्थानीय क्षेत्रों में अकुशल कार्यों पर केंद्रित।"}</li>
          <li>📈 {lang === "en" ? "Promotes sustainable asset creation like water conservation & roads." : "जल संरक्षण और सड़कों जैसे स्थायी संपत्ति निर्माण को प्रोत्साहित करता है।"}</li>
        </ul>
      </div>
    </section>
  );
}
