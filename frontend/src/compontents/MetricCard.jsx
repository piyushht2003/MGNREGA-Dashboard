import React, { useEffect, useState } from "react";
import { Info } from "lucide-react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

export default function MetricCard({ title, subtitle, value, last, icon, color }) {
  const [count, setCount] = useState(0);
  const diff = value - last;
  const trend = diff > 0 ? "↑" : diff < 0 ? "↓" : "→";
  const trendColor =
    diff > 0 ? "text-green-700" : diff < 0 ? "text-red-700" : "text-gray-600";

  useEffect(() => {
    let start = 0;
    const step = Math.ceil(value / 30);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        start = value;
        clearInterval(timer);
      }
      setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div
      className={`p-5 rounded-2xl shadow-md bg-gradient-to-br ${color} text-white text-center transform hover:scale-[1.02] transition`}
    >
      <div className="flex justify-center items-center gap-1 mb-1">
        <span className="text-3xl">{icon}</span>
        <Tippy content={subtitle}>
          <Info size={14} className="opacity-80 cursor-help" />
        </Tippy>
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl font-bold mt-1">{count.toLocaleString()}</p>
      <p className={`text-sm mt-1 ${trendColor} bg-white/20 rounded px-2 inline-block`}>
        {trend} vs last month
      </p>
    </div>
  );
}
