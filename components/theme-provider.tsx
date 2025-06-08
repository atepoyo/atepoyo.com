"use client";
import { useEffect } from "react";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const now = new Date();
    const jstHour = (now.getUTCHours() + 9) % 24;
    let cls = "theme-night";
    if (jstHour >= 6 && jstHour < 18) {
      cls = "theme-day";
    }
    document.body.classList.remove("theme-day", "theme-night");
    document.body.classList.add(cls);
  }, []);
  return <>{children}</>;
}
