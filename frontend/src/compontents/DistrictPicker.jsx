import React from "react";

export default function DistrictPicker({ value, onChange, onDetect }) {
  const list = ["jabalpur", "bhopal", "indore", "ujjain", "gwalior"];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-3 my-5 pt-10 py-10">
      <div>
        <label className="text-gray-700 text-sm font-semibold block mb-1">
          Select District / जिला चुनें
        </label>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border border-gray-300 bg-white p-2 rounded-lg w-56 shadow focus:ring-2 focus:ring-blue-400"
        >
          {list.map((d) => (
            <option key={d} value={d}>
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={onDetect}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition mt-2 sm:mt-6"
      >
        📍 Detect My District
      </button>
    </div>
  );
}
