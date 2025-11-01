import React, { useState, useEffect } from "react";
import { getDistrictData } from "./api";
import DistrictPicker from "./compontents/DistrictPicker";
import MetricCard from "./compontents/MetricCard";
import TimelineChart from "./compontents/TimelineChart";
import Navbar from "./compontents/Navbar";
import Footer from "./compontents/Footer";
import ConnectionBanner from "./compontents/ConnectionBanner";
import { UIProvider } from "./context/UIContext";
import Hero from "./compontents/Hero";
import Dashboard from "./compontents/Dashboard";

function speak(text, lang) {
  if (!("speechSynthesis" in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 1.05;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

export default function App() {
  const [district, setDistrict] = useState("jabalpur");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => { loadData(district); }, [district]);

  async function loadData(name) {
    try {
      setLoading(true);
      const res = await getDistrictData(name);
      setData(res);
      setError("");
    } catch {
      setError("⚠️ Unable to load data.");
    } finally {
      setLoading(false);
    }
  }

  async function detectDistrict() {
    if (!navigator.geolocation) return alert("Geolocation not supported.");
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const json = await res.json();
        const found =
          json.address?.district ||
          json.address?.county ||
          json.address?.state_district ||
          "jabalpur";
        alert(`Detected district: ${found}`);
        setDistrict(found.toLowerCase());
      } catch {
        alert("Could not detect district.");
      }
    });
  }

  const calcChange = (curr, prev) =>
    ((curr - prev) / prev * 100).toFixed(1);

  return (
    <>
      <Navbar />
    <div className="min-h-screen bg-gradient-to-b px-10 py-4 from-blue-50 to-white text-gray-800">
      <ConnectionBanner />
      <Hero />
      <div className="p-4 max-w-5xl mx-auto">
        <DistrictPicker value={district} onChange={setDistrict} onDetect={detectDistrict} />

        {loading && <p className="text-center mt-10 text-gray-600 animate-pulse">⏳ Loading data...</p>}
        {error && <p className="text-center text-red-600 mb-4">{error}</p>}

        {!loading && data && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-4">
              <MetricCard
                title="People Worked"
                subtitle="काम करने वाले लोग"
                value={data.metrics.people_worked.this_month}
                last={data.metrics.people_worked.last_month}
                icon="👷‍♂️"
                color="from-green-400 to-green-600"
              />
              <MetricCard
                title="Wages Paid (₹)"
                subtitle="भुगतान की राशि"
                value={data.metrics.wages_paid.this_month}
                last={data.metrics.wages_paid.last_month}
                icon="💰"
                color="from-yellow-400 to-yellow-600"
              />
              <MetricCard
                title="Average Work Days"
                subtitle="औसत कार्य दिवस"
                value={data.metrics.avg_days.this_month}
                last={data.metrics.avg_days.last_month}
                icon="📅"
                color="from-blue-400 to-blue-600"
              />
            </div>

            <TimelineChart history={data.history || []} />

            {/* Insight Summary */}
            <div className="mt-6 bg-blue-50 p-4 rounded-xl border border-blue-100 shadow-sm text-center">
              <h4 className="font-semibold text-blue-700">📊 Monthly Insight</h4>
              <p className="text-gray-700 text-sm mt-1">
                {data.district} has shown a{" "}
                <span className="text-green-600 font-semibold">
                  {calcChange(
                    data.metrics.people_worked.this_month,
                    data.metrics.people_worked.last_month
                  )}
                  % increase
                </span>{" "}
                in workers and a{" "}
                <span className="text-green-600 font-semibold">
                  ₹{(
                    (data.metrics.wages_paid.this_month -
                      data.metrics.wages_paid.last_month) / 100000
                  ).toFixed(1)} L
                </span>{" "}
                rise in wages compared to last month.
              </p>
            </div>

            {/* Voice Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
                onClick={() =>
                  speak(
                    `In ${data.district}, ${data.metrics.people_worked.this_month} people worked and wages of ${data.metrics.wages_paid.this_month} rupees were paid.`,
                    "en-IN"
                  )
                }
              >
                🔊 Listen (English)
              </button>

              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                onClick={() =>
                  speak(
                    `${data.district} जिले में इस महीने ${data.metrics.people_worked.this_month} लोगों ने काम किया और ${data.metrics.wages_paid.this_month} रुपये का भुगतान किया गया।`,
                    "hi-IN"
                  )
                }
              >
                🔊 सुनिए (Hindi)
              </button>
            </div>
            <Dashboard />

            <p className="text-sm text-gray-500 mt-5 text-center">
              Last updated: {new Date(data.last_updated).toLocaleString()}
            </p>
          </>
        )}
      </div>
      <Footer />
    </div>
    </>
  );
}