"use client";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
    FaPlay,
    FaPause,
    FaStepBackward,
    FaStepForward,
    FaRedo,
    FaAngleDoubleRight,
    FaAngleDoubleLeft,
    FaShareAlt,
    FaTimes
} from "react-icons/fa";
import { PiCaretDoubleRightFill } from "react-icons/pi";
import InterstitialAd from "./ads/InterstitialAd";
import BannerAd from "./ads/BannerAd";
import { useTheme } from "next-themes";
import { getMobileMenuStyles } from "@/app/mobileMenuStyles";

const NewsPlaylist = ({ id, language, description, title, audioUrl, thumbnail, duration: apiDuration }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1);
    // const [showNextPopup, setShowNextPopup] = useState(false);
    const [hasEnded, setHasEnded] = useState(false);
    const [nextPopupDismissed, setNextPopupDismissed] = useState(false);
    // const [showInterstitial, setShowInterstitial] = useState(false);
    // const [pendingNextId, setPendingNextId] = useState(null);

    const parseISODuration = (iso) => {
        if (!iso) return 0;

        const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

        const hours = parseInt(match?.[1] || 0);
        const minutes = parseInt(match?.[2] || 0);
        const seconds = parseInt(match?.[3] || 0);

        return hours * 3600 + minutes * 60 + seconds;
    };
    // const nextNews = {
    //     title: "Next Breaking News",
    //     language: "English",
    //     audioSrc: "/next-audio.mp3",
    // };

    const audioRef = useRef(null);

    const router = useRouter();

    // Convert id prop to number
    const currentId = Number(id);

    // const handlePrev = async () => {
    //     const prevId = currentId - 1;
    //     const exists = await checkAudioExists(prevId);
    //     if (exists) {
    //         router.push(`/audio/${prevId}`);
    //     } else {
    //         router.push("/404");
    //     }
    // };

    // const handleNext = async () => {
    //     const nextId = currentId + 1;
    //     const exists = await checkAudioExists(nextId);
    //     if (exists) {
    //         router.push(`/audio/${nextId}`);
    //     } else {
    //         router.push("/404");
    //     }
    // };

    const checkAudioExists = async (id) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_TWO}/api/v1/tts/get/${id}`);
            if (!res.ok) return false;
            const data = await res.json();
            return data?.data?.length > 0;
        } catch {
            return false;
        }
    };

    const handlePlayPause = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            if (hasEnded) {
                // setShowNextPopup(false);
                setHasEnded(false);
                setNextPopupDismissed(false);
            }
            audio.play();
            setIsPlaying(true);
        }
    };

    const handleTimeUpdate = () => {
        const audio = audioRef.current;
        if (!audio) return;

        setCurrentTime(audio.currentTime);

        if (
            duration - audio.currentTime <= 3 &&
            duration > 0 &&
            !hasEnded &&
            !nextPopupDismissed
        ) {
            // setShowNextPopup(true);
        }
    };

    useEffect(() => {
        if (apiDuration) {
            setDuration(parseISODuration(apiDuration));
        }
    }, [apiDuration]);

    // useEffect(() => {
    //     if (audioUrl === null || audioUrl === undefined || audioUrl === "") {
    //         alert("There is a problem. Stay tuned with us.");
    //     }
    // }, [audioUrl]);

    const handleSeek = (e) => {
        const audio = audioRef.current;
        const value = e.target.value;
        audio.currentTime = value;
        setCurrentTime(value);
    };

    const handleRedo = () => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.currentTime = 0;
        setCurrentTime(0);
        // setShowNextPopup(false);
        setNextPopupDismissed(false);
        audio.play();
        setIsPlaying(true);
    };

    const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
        setHasEnded(true);
        setNextPopupDismissed(false);
        // setShowInterstitial(true);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    };

    const handleShare = async () => {
    if (!audioUrl) return;

    const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/listen/audio/${id}`;
    try {
        if (navigator.share) {
            await navigator.share({
                title: title || "News Audio",
                text: "Listen to this breaking news audio",
                url: shareUrl,
            });
        } else {
            // fallback: copy to clipboard
            await navigator.clipboard.writeText(shareUrl);
            alert("Link copied to clipboard!");
        }
    } catch (error) {
        console.error("Error sharing:", error);
    }
};

    const handleSpeedDecrease = () => {
        const audio = audioRef.current;
        if (!audio) return;

        const newRate = Math.max(0.5, playbackRate - 0.25);
        setPlaybackRate(newRate);
        audio.playbackRate = newRate;
    };

    const handleSpeedIncrease = () => {
        const audio = audioRef.current;
        if (!audio) return;

        const newRate = Math.min(3, playbackRate + 0.25);
        setPlaybackRate(newRate);
        audio.playbackRate = newRate;
    };

    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    const darkMode = theme === "dark";
    const mobileMenuStyles = getMobileMenuStyles(darkMode);


    return (
        <div className="relative max-w-sm mx-auto">
            <div className={`${mobileMenuStyles.Playlistbg} rounded-xl p-3 sm:p-4 -mt-2 overflow-hidden`}>

                {audioUrl && (
                    <audio
                        ref={audioRef}
                        src={`${process.env.NEXT_PUBLIC_DOMAIN}/s2/audio/${audioUrl}`}
                        onTimeUpdate={handleTimeUpdate}
                        onEnded={handleEnded}
                        onLoadedMetadata={(e) => {
                            setDuration(Math.floor(e.target.duration));
                        }}
                    />
                )}

                <motion.div
                    className="relative w-full h-36 sm:h-44 md:h-52 rounded-lg overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {thumbnail && (
                        <img
                            src={`${process.env.NEXT_PUBLIC_DOMAIN}/s2/images/${thumbnail}`}
                            alt={title || "News audio thumbnail"}
                            className="object-cover w-full h-full border rounded-lg border-black"
                        />
                    )}
                    {
                        !thumbnail && (
                            <img
                                src="/listen/eisamayone.jpg"
                                alt={title || "News audio thumbnail"}
                                className="object-cover w-full h-full border rounded-lg border-black"
                            />
                        )
                    }
                </motion.div>

                <motion.div
                    className="mt-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-base sm:text-base font-bold leading-snug">
                        {title}
                    </h2>
                    {/* <p className="text-[11px] text-gray-600">
                        Language: {language}
                    </p> */}

                    <div className="flex items-center justify-between mt-1 mb-1">
                        <p className={`text-[11px] ${mobileMenuStyles.Playlisticons}`}>
                            {/* Reporter: XYZ */}
                            Language: {language}
                        </p>
                        <div className={`flex gap-3 ${mobileMenuStyles.Playlisticons}`}>
                            <abbr title="Share">
                                <FaShareAlt onClick={handleShare} className="cursor-pointer hover:text-blue-600 hover:scale-110 transition" />
                            </abbr>
                            <abbr title="Replay">
                                <FaRedo onClick={handleRedo} className="cursor-pointer hover:text-blue-600 hover:scale-110 hover:rotate-180 transition" />
                            </abbr>
                        </div>
                    </div>
                </motion.div>

                {/* <BannerAd slot="mid" className="my-4 mx-auto" /> */}

                {/* <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <input
                        type="range"
                        min={0}
                        max={duration || 0}
                        value={currentTime}
                        step={1}
                        onChange={handleSeek}
                        className="w-full h-1 accent-blue-600"
                        disabled={!audioUrl}
                    />
                    <div className="flex justify-between text-[11px] text-black mt-0.5">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </motion.div> */}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="relative w-full h-1.5 bg-gray-200 rounded">

                        <motion.div
                            className="absolute top-0 left-0 h-1.5 bg-blue-600 rounded"
                            initial={{ width: 0 }}
                            animate={{
                                width: duration
                                    ? `${(currentTime / duration) * 100}%`
                                    : "0%",
                            }}
                            transition={{ ease: "linear" }}
                        />

                        <input
                            type="range"
                            min={0}
                            max={duration || 0}
                            value={currentTime}
                            step={1}
                            onChange={handleSeek}
                            disabled={!audioUrl}
                            className="absolute top-0 left-0 w-full h-1.5 opacity-0 cursor-pointer"
                        />
                    </div>

                    <div className="flex justify-between text-[11px] mt-1">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </motion.div>

                <motion.div
                    className="flex justify-center items-center text-xs -mt-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Speed: {playbackRate.toFixed(2)}x
                </motion.div>

                <motion.div
                    className="flex items-center justify-center gap-4 sm:gap-6 mt-4 -mb-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* <abbr title="Previous">
                        <FaStepBackward size={18} className="cursor-pointer hover:scale-110 transition sm:size-[22]" onClick={handlePrev} />
                    </abbr> */}

                    <abbr title="Decrease Speed">
                        <FaAngleDoubleLeft size={26} className="cursor-pointer hover:scale-110 transition sm:size-[32]" onClick={handleSpeedDecrease} />
                    </abbr>

                    <abbr title={isPlaying ? "Pause" : "Play"}>
                        <button
                            onClick={handlePlayPause}
                            disabled={!audioUrl}
                            className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl hover:shadow-blue-400/50 transition-all active:scale-95"
                        >
                            {isPlaying ? <FaPause /> : <FaPlay />}
                        </button>
                    </abbr>

                    <abbr title="Increase Speed">
                        <FaAngleDoubleRight size={26} className="cursor-pointer hover:scale-110 transition sm:size-[32]" onClick={handleSpeedIncrease} />
                    </abbr>

                    {/* <abbr title="Next">
                        <FaStepForward size={18} className="cursor-pointer hover:scale-110 transition sm:size-[22]" onClick={handleNext} />
                    </abbr> */}
                </motion.div>

                {/* {showNextPopup && (
                    <motion.div
                        className="absolute inset-0 z-50 flex items-end sm:items-center justify-center pb-4 sm:pb-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="relative bg-white rounded-lg p-4 w-[90%] sm:w-[85%] shadow-xl flex items-center justify-between">
                            <button
                                onClick={() => {
                                    setShowNextPopup(false);
                                    setNextPopupDismissed(true);
                                }}
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 transition"
                            >
                                <FaTimes size={14} />
                            </button>

                            <div>
                                <p className="text-sm font-semibold mb-0.5">
                                    Listen Next
                                </p>
                                <p className="text-xs mb-0.5">{nextNews.title}</p>
                                <p className="text-xs text-gray-500 mb-4">
                                    Language: {nextNews.language}
                                </p>
                            </div>

                            <div>
                                <button
                                    className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white mr-5 shadow-xl transition-transform active:scale-95"
                                >
                                    <PiCaretDoubleRightFill size={25} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )} */}

                {/* {showInterstitial && (
                    <InterstitialAd
                        onClose={async () => {
                            setShowInterstitial(false);

                            if (pendingNextId) {
                                const exists = await checkAudioExists(pendingNextId);
                                if (exists) {
                                    router.push(`/audio/${pendingNextId}`);
                                } else {
                                    router.push("/404");
                                }
                            }
                        }}
                    />
                )} */}
            </div>
        </div>
    );
};

export default NewsPlaylist;

