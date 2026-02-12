// "use client";
// import { useEffect, useState } from "react";
// import { FiSun, FiMoon } from "react-icons/fi";

// export default function ThemeToggle() {
//   const [theme, setTheme] = useState("light");
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//     const saved = localStorage.getItem("theme");
//     if (saved) setTheme(saved);
//   }, []);

//   useEffect(() => {
//     if (!mounted) return;
//     document.documentElement.setAttribute("data-theme", theme);
//     localStorage.setItem("theme", theme);
//   }, [theme, mounted]);

//   if (!mounted) return null;

//   return (
//     <button
//       onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//       className="p-2 rounded-full bg-white/70 dark:bg-black/70 shadow hover:scale-105 transition"
//       aria-label="Toggle theme"
//     >
//       {theme === "dark" ? <FiSun /> : <FiMoon />}
//     </button>
//   );
// }













"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="
        p-2 rounded-full
        bg-white/70 dark:bg-black/70
        text-black dark:text-white
        shadow-md
        transition-all duration-300
        hover:scale-110 hover:-translate-y-0.5
        active:scale-95
      "
    >
      {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  );
}

