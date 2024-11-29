import React, { useState, useEffect } from "react";

function DetailCourse() {
    const [course, setCourse] = useState(null);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetch("/data/detailCourse.json")
            .then((response) => response.json())
            .then((data) => {
                setCourse(data.course);
                setVideos(data.videos);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    if (!course || videos.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="mx-auto max-w-full">
            {/* Banner and Title */}
            <div className="flex bg-[#aeb6b9]">
                <img
                    src={course.banner}
                    alt="Course Banner"
                    className="h-[500px] w-1/2 rounded-lg"
                />
                <div className="align-center static flex flex-col items-center justify-center px-40 text-center">
                    <div className="">
                        <h1 className="text-5xl font-bold">{course.title}</h1>
                        <p className="mt-4 text-xl">{course.description}</p>
                    </div>

                    {/* Preview Video */}
                    <div className="absolute top-[370px] w-[330px] rounded-lg bg-white p-4 shadow-md items-center align-center justify-center">
                        <h3 className="text-xl font-semibold">
                            Video Preview
                        </h3>

                        <div className="relative mt-3 items-center">
                            <iframe
                                src={
                                    "/asset/videoplayback.mp4" ||
                                    course.video_preview
                                }
                                style={{ width: "300px", height: "180px" }}
                                allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Course preview video"
                            />
                        </div>

                        <p className="mt-2 text-sm text-gray-600">
                            Pelajari cara agar dapat menabung sejak dini
                        </p>


                        <div className="mt-2 flex items-center justify-center">
                            <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                            <span className="text-sm text-gray-600">
                                (25 reviews)
                            </span>
                        </div>

                    </div>
                </div>
            </div>

            {/* Video List Section */}
        </div>
    );
}

export default DetailCourse;
