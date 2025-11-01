import React from "react";
import { useUI } from "../context/UIContext";

export default function Hero() {
  const { lang } = useUI();

  return (
    <section className="bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-gray-900 dark:to-gray-800 text-white py-12 text-center">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">
          {lang === "en"
            ? "Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)"
            : "महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी अधिनियम (मनरेगा)"}
        </h1>
        <p className="text-blue-100 leading-relaxed">
          {lang === "en"
            ? "Empowering rural India by guaranteeing 100 days of wage employment every year to every household whose adult members volunteer to do unskilled manual work."
            : "ग्रामीण भारत को सशक्त बनाते हुए प्रत्येक ग्रामीण परिवार को प्रति वर्ष 100 दिन का मजदूरी रोजगार सुनिश्चित करने वाला एक सरकारी कार्यक्रम।"}
        </p>
      </div>
    </section>
  );
}
