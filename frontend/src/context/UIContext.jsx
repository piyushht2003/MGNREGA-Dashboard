import React, { createContext, useContext, useState, useEffect } from "react";

const UIContext = createContext();
export const useUI = () => useContext(UIContext);

export const UIProvider = ({ children }) => {
  const [dark, setDark] = useState(false);
  const [lang, setLang] = useState("en");
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <UIContext.Provider value={{ dark, setDark, lang, setLang, online }}>
      {children}
    </UIContext.Provider>
  );
};
