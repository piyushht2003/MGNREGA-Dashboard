import React, { useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useUI } from "../context/UIContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { dark, setDark, lang, setLang } = useUI();

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-600 dark:from-gray-800 dark:to-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center text-white">
        <div className="flex items-center gap-2">
          <img
            src="https://images.seeklogo.com/logo-png/4/2/emblem-of-india-logo-png_seeklogo-47357.png"
            alt="India Emblem"
            className="h-12 w-12"
          />
          <div>
            <h1 className="font-extrabold text-lg sm:text-xl tracking-wide">
              {lang === "en" ? "Our Voice, Our Rights" : "हमारी आवाज़, हमारे अधिकार"}
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm">MGNREGA Dashboard</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3">
          <button onClick={() => setDark(!dark)}>
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="border border-white/40 rounded px-2 py-1 text-xs hover:bg-white/10"
          >
            {lang === "en" ? "हिन्दी" : "EN"}
          </button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden focus:outline-none"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="sm:hidden bg-blue-800 dark:bg-gray-800 flex flex-col items-center pb-3">
          <button
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="py-1 text-sm text-white"
          >
            {lang === "en" ? "हिन्दी" : "EN"}
          </button>
          <button onClick={() => setDark(!dark)} className="py-1 text-white text-sm">
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      )}
    </nav>
  );
}
