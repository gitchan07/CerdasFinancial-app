import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCourseData, getSubscriptionStatus, subscribeToCourse } from "../services/api"; // Import the updated getCurrentUser
import RenderVideoCourse from "../components/RenderVideoCourse";
import SubscribePopup from "../components/PopupSubcriber";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleRight,
    faAngleLeft,
    faMobileAlt,
    faCertificate,
    faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";

function Course() {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [courseData, setCourseData] = useState(null);
    const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
    const [isSubscribed, setIsSubscribed] = useState(false); // Track subscription status
    const [step, setStep] = useState(1);
    const [courseId] = useState(useParams().courseId);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [showSubscribePopup, setShowSubscribePopup] = useState(false);

    // Fetch course and user data
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("access_token");
            if (!token) {
                console.error("No token found");
                return;
            }

            try {
                // Fetch course data
                const courseData = await fetchCourseData(courseId, token);
                setCourseData(courseData);

                // Fetch current user data to check subscription status
                const isSubscribed = await getSubscriptionStatus(token); // Get subscription status
                setIsSubscribed(isSubscribed); // Set the subscription status in state
            } catch (error) {
                console.error("Error fetching course or user data:", error);
            }
        };

        fetchData();
    }, [courseId]);

    const nextStep = () => {
        setStep((prevStep) => (prevStep === 2 ? 1 : prevStep + 1));
    };

    const prevStep = () => {
        setStep((prevStep) => (prevStep === 1 ? 2 : prevStep - 1));
    };

    const handleVideoSelect = (index) => {
        if (index >= 2 && !isSubscribed) {
            setShowSubscribePopup(true);
            return;
        }

        setIsVideoPlaying(false);
        setSelectedVideoIndex(index);
    };

    const handleSubscribeClick = async () => {
        if (!selectedPrice) {
            alert("Please select a subscription plan.");
            return;
        }

        // Retrieve token from localStorage
        const token = localStorage.getItem("access_token");

        // Check if the token exists
        if (!token) {
            alert("You must be logged in to subscribe.");
            return;
        }

        try {
            // Call the subscribeToCourse function to subscribe the user
            const response = await subscribeToCourse(selectedPrice, token);
            if (response.status === 201) {
                setIsSubscribed(true); // Set the user as subscribed
                setShowSubscribePopup(false);
                alert("Subscription successful!");
            }
        } catch (error) {
            console.error("Error during subscription:", error);
            if (error.response && error.response.status === 401) {
                alert("Your session has expired. Please log in again.");
                // Optionally, redirect the user to the login page
                window.location.href = "/login";
            } else {
                alert("Subscription failed. Please try again.");
            }
        }
    };

    const renderIcon = (key) => {
        switch (key) {
            case "play":
                return (
                    <FontAwesomeIcon icon={faPlayCircle} className="text-xl text-blue-500" />
                );
            case "mobile":
                return (
                    <FontAwesomeIcon icon={faMobileAlt} className="text-xl text-green-500" />
                );
            case "certificate":
                return (
                    <FontAwesomeIcon icon={faCertificate} className="text-xl text-yellow-500" />
                );
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
                            <FontAwesomeIcon icon={faAngleLeft} className="cursor-pointer text-5xl text-blue-600" onClick={prevStep} />
                        </div>
                    )}

                    {step === 2 && (
                        <div className="mt-4 flex items-center justify-between px-4">
                            <FontAwesomeIcon icon={faAngleLeft} className="cursor-pointer text-5xl text-blue-600" onClick={prevStep} />
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
                                        <div key={index} className="carousel-item w-46 mx-2 flex-none rounded-lg bg-gray-100 p-4">
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
                            <FontAwesomeIcon icon={faAngleRight} className="cursor-pointer text-5xl text-blue-600" onClick={nextStep} />
                        </div>
                    )}

                    {step === 2 && (
                        <div className="mt-4 flex items-center justify-between px-4">
                            <FontAwesomeIcon icon={faAngleRight} className="cursor-pointer text-5xl text-blue-600" onClick={nextStep} />
                        </div>
                    )}
                </div>

                {/* Video List */}
                <div className="w-full bg-white p-4 lg:block lg:w-1/2">
                    <div className="space-y-2">
                        {courseData?.contents?.map((video, index) => (
                            <ul
                                key={index}
                                className={`rounded-lg border-2 p-2 ${index === selectedVideoIndex ? "border-blue-600 bg-blue-400 text-white" : "border-blue-300 bg-blue-100 text-black"}`}
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