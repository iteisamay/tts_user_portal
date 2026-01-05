"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const InterstitialAd = ({ onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-2 sm:p-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div
        className="
          bg-white dark:bg-slate-900 
          w-[90%] max-w-sm 
          rounded-xl 
          p-3 sm:p-4 
          text-center
          flex flex-col items-center justify-center
        "
      >
        {/* Sponsored label */}
        <p className="text-xs sm:text-sm mb-2 text-gray-500 dark:text-gray-400">
          Sponsored
        </p>

        {/* Ad Image */}
        <div className="relative w-full h-48 sm:h-60 rounded mb-4 overflow-hidden">
          <Image
            src="/demoo.jpg"
            alt="Sponsored Ad"
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 300px, 728px"
          />
        </div>

        {/* Ad content */}
        {/* <div className="w-full h-48 sm:h-60 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded mb-4 text-gray-700 dark:text-gray-200">
          Interstitial Ad
        </div> */}

        <button
          onClick={onClose}
          className="
            w-full sm:w-auto
            px-4 py-2 
            bg-blue-600 hover:bg-blue-700 
            text-white rounded-md text-sm sm:text-base
            transition-colors"
        >
          Continue
        </button>
      </div>
    </motion.div>
  );
};

export default InterstitialAd;
