import React from "react";
import { useUI } from "../context/UIContext";

export default function Footer() {
  const { lang } = useUI();
  return (
    <footer className="bg-blue-800 dark:bg-gray-900 text-white text-center text-sm py-4 mt-10">
      <p>
        {lang === "en"
          ? "Data sourced from data.gov.in | Built by Piyush Singh Thakur for Our Voice, Our Rights"
          : "डेटा data.gov.in से लिया गया | 'हमारी आवाज़, हमारे अधिकार' के लिए प्युष सिंह ठाकुर द्वारा निर्मित"}
      </p>
    </footer>
  );
}
