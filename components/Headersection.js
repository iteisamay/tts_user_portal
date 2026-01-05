"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const Headersection = ({title}) => {
    return (
        // <header className="w-full px-2 py-2">
        <header className="w-full px-2 py-3 bg-linear-to-b from-white to-gray-100">
            <div className="w-full mx-auto">

                <motion.div
                    className="relative w-36 h-14 sm:w-48 sm:h-18 md:w-60 md:h-22 rounded-lg overflow-hidden mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Image
                        src="/eisamay.png"
                        alt="Header Banner"
                        fill
                        sizes="(max-width: 640px) 144px, (max-width: 768px) 192px, 240px"
                        className="object-cover"
                    />

                </motion.div>

                <motion.p className="mt-4 text-center text-sm font-semibold text-gray-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}>
                    {title}
                </motion.p>
            </div>
        </header>

    );
};

export default Headersection;