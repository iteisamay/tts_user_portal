"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { RiInformation2Fill } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { getMobileMenuStyles } from "@/app/mobileMenuStyles";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const buttonRef = useRef(null);

  const isDark = theme === "dark";
  const darkMode = theme === "dark";
  const mobileMenuStyles = getMobileMenuStyles(darkMode);
  const googleFormLink = "https://forms.office.com/Pages/ResponsePage.aspx?id=1XCba2GJwUWYM4LoK7TUWCmh6uv1JgBPh6qj33Zeb7tUMUFHNzRYUk1RNlRTUU9ITzdTNDZZT09QNC4u";

  // Mounted effect
  useEffect(() => {
    setMounted(true);
  }, []);

  // Global event listener (ALWAYS declared, never conditional)
  useEffect(() => {
    const handleTrigger = () => {
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
      }, 8000);
    };

    window.addEventListener("triggerFeedbackPopup", handleTrigger);

    return () => {
      window.removeEventListener("triggerFeedbackPopup", handleTrigger);
    };
  }, []);

  return (
    <div className="relative flex items-center gap-3">

      {mounted && (
        <>
          <AnimatePresence>
            {showPopup && (
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                exit={{ scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{ originX: 1 }} 
                className={`absolute right-0 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs lg:text-sm 
                ${mobileMenuStyles.feedback} md:text-sm px-2 lg:px-4 md:px-4 py-2 rounded-full shadow-xl border z-0 mr-20
              `}
              >
                Please Share your Feedback With Us
              </motion.div>
            )}
          </AnimatePresence>

          {/* Feedback Button */}
          <button
            ref={buttonRef}
            onClick={() => window.open(googleFormLink, "_blank")}
            aria-label="Give Feedback"
            className="
              p-2 rounded-full
              bg-white/70 dark:bg-black/70
              text-blue-600 dark:text-blue-400
              shadow-md transition-all duration-300
              hover:scale-110 hover:-translate-y-0.5
              active:scale-95 relative z-10
            "
          >
            <RiInformation2Fill size={18} />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Toggle theme"
            className="
              p-2 rounded-full
              bg-white/70 dark:bg-black/70
              text-black dark:text-white
              shadow-md transition-all duration-300
              hover:scale-110 hover:-translate-y-0.5
              active:scale-95
            "
          >
            {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
        </>
      )}
    </div>
  );
}