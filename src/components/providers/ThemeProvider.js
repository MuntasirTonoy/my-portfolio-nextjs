"use client";

import { createContext, useCallback, useContext, useSyncExternalStore } from "react";

const STORAGE_KEY = "theme";
const ThemeContext = createContext({ theme: "light", toggleTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

// Runs in <head> before first paint so dark-mode users never see a light flash.
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");if(t!=="dark"&&t!=="light"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})();`;

// The <html data-theme> attribute is the source of truth; React subscribes to it.
const subscribe = (onChange) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
};
const getSnapshot = () => document.documentElement.getAttribute("data-theme") || "light";
const getServerSnapshot = () => "light";

export function ThemeProvider({ children }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    const next = getSnapshot() === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Storage may be unavailable (private mode); the theme still applies.
      }
    };
    if (document.startViewTransition) document.startViewTransition(apply);
    else apply();
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
