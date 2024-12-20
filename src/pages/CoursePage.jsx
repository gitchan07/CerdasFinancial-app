// Course.js

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPause,
    faAngleRight,
    faAngleLeft,
    faMobileAlt,
    faCertificate,
    faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { fetchCourseData, subscribeToCourse } from "../services/api";
import SubscribePopup from "../components/PopupSubcriber";

function Course() {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [courseData, setCourseData] = useState(null);
    const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const videoRef = useRef(null);
    const [step, setStep] = useState(1);
    const [courseId] = useState(useParams().courseId);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [showSubscribePopup, setShowSubscribePopup] = useState(false);

    const nextStep = () => {
        setStep((prevStep) => {
            if (prevStep === 2) return 1;
            return prevStep + 1;
        });
    };

    const prevStep = () => {
        setStep((prevStep) => {
            if (prevStep === 1) return 2;
            return prevStep - 1;
        });
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
            setDuration(videoRef.current.duration);
        }
    };

    useEffect(() => {
        const videoElement = videoRef.current;
        const interval = setInterval(updateTime, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    // Fetch Content Course
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("access_token");
            if (!token) {
                console.error("No token found");
                return;
            }

            try {
                const data = await fetchCourseData(courseId, token);
                setCourseData(data);
            } catch (error) {
                console.error("Error fetching course data:", error);
            }
        };

        fetchData();
    }, [courseId]);

    // Handle Video For Subscribe
    const handleVideoSelect = (index) => {
        if (index >= 2 && !isSubscribed) {
            setShowSubscribePopup(true);
            return;
        }

        if (videoRef.current) {
            videoRef.current.pause();
        }

        setSelectedVideoIndex(index);
        setIsVideoPlaying(false);
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
        }
    };

    useEffect(() => {
        if (videoRef.current && isVideoPlaying) {
            videoRef.current.play();
        }
    }, [selectedVideoIndex, isVideoPlaying]);

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    // Handle Subscription
    const handleSubscribeClick = async () => {
        if (!selectedPrice) {
            alert("Please select a subscription plan.");
            return;
        }

        const token = localStorage.getItem("access_token");
        console.log("Token:", token);

        try {
            await subscribeToCourse(selectedPrice, token);
            setIsSubscribed(true);
            setShowSubscribePopup(false);
            alert("Subscription successful!");
        } catch (error) {
            console.error("Error during subscription:", error);
            alert("Subscription failed. Please try again.");
        }
    };

    // Render for Icon
    const renderIcon = (key) => {
        switch (key) {
            case "play":
                return (
                    <FontAwesomeIcon
                        icon={faPlayCircle}
                        className="text-xl text-blue-500"
                    />
                );
            case "mobile":
                return (
                    <FontAwesomeIcon
                        icon={faMobileAlt}
                        className="text-xl text-green-500"
                    />
                );
            case "certificate":
                return (
                    <FontAwesomeIcon
                        icon={faCertificate}
                        className="text-xl text-yellow-500"
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-screen flex flex-col items-center justify-center">
            {/* Video Player */}
            <div
                className="group relative flex h-[550px] w-10/12 justify-end overflow-hidden rounded-2xl bg-black"
                onClick={startPauseVideo}
            >
                <div
                    className={`absolute left-0 top-0 h-full w-full ${!isVideoPlaying ? "bg-opacity-1 bg-black" : "opacity-100"}`}
                >
                    <video
                        ref={videoRef}
                        src={courseData?.contents?.[selectedVideoIndex]?.video_url}
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

            {/* Course Details and Video List */}
            <div className="mt-8 flex w-10/12 flex-col justify-between gap-10 text-justify lg:flex-row">
                {/* Course Info */}
                <div className="flex w-full lg:w-1/2">
                    {step === 1 && (
                        <div className="mt-4 flex items-center justify-between px-4">
                            <FontAwesomeIcon
                                icon={faAngleLeft}
                                className="cursor-pointer text-5xl text-blue-600"
                                onClick={prevStep}
                            />
                        </div>
                    )}
                    {step === 2 && (
                        <div className="mt-4 flex items-center justify-between px-4">
                            <FontAwesomeIcon
                                icon={faAngleLeft}
                                className="cursor-pointer text-5xl text-blue-600"
                                onClick={prevStep}
                            />
                        </div>
                    )}

                    {step === 1 && (
                        <div className="p-4 px-8">
                            {courseData && (
                                <>
                                    <h2 className="mb-4 text-left text-3xl font-bold">
                                        {courseData.name}
                                    </h2>
                                    <p>{courseData.contents.description}</p>
                                    <p>
                                        {
                                            courseData?.contents?.[
                                                selectedVideoIndex
                                            ]?.description
                                        }
                                    </p>
                                </>
                            )}
                        </div>
                    )}

                    {step === 2 && (
                        <div className="w-full p-4 px-8 text-left">
                            <h3 className="mb-4 flex flex-col text-3xl font-bold">
                                Course Includes
                            </h3>
                            <ul className="flex flex-col flex-wrap gap-4">
                                {courseData?.detail ? (
                                    Object.entries(
                                        JSON.parse(courseData.detail)
                                    ).map(([key, value], index) => (
                                        <li
                                            key={index}
                                            className="flex items-center gap-2"
                                        >
                                            {renderIcon(key)}{" "}
                                            <strong className="mr-5">
                                                {key}:{" "}
                                            </strong>
                                            {value}
                                        </li>
                                    ))
                                ) : (
                                    <li>No data available</li>
                                )}
                            </ul>
                        </div>
                    )}

                    {step === 1 && (
                        <div className="mt-4 flex items-center justify-between px-4">
                            <FontAwesomeIcon
                                icon={faAngleRight}
                                className="cursor-pointer text-5xl text-blue-600"
                                onClick={nextStep}
                            />
                        </div>
                    )}
                    {step === 2 && (
                        <div className="mt-4 flex items-center justify-between px-4">
                            <FontAwesomeIcon
                                icon={faAngleRight}
                                className="cursor-pointer text-5xl text-blue-600"
                                onClick={nextStep}
                            />
                        </div>
                    )}
                </div>

                {/* Video List */}
                <div className="hidden w-full bg-white p-4 lg:block lg:w-1/2">
                    <div className="space-y-2">
                        {courseData?.contents?.map((video, index) => (
                            <ul
                                key={index}
                                className={`rounded-lg border-2 p-2 ${
                                    index === selectedVideoIndex
                                        ? "border-blue-600 bg-blue-400 text-white"
                                        : "border-blue-300 bg-blue-100 text-black"
                                }`}
                                onClick={() => handleVideoSelect(index)}
                                style={{
                                    cursor:
                                        index >= 2 && !isSubscribed
                                            ? "not-allowed"
                                            : "pointer",
                                    opacity:
                                        index >= 2 && !isSubscribed ? 0.5 : 1,
                                }}
                            >
                                <li>{video.name}</li>
                            </ul>
                        ))}
                    </div>
                </div>
            </div>

            {/* Show Subscribe Popup */}
            <SubscribePopup
                show={showSubscribePopup}
                setShowSubscribePopup={setShowSubscribePopup}
                setSelectedPrice={setSelectedPrice}
                handleSubscribeClick={handleSubscribeClick}
            />
        </div>
    );
}

export default Course;
