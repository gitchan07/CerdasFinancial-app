import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPause,
    faAngleRight,
    faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import axios from "axios";

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
    const [courseId] = useState(useParams().courseId);
    const [selectedPrice, setSelectedPrice] = useState(null);

    // State untuk menampilkan pop-up
    const [showSubscribePopup, setShowSubscribePopup] = useState(false);

    // Token hardcoded untuk testing
    useEffect(() => {
        // Jika token belum ada di localStorage, set token manual (untuk testing)
        if (!localStorage.getItem("authToken")) {
            localStorage.setItem(
                "authToken",
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczNDQ5NTE5MywianRpIjoiYzZjM2Y2NGQtMTRkMC00ZmRhLThmNDAtYmRlZDQyNzM2MmQzIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjIyNzMzNWZhLTkzNDctNDkxYS04MmZiLWI2NmQ4M2JiYjcxZiIsIm5iZiI6MTczNDQ5NTE5MywiY3NyZiI6IjQ3MDBmMzY1LWQ0MGYtNGIxYi1hYTQyLWM4NTkzNzEyMzE2ZiIsImV4cCI6MTczNDQ5ODc5MywiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJmdWxsbmFtZSI6IkFkbWluIn0.7gdqdcK-OS-Rh5OIxt2XSGWX4KO8Y6i-GI7_IfIFgfo"
            );
        }
    }, []);

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

    const fetchCourseData = async () => {
        try {
            console.log("Fetching course data...");

            // Ambil token dari localStorage
            const token = localStorage.getItem("authToken");
            if (!token) {
                console.error("No token found");
                return;
            }

            // Fetching course data dengan token di header
            const response = await fetch(
                `https://api-cerdasfinancial.crowintheglass.com/api/v1/course/${courseId}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`, // Menambahkan token ke header
                    },
                }
            );

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Network response was not ok: ${errorMessage}`);
            }

            const data = await response.json();
            console.log("Fetched course data:", data);
            setCourseData(data.data);
        } catch (error) {
            console.error("Error fetching course data:", error);
        }
    };

    useEffect(() => {
        fetchCourseData();
    }, [courseId]);

    const handleVideoSelect = (index) => {
        if (index >= 2 && !isSubscribed) {
            setShowSubscribePopup(true); // Tampilkan pop-up jika belum berlangganan
            return;
        }

        // Hentikan video yang sedang diputar (jika ada) sebelum memilih video baru
        if (videoRef.current) {
            videoRef.current.pause();
        }

        // Atur status video yang dipilih
        setSelectedVideoIndex(index);
        setIsVideoPlaying(false); // Pastikan video tidak langsung dimainkan
        if (videoRef.current) {
            videoRef.current.currentTime = 0; // Reset waktu video
        }
    };

    // Gunakan useEffect untuk memulai pemutaran video saat selectedVideoIndex berubah
    useEffect(() => {
        if (videoRef.current && isVideoPlaying) {
            videoRef.current.play();
        }
    }, [selectedVideoIndex, isVideoPlaying]); // Memulai video saat index berubah dan status pemutaran diatur ke true

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubscribe = async () => {
        if (!selectedPrice) {
            alert("Please select a subscription plan.");
            return;
        }

        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                console.error("No token found");
                return;
            }

            const response = await axios.post(
                "https://api-cerdasfinancial.crowintheglass.com/api/v1/subscribe",
                {
                    price: selectedPrice * 1000, // Convert to the appropriate currency format
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Pass token in header
                    },
                }
            );

            if (response.status === 200) {
                alert("Subscription successful!");
                setShowSubscribePopup(false); // Close the popup
            } else {
                console.error("Failed to subscribe", response);
                alert("Subscription failed!");
            }
        } catch (error) {
            console.error("Error during subscription:", error);
            alert("Error during subscription!");
        }
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
                        src={
                            courseData?.contents?.[selectedVideoIndex]
                                ?.video_url
                        }
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
                        <div className="mt-4 flex items-center justify-between px-4">
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
                        <div className="w-full p-4 px-8 text-left">
                            <h3 className="mb-4 flex flex-col text-4xl font-bold">
                                Course Includes
                            </h3>
                            <ul className="flex flex-col flex-wrap gap-2">
                                {Array.isArray(courseData?.contents) &&
                                courseData?.contents.length > 0 ? (
                                    courseData.contents.map((item, index) => (
                                        <li key={index}>{item.name}</li>
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
                                        {courseData.name}
                                    </h2>
                                    <p>{courseData.description}</p>
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
                        {courseData?.contents?.map((video, index) => (
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
                                <li>{video.name}</li>
                            </ul>
                        ))}
                    </div>
                </div>
            </div>

{/* Pop-up Subscribe */}
{showSubscribePopup && (
  <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
    <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
      <h3 className="mb-6 text-center text-2xl font-bold text-gray-800">
        Subscribe to Access All Content
      </h3>
      <p className="mb-6 text-center text-gray-600">
        Choose your subscription plan:
      </p>

      {/* Subscription Duration Choices in a row layout */}
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-2 mb-6">
        {/* 1 Month */}
        <div
          className="flex cursor-pointer flex-col items-center rounded-lg bg-white p-4 shadow-lg transition-shadow duration-200 hover:bg-blue-50 hover:shadow-2xl"
          onClick={() => setSelectedPrice(150000)} // Rp 150,000
        >
          <p className="text-2xl font-bold text-gray-800">1</p>
          <p className="text-xl font-semibold text-gray-700">Month</p>
          <p className="text-lg text-gray-500">Rp 150,000</p>
        </div>

        {/* 3 Months */}
        <div
          className="flex cursor-pointer flex-col items-center rounded-lg bg-white p-4 shadow-lg transition-shadow duration-200 hover:bg-blue-50 hover:shadow-2xl"
          onClick={() => setSelectedPrice(375000)} // Rp 375,000
        >
          <p className="text-2xl font-bold text-gray-800">3</p>
          <p className="text-xl font-semibold text-gray-700">Months</p>
          <p className="text-lg text-gray-500">Rp 375,000</p>
        </div>

        {/* 6 Months */}
        <div
          className="flex cursor-pointer flex-col items-center rounded-lg bg-white p-4 shadow-lg transition-shadow duration-200 hover:bg-blue-50 hover:shadow-2xl"
          onClick={() => setSelectedPrice(675000)} // Rp 675,000
        >
          <p className="text-2xl font-bold text-gray-800">6</p>
          <p className="text-xl font-semibold text-gray-700">Months</p>
          <p className="text-lg text-gray-500">Rp 675,000</p>
        </div>

        {/* 1 Year */}
        <div
          className="flex cursor-pointer flex-col items-center rounded-lg bg-white p-4 shadow-lg transition-shadow duration-200 hover:bg-blue-50 hover:shadow-2xl"
          onClick={() => setSelectedPrice(1200000)} // Rp 1,200,000
        >
          <p className="text-2xl font-bold text-gray-800">1</p>
          <p className="text-xl font-semibold text-gray-700">Year</p>
          <p className="text-lg text-gray-500">Rp 1,200,000</p>
        </div>
      </div>

      {/* Subscribe Button with full width white background */}
      <div className="mt-6 w-full bg-white p-4 rounded-b-lg">
        <button
          onClick={handleSubscribe}
          className="w-full rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
        >
          Subscribe Now
        </button>
      </div>
    </div>
  </div>
)}

        </div>
    );
}

export default Course;
