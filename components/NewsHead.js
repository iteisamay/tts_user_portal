"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Headersection from "./Headersection";
import NewsPlaylist from "./NewsPlaylist";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import BannerAd from "./ads/BannerAd";
import { useTheme } from "next-themes";
import { getMobileMenuStyles } from "@/app/mobileMenuStyles";

const NewsHead = ({
  id = "",
  language = "Unknown",
  title = "ABCD News Audio",
  audioUrl = null,
  thumbnail = "",
  publishedAt = "",
  duration = null,
  description = "News Audio1"
}) => {

  const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    const darkMode = theme === "dark";
    const mobileMenuStyles = getMobileMenuStyles(darkMode);

  return (
    <motion.div
      className="relative w-full min-h-svh flex items-center justify-center px-0 sm:px-3 bg-transparent"
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* TOP BAR */}
      {/* <div className="fixed top-3 inset-x-0 flex items-center justify-between px-3 sm:px-6 z-50">
        <div className="relative w-20 h-7 sm:w-28 sm:h-10">
          <Image
            src="/eisamay.png"
            alt="Ei Samay Logo"
            fill
            className="object-contain object-left"
            priority
            sizes="(max-width: 768px) 100vw, 200px"
          />
        </div>
        <ThemeToggle />
      </div> */}

      <div className="fixed top-3 inset-x-0 flex items-center justify-end px-3 sm:px-6 z-50">
        <ThemeToggle />
      </div>

      {/* CARD */}
      <div className="relative w-[80%] sm:max-w-md mx-auto lg:w-[90%]">
        <div className="absolute -inset-5 bg-linear-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 blur-3xl animate-pulse" />

        {/* <div className="relative bg-white dark:bg-slate-900 shadow-md dark:shadow-black/40 rounded-xl pt-2 pb-2 px-3 sm:pt-4 sm:pb-4 sm:px-4 mt-12 mb-12"> */}
        <div className={`relative ${mobileMenuStyles.Cardbg} dark:bg-slate-900 shadow-md dark:shadow-black/40 rounded-xl -mx-4 -my-2 px-6 py-6 sm:mx-10 sm:my-10 mt-5`}>
          <Headersection
            title={title}
          />
          {/* <BannerAd slot="mid" className="my-4 mx-auto" /> */}
          <NewsPlaylist
            id={id}
            language={language}
            description={description}
            title={title}
            audioUrl={audioUrl}
            thumbnail={thumbnail}
            publishedAt={publishedAt}
            duration={duration}
          />

        </div>
      </div>
    </motion.div>
  );
};

export default NewsHead;
