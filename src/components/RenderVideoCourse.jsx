import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause } from "@fortawesome/free-solid-svg-icons";

const RenderVideoCourse = ({
    videoUrl,
    isVideoPlaying,
    setIsVideoPlaying,
    currentTime,
    setCurrentTime,
    selectedVideoIndex,
    courseId,
    userId,
}) => {
    const videoRef = useRef(null);
    const [duration, setDuration] = useState(1);

    console.log(userId);

    // Generate unique keys for each video based on courseId, selectedVideoIndex, and userId
    const getLocalStorageKey = (keyType) => {
        return `user-${userId}-course-${courseId}-video-${selectedVideoIndex}-${keyType}`;
    };

    // Save currentTime and isVideoPlaying status to localStorage
    const saveToLocalStorage = () => {
        if (videoRef.current) {
            localStorage.setItem(getLocalStorageKey("currentTime"), videoRef.current.currentTime);
            localStorage.setItem(getLocalStorageKey("isPlaying"), isVideoPlaying.toString());
        }
    };

    // Load saved currentTime and isVideoPlaying from localStorage
    const loadFromLocalStorage = () => {
        const savedCurrentTime = localStorage.getItem(getLocalStorageKey("currentTime"));
        const savedIsPlaying = localStorage.getItem(getLocalStorageKey("isPlaying"));

        if (savedCurrentTime !== null) {
            const parsedTime = parseFloat(savedCurrentTime);
            if (!isNaN(parsedTime)) {
                setCurrentTime(parsedTime);  // Update state with the saved time
            } else {
                setCurrentTime(0); // Reset to 0 if saved time is invalid
            }
        } else {
            setCurrentTime(0); // No saved time, reset to 0
        }

        if (savedIsPlaying !== null) {
            setIsVideoPlaying(savedIsPlaying === "true");
        }
    };

    const startPauseVideo = () => {
        if (isVideoPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsVideoPlaying(!isVideoPlaying);
    };

    const updateTime = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
            if (videoRef.current.duration && duration !== videoRef.current.duration) {
                setDuration(videoRef.current.duration);
            }
        }
    };

    // Load data from localStorage whenever selectedVideoIndex, courseId, or userId changes
    useEffect(() => {
        if (selectedVideoIndex !== null && selectedVideoIndex !== undefined) {
            loadFromLocalStorage();
        }
    }, [selectedVideoIndex, courseId, userId]);

    // Set video properties and currentTime whenever videoUrl, isVideoPlaying, or currentTime changes
    useEffect(() => {
        if (videoRef.current && videoUrl) {
            videoRef.current.currentTime = currentTime;

            // Ensure video plays or pauses based on state
            if (isVideoPlaying) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    }, [videoUrl, isVideoPlaying, currentTime]); // Depend on videoUrl, isVideoPlaying, and currentTime

    // Save to localStorage whenever currentTime or isVideoPlaying changes
    useEffect(() => {
        saveToLocalStorage();
    }, [currentTime, isVideoPlaying]);

    // Save to localStorage every 1 second to avoid losing progress
    useEffect(() => {
        const interval = setInterval(saveToLocalStorage, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [currentTime, isVideoPlaying]);

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div
            className="group relative flex h-[550px] w-10/12 justify-end overflow-hidden rounded-2xl bg-black"
            onClick={startPauseVideo}
        >
            <div
                className={`absolute left-0 top-0 h-full w-full ${!isVideoPlaying ? "bg-opacity-1 bg-black" : "opacity-100"}`}
            >
                <video
                    ref={videoRef}
                    src={videoUrl}
                    alt="Video"
                    className="rounded-lg object-cover"
                    style={{
                        opacity: !isVideoPlaying ? 0.5 : 1,
                        width: "100%",
                        height: "100%",
                        objectFit: "fill",
                    }}
                    onTimeUpdate={updateTime}
                />
            </div>

            {/* Play/Pause icon */}
            {!isVideoPlaying && (
                <img
                    src="/asset/playall.png"
                    alt="Klik untuk memutar"
                    className="absolute left-1/2 top-1/2 h-auto w-auto -translate-x-1/2 -translate-y-1/2 transform cursor-pointer object-contain"
                />
            )}

            {isVideoPlaying && (
                <div
                    className="pause-icon absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform opacity-0 group-hover:opacity-100"
                    onClick={startPauseVideo}
                >
                    <FontAwesomeIcon
                        icon={faPause}
                        className="text-8xl text-blue-600"
                    />
                </div>
            )}

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 h-2 w-full bg-gray-300">
                <div
                    style={{ width: `${progress}%` }}
                    className="h-full bg-blue-600"
                />
            </div>
        </div>
    );
};

export default RenderVideoCourse;
