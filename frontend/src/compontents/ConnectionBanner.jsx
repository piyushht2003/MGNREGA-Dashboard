import React from "react";
import { useUI } from "../context/UIContext";

export default function ConnectionBanner() {
  const { online } = useUI();
  if (online) return null;
  return (
    <div className="bg-red-600 text-white text-center text-sm py-1">
      ⚠️ You are offline — showing last saved data.
    </div>
  );
}
