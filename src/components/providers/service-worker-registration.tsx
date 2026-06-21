"use client";

import { useEffect } from "react";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    // Register after load so it never competes with initial page
    // resources for bandwidth/priority.
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").catch((err) => {
        // Non-fatal — the app works fine without offline support,
        // this just means that capability silently doesn't activate.
        console.warn("Service worker registration failed:", err);
      });
    });
  }, []);

  return null;
}
