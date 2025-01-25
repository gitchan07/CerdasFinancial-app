import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import bannerImage from "../assets/banner5.png";

function UserProfile() {
    const [userData, setUserData] = useState({
        full_name: "",
        is_subscribe: 0,
        subscription_plan: "",
        recentlyView: "",
        photo: null,
    });

    const [error, setError] = useState(null);
    const token = localStorage.getItem("access_token");

    const fetchData = async () => {
        if (!token) {
            console.error("No token found");
            return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        try {
            const response = await fetch(
                "https://api-cerdasfinancial.crowintheglass.com/api/v1/me",
                { headers }
            );
            const usersData = await response.json();

            if (usersData.users) {
                setUserData(usersData.users);
            } else {
                console.error("User data not found");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <Header searchTerm={""} setSearchTerm={() => {}} />
            <div className="flex justify-between">
                <aside className="w-2/5 pr-8 pl-6 flex flex-col items-center mt-10">
                    <div className="flex items-center mb-6">
                        <div className="relative">
                            <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
                                {userData.photo ? (
                                    <img
                                        src={userData.photo}
                                        alt="User Profile"
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                ) : (
                                    <span className="text-4xl font-bold text-white bg-blue-500 w-32 h-32 rounded-full flex items-center justify-center">
                                        {userData.full_name
                                            .split(" ")
                                            .map((name) => name[0])
                                            .join("")
                                            .toUpperCase()}
                                    </span>
                                )}
                            </div>
                            <label
                                htmlFor="upload-photo"
                                className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm8 8a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </label>
                            <input
                                id="upload-photo"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (event) => {
                                            setUserData((prevState) => ({
                                                ...prevState,
                                                photo: event.target.result,
                                            }));
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                        </div>
                        <div className="ml-8">
                            <p className="text-4xl font-bold mb-4">
                                Hello, {userData.full_name}
                            </p>
                        </div>
                    </div>
                    <ul className="space-y-6 text-2xl">
                        <li>
                            Subscription:{" "}
                            <span className="font-bold">
                                {userData.is_subscribe === 1
                                    ? "Active"
                                    : "Not Active"}
                            </span>
                        </li>
                        <li>
                            Plan:{" "}
                            <span className="font-bold">
                                {userData.subscription_plan || "None"}
                            </span>
                        </li>
                        <li>
                            Recently Viewed:{" "}
                            <span className="font-bold">
                                {userData.recentlyView || "No data"}
                            </span>
                        </li>
                    </ul>
                </aside>

                <div className="w-1/2 flex justify-center items-center">
                    <div
                        className="h-[600px] w-[600px] bg-cover bg-center"
                        style={{ backgroundImage: `url(${bannerImage})` }}
                        aria-label="Banner"
                    />
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
