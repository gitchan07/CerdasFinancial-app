import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause } from "@fortawesome/free-solid-svg-icons";

function Course() {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [courseData, setCourseData] = useState("");
    const [selectedVideoIndex, setSelectedVideoIndex] = useState(0); // Track the selected video index
    const videoRef = useRef(null);

    const startPauseVideo = () => {
        if (isVideoPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsVideoPlaying(!isVideoPlaying);
    };

    const updateTime = () => {
        setCurrentTime(videoRef.current.currentTime);
        setDuration(videoRef.current.duration);
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

    // Function to handle video selection from list
    const handleVideoSelect = (index) => {
        setSelectedVideoIndex(index);
        setIsVideoPlaying(false); // Pause the video when changing
        videoRef.current.load(); // Reload the video with the new source
        videoRef.current.currentTime = 0; // Reset the video to start from the beginning
    };

    useEffect(() => {
        if (videoRef.current && isVideoPlaying) {
            videoRef.current.play(); // Auto-play video after it is selected
        }
    }, [selectedVideoIndex]);

    return (
        <div className="max-w-screen flex flex-col items-center justify-center">
            <div
                className="group relative flex h-[500px] w-10/12 justify-end overflow-hidden rounded-2xl bg-black"
                onClick={startPauseVideo}
            >
                <div
                    className={`absolute left-0 top-0 h-full w-full ${!isVideoPlaying ? "bg-opacity-1 bg-black" : "opacity-100"}`}
                >
                    <video
                        ref={videoRef}
                        src={courseData?.videos?.[selectedVideoIndex]?.url} // Use selected video URL
                        alt="Video"
                        className="rounded-lg object-cover"
                        style={{
                            opacity: !isVideoPlaying ? 0.5 : 1,
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
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
            </div>

            <div className="mt-8 flex w-10/12 flex-row-reverse justify-between gap-10">
                <div className="card w-1/2 bg-white p-4">
                    <div className="space-y-2"> {/* This adds gap between each list item */}
                        {courseData?.videos?.map((video, index) => (
                            <ul
                                key={index}
                                className={`ml-20 rounded-lg border p-2 ${index === selectedVideoIndex ? "bg-blue-500 text-white" : "bg-blue-100 text-black"}`}
                                onClick={() => handleVideoSelect(index)} // Update video when clicked
                            >
                                <li>{video.title}</li>
                            </ul>
                        ))}
                    </div>
                </div>

                <div className="card w-1/2 bg-white p-4">
                    {courseData && (
                        <>
                            <h2 className="mb-4 text-4xl font-bold">
                                {courseData.title}
                            </h2>
                            <p>{courseData.description}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Course;
