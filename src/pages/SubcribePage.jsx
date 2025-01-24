import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function SubscribePage() {
    const [selectedPrice, setSelectedPrice] = useState(null); 
    const [selectedDuration, setSelectedDuration] = useState(""); 
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSelectPrice = (price, duration) => {
        setSelectedPrice(price);
        setSelectedDuration(duration); 
    };

    const handleSubscribeClick = () => {
        

    };

    const handleCancelClick = () => {
        navigate(-1);
    };

    const durations = [
        {
            price: 150000,
            duration: "1 Month",
            title: "Basic",
            description: "Stream on 1 screen at a time in SD quality.",
            perks: ["Ad-supported content", "Limited access exclusive content"],
        },
        {
            price: 400000,
            duration: "3 Months",
            title: "Standard",
            description: "Stream on 2 screens at the same time in HD quality.",
            imageUrl: "/images/standard-plan.jpg",
            perks: [
                "Ad-free content",
                "Offline downloads",
                "Access to exclusive shows",
            ],
        },
        {
            price: 700000,
            duration: "6 Months",
            title: "Premium",
            description:
                "Stream on 4 screens at the same time in 4K Ultra HD quality.",
            imageUrl: "/images/premium-plan.jpg",
            perks: [
                "Ad-free content",
                "Offline downloads",
                "Access to exclusive shows",
                "Priority customer support",
            ],
        },
    ];

    return (
        <div className="min-h-screen px-4 py-12">
            <div className="z-10 w-full px-10">
                <Header
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSearchChange={handleSearchChange}
                    className="sticky top-0 z-10 bg-white p-10"
                />
            </div>
            <div className="mx-auto w-full max-w-4xl rounded-lg bg-white p-6">
                <h3 className="mb-6 text-center text-2xl font-bold text-gray-800">
                    Choose Your Subscription Plan
                </h3>

                {/* Subscription Duration Choices */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                    {durations.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative transform cursor-pointer overflow-hidden rounded-lg transition-all duration-200 ease-in-out hover:scale-105 ${selectedPrice === plan.price ? "border-4 border-blue-500" : "border-2 border-gray-300"} h-[600px]`}
                            onClick={() =>
                                handleSelectPrice(plan.price, plan.duration)
                            }
                        >
                            {/* Image for each plan */}
                            <div
                                className="absolute bottom-0 left-0 flex w-full flex-col items-center justify-center bg-gradient-to-t from-gray-900 via-gray-600 px-6 py-6 text-white"
                                style={{ height: "400px" }}
                            >
                                <h4 className="text-xl font-bold">
                                    {plan.title}
                                </h4>
                                <p className="mb-4 text-sm">
                                    {plan.description}
                                </p>
                                <ul className="space-y-1 text-xs">
                                    {plan.perks.map((perk, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-center"
                                        >
                                            <span className="text-green-400">
                                                ✔
                                            </span>{" "}
                                            {perk}
                                        </li>
                                    ))}
                                </ul>
                                {/* Display Duration */}
                                <p className="absolute bottom-5 text-lg font-semibold">
                                    {plan.duration}
                                </p>
                            </div>
                            <div className="m-1 my-2 rounded-lg bg-gradient-to-tr from-blue-400 via-blue-600 to-purple-500 px-4 py-8 text-center text-lg font-semibold text-white">
                                Rp {plan.price.toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 flex justify-center gap-6">
                    <button
                        className="rounded-lg bg-gray-300 px-6 py-2 text-lg text-gray-700 hover:bg-gray-400"
                        onClick={handleCancelClick}
                    >
                        Cancel
                    </button>
                    <button
                        className="rounded-lg bg-blue-500 px-6 py-2 text-lg text-white hover:bg-blue-600"
                        onClick={handleSubscribeClick}
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SubscribePage;
