// Course.js

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleRight,
    faAngleLeft,
    faMobileAlt,
    faCertificate,
    faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchCourseData, subscribeToCourse } from "../services/api";
import SubscribePopup from "../components/PopupSubcriber";
import RenderVideoCourse from "../components/RenderVideoCourse";

function Course() {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [courseData, setCourseData] = useState(null);
    const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
    const [isSubscribed, setIsSubscribed] = useState(false);
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

    // Fetch Course Data
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

    // Handle Video Select
    const handleVideoSelect = (index) => {
        if (index >= 2 && !isSubscribed) {
            setShowSubscribePopup(true);
            return;
        }

        setIsVideoPlaying(false); // Reset video to paused state

        setSelectedVideoIndex(index); // Update selected video index
    };

    // Handle Subscription
    const handleSubscribeClick = async () => {
        if (!selectedPrice) {
            alert("Please select a subscription plan.");
            return;
        }

        const token = localStorage.getItem("access_token");

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
                return <FontAwesomeIcon icon={faPlayCircle} className="text-xl text-blue-500" />;
            case "mobile":
                return <FontAwesomeIcon icon={faMobileAlt} className="text-xl text-green-500" />;
            case "certificate":
                return <FontAwesomeIcon icon={faCertificate} className="text-xl text-yellow-500" />;
            default:
                return null;
        }
    };

    return (
        <div className="max-w-screen flex flex-col items-center justify-center">
            {/* Video Player */}
            {courseData && (
                <RenderVideoCourse
                    videoUrl={courseData?.contents?.[selectedVideoIndex]?.video_url}
                    isVideoPlaying={isVideoPlaying}
                    setIsVideoPlaying={setIsVideoPlaying}
                    currentTime={currentTime}
                    setCurrentTime={setCurrentTime}
                    duration={duration}
                    selectedVideoIndex={selectedVideoIndex}
                />
            )}

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
                                    <h2 className="mb-4 text-left text-3xl font-bold">{courseData.name}</h2>
                                    <p>{courseData.contents?.description}</p>
                                    <p>{courseData?.contents?.[selectedVideoIndex]?.description}</p>
                                </>
                            )}
                        </div>
                    )}

                    {step === 2 && (
                        <div className="w-full p-4 px-8 text-left">
                            <h3 className="mb-4 flex flex-col text-3xl font-bold">Course Includes</h3>
                            <div className="carousel-container flex overflow-x-auto">
                                {courseData?.detail ? (
                                    Object.entries(JSON.parse(courseData.detail)).map(([key, value], index) => (
                                        <div key={index} className="carousel-item flex-none w-46 p-4 mx-2 bg-gray-100 rounded-lg">
                                            {renderIcon(key)}
                                            <h4 className="font-bold">{key}</h4>
                                            <p>{value}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div>No data available</div>
                                )}
                            </div>
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
                <div className="w-full bg-white p-4 lg:block lg:w-1/2">
                    <div className="space-y-2">
                        {courseData?.contents?.map((video, index) => (
                            <ul
                                key={index}
                                className={`rounded-lg border-2 p-2 ${index === selectedVideoIndex
                                    ? "border-blue-600 bg-blue-400 text-white"
                                    : "border-blue-300 bg-blue-100 text-black"
                                    }`}
                                onClick={() => handleVideoSelect(index)} // Update the selected video index
                                style={{
                                    cursor: index >= 2 && !isSubscribed ? "not-allowed" : "pointer",
                                    opacity: index >= 2 && !isSubscribed ? 0.5 : 1,
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
                selectedPrice={selectedPrice}
            />
        </div>
    );
}

export default Course;
