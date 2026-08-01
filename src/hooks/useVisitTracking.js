import { useEffect, useRef } from "react";
import api from "../api/axios";
import resolveCountry from "../utils/countries";

const STORAGE_KEY = "manami_tracked_paths";

const useVisitTracking = () => {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      return;
    }

    try {
      const tracked = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");
      const key = window.location.pathname;
      if (Array.isArray(tracked) && tracked.includes(key)) return;
      tracked.push(key);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(tracked));
    } catch {
      /* ignore */
    }

    resolveCountry()
      .then(({ country, code }) =>
        api.post("/analytics/track", {
          path: window.location.pathname + window.location.search,
          country,
          countryCode: code,
          referrer: document.referrer || "",
          screenWidth: window.innerWidth,
          isMobile: window.innerWidth < 768,
        })
      )
      .catch(() => {
        /* tracking must never break the page */
      });
  }, []);
};

export default useVisitTracking;
