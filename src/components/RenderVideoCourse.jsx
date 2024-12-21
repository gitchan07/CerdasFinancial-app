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
}) => {
    const videoRef = useRef(null);
    const [duration, setDuration] = useState(0); // Adding state for duration

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

    useEffect(() => {
        const videoElement = videoRef.current;
        const interval = setInterval(updateTime, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.pause();
            setIsVideoPlaying(false); 
            setCurrentTime(0); 
        }
    }, [selectedVideoIndex]);

    useEffect(() => {
        if (videoRef.current && videoUrl) {
            videoRef.current.currentTime = 0; 
            if (isVideoPlaying) {
                videoRef.current.play(); 
            }
        }
    }, [videoUrl, isVideoPlaying]); 

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
