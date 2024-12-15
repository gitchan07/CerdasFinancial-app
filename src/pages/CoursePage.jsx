import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPause,
    faAngleRight,
    faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";

function Course() {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [courseData, setCourseData] = useState(null);
    const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);
    const videoRef = useRef(null);
    const [step, setStep] = useState(1);

    const nextStep = () => {
        setStep((prevStep) => (prevStep === 2 ? 1 : prevStep + 1));
    };

    const prevStep = () => {
        setStep((prevStep) => (prevStep === 1 ? 2 : prevStep - 1));
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

    useEffect(() => {
        console.log("Fetching course data...");

        fetch("/data/detailCourse.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Fetched course data:", data);
                setCourseData(data.course);
            })
            .catch((error) => {
                console.error("Error fetching course data:", error);
            });
    }, []);

    const handleVideoSelect = (index) => {
        if (index >= 2 && !isSubscribed) {
            alert("Please subscribe to access this video.");
            return;
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
    }, [selectedVideoIndex]);

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="max-w-screen flex flex-col items-center justify-center">
            <header className="mb-2 flex w-full flex-wrap items-center justify-between px-10 pb-2 pt-4">
                <h1 className="mb-4 text-3xl font-bold md:mb-0">
                    📈 Cerdas Financial
                </h1>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search courses"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-64 rounded-full border border-gray-300 bg-gray-200 p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-96"
                        />
                    </div>
                    <img
                        src="https://via.placeholder.com/40"
                        alt="User Profile"
                        className="h-10 w-10 rounded-full"
                    />
                </div>
            </header>

            <div
                className="group relative flex h-[550px] w-10/12 justify-end overflow-hidden rounded-2xl bg-black"
                onClick={startPauseVideo}
            >
                <div
                    className={`absolute left-0 top-0 h-full w-full ${!isVideoPlaying ? "bg-opacity-1 bg-black" : "opacity-100"}`}
                >
                    <video
                        ref={videoRef}
                        src={courseData?.videos?.[selectedVideoIndex]?.url}
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

                <div className="absolute bottom-0 left-0 h-2 w-full bg-gray-300">
                    <div
                        style={{ width: `${progress}%` }}
                        className="h-full bg-blue-600"
                    />
                </div>
            </div>

            <div className="mt-8 flex w-10/12 flex-col justify-between gap-10 text-justify lg:flex-row">
                <div className="flex w-full lg:w-1/2">
                    {step === 1 && (
                        <div className="lignt-center mt-4 flex items-center justify-center px-4">
                            <FontAwesomeIcon
                                icon={faAngleLeft}
                                className="cursor-pointer text-5xl text-blue-600"
                                onClick={nextStep}
                            />
                        </div>
                    )}

                    {step === 2 && (
                        <div className="mt-4 flex items-center justify-between px-4">
                            <FontAwesomeIcon
                                icon={faAngleLeft}
                                className="cursor-pointer text-5xl text-blue-600"
                                onClick={nextStep}
                            />
                        </div>
                    )}

                    {step === 2 && (
                        <div className="w-full p-4 text-left">
                            <h3 className="mb-4 flex flex-col text-4xl font-bold">
                                Course Includes
                            </h3>
                            <ul className="flex flex-col flex-wrap gap-2">
                                {Array.isArray(courseData?.includes) &&
                                courseData?.includes.length > 0 ? (
                                    courseData.includes.map((item, index) => (
                                        <li key={index}>{item} </li>
                                    ))
                                ) : (
                                    <li>No data available</li>
                                )}
                            </ul>
                        </div>
                    )}

                    {step === 1 && (
                        <div className="p-4 px-8">
                            {courseData && (
                                <>
                                    <h2 className="mb-4 text-center text-4xl font-bold">
                                        {courseData.title}
                                    </h2>
                                    <p>{courseData.description}</p>
                                    <p>
                                        {
                                            courseData?.videos?.[
                                                selectedVideoIndex
                                            ]?.description
                                        }
                                    </p>
                                </>
                            )}
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

                <div className="w-full bg-white p-4 lg:w-1/2">
                    <div className="space-y-2">
                        {courseData?.videos?.map((video, index) => (
                            <ul
                                key={index}
                                className={`rounded-lg border-2 p-2 ${index === selectedVideoIndex ? "border-blue-600 bg-blue-400 text-white" : "border-blue-300 bg-blue-100 text-black"}`}
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
                                <li>{video.title}</li>
                            </ul>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Course;
