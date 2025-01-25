import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    fetchCourseData,
    getSubscriptionStatus,
    getCurrentUser,
} from "../services/api"; 
import RenderVideoCourse from "../components/RenderVideoCourse";
import SubscribePopup from "../components/PopupSubcriber";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleRight,
    faAngleLeft,
    faMobileAlt,
    faCertificate,
    faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";

function Course() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [courseData, setCourseData] = useState(null);
    const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [step, setStep] = useState(1);
    const [courseId] = useState(useParams().courseId);
    const [showSubscribePopup, setShowSubscribePopup] = useState(false);
    const [userId, setUserId] = useState(null);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("access_token");
            if (!token) {
                console.error("No token found");
                return;
            }

            try {
                const courseData = await fetchCourseData(courseId, token);
                setCourseData(courseData);

                console.log("Course Data:", courseData);
                
                const isSubscribed = await getSubscriptionStatus(token);
                setIsSubscribed(isSubscribed);
            } catch (error) {
                console.error("Error fetching course or user data:", error);
            }
        };

        fetchData();
    }, [courseId]);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("access_token");
            console.log("Token:", token); 

            if (!token) {
                console.error("No token found");
                return;
            }

            try {
                const response = await getCurrentUser(token);
                if (response && response.data && response.data.users && response.data.users.id) {
                    setUserId(response.data.users.id);
                    console.log("User ID:", response.data.users.id);
                } else {
                    console.error("User ID not found in response:", response);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

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
            {/* Header with sticky positioning */}
            <div className="z-10 w-full px-10">
                <Header
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSearchChange={handleSearchChange}
                    className="sticky top-0 z-10 bg-white p-10"
                />
            </div>

            {/* Main content with margin to account for sticky header */}
            <div className="flex w-full flex-col items-center justify-center">
                {courseData && (
                    <RenderVideoCourse
                        videoUrl={courseData?.contents?.[selectedVideoIndex]?.video_url}
                        isVideoPlaying={isVideoPlaying}
                        setIsVideoPlaying={setIsVideoPlaying}
                        currentTime={currentTime}
                        setCurrentTime={setCurrentTime}
                        selectedVideoIndex={selectedVideoIndex}
                        courseId={courseId} // Pass courseId here
                        userId={userId} // Pass userId here
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
                                        <h2 className="mb-4 text-left text-3xl font-bold">
                                            {courseData.name}
                                        </h2>
                                        <p>
                                            {courseData.contents?.description}
                                        </p>
                                        <p>
                                            {
                                                courseData?.contents?.[selectedVideoIndex]
                                                    ?.description
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
                                <div className="carousel-container flex overflow-x-auto">
                                    {courseData?.detail ? (
                                        Object.entries(
                                            JSON.parse(courseData.detail)
                                        ).map(([key, value], index) => (
                                            <div
                                                key={index}
                                                className="carousel-item w-46 mx-2 flex-none rounded-lg bg-gray-100 p-4"
                                            >
                                                {renderIcon(key)}
                                                <h4 className="font-bold">
                                                    {key}
                                                </h4>
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
                                    className={`rounded-lg border-2 p-2 ${index === selectedVideoIndex ? "border-blue-600 bg-blue-400 text-white" : "border-blue-300 bg-blue-100 text-black"}`}
                                    onClick={() => handleVideoSelect(index)}
                                    style={{
                                        cursor: index >= 2 && !isSubscribed
                                            ? "not-allowed"
                                            : "pointer",
                                        opacity: index >= 2 && !isSubscribed
                                            ? 0.5
                                            : 1,
                                    }}
                                >
                                    <li>{video.name}</li>
                                </ul>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Show Subscribe Popup */}
            <SubscribePopup
                show={showSubscribePopup}
                setShowSubscribePopup={setShowSubscribePopup}
            />
        </div>
    );
}

export default Course;
