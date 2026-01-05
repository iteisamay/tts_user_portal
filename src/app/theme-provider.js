// "use client";

// import { useEffect, useState } from "react";

// export default function ThemeProvider({ children }) {
//   const [theme, setTheme] = useState("light");

//   useEffect(() => {
//     document.documentElement.setAttribute("data-theme", theme);
//   }, [theme]);

//   return (
//     <>
//       {/* Optional toggle (for testing) */}
//       {/* <button
//         onClick={() => setTheme(t => (t === "light" ? "dark" : "light"))}
//         className="fixed top-4 right-4 z-50 rounded bg-black px-3 py-1 text-white"
//       >
//         {theme === "light" ? "🌙 Dark" : "☀️ Light"}
//       </button> */}

//       {children}
//     </>
//   );
// }
