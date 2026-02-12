"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";
import { getMobileMenuStyles } from "@/app/mobileMenuStyles";

const Headersection = ({title}) => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    const darkMode = theme === "dark";
    const mobileMenuStyles = getMobileMenuStyles(darkMode);

    return (
        // <header className="w-full px-2 py-2">
        <header className={`w-full px-2 py-3 bg-linear-to-b ${mobileMenuStyles.Headerbg}`}>
            <div className="w-full mx-auto">

                <motion.div
                    className="relative w-36 h-14 sm:w-48 sm:h-18 md:w-60 md:h-22 rounded-lg overflow-hidden mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Image
                        src="/listen/eisamay.png"
                        alt="Header Banner"
                        fill
                        sizes="(max-width: 640px) 144px, (max-width: 768px) 192px, 240px"
                        className="object-cover"
                    />

                </motion.div>

                {/* <motion.p className="mt-4 text-center text-2xl font-semibold lg:text-base"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}>
                    {title}
                </motion.p> */}
            </div>
        </header>

    );
};

export default Headersection;