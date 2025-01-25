import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSubscribeType } from "../services/api";
import Header from "../components/Header";

function SubscribePage() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [subscribeTypes, setSubscribeTypes] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [subcribeId, setSubcribeId] = useState("");

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSelectPrice = (price, subscribe_id) => {
        setSelectedPrice(price);
        setSubcribeId(subscribe_id);
    };

    const handleSubscribeClick = (subscribe_id) => {
        // console.log("Subscribe ID:", subscribe_id);
        console.log("Subscribed with ID:", subscribe_id);

    };

    const handleCancelClick = () => {
        navigate(-1);
    };

    const token = localStorage.getItem("access_token");

    const fetchData = async () => {
        try {
            const response = await getSubscribeType(token);
            const data = response.data.map((item) => ({
                id: item.id,
                price: item.price,
                duration: item.duration,
            }));
            setSubscribeTypes(data);
        } catch (err) {
            console.error("Error fetching subscription data:", err);
            setSubscribeTypes([]);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Memantau perubahan subscribeTypes
    useEffect(() => {
        if (subscribeTypes) {
            console.log("Updated Subscribe Types:", subscribeTypes);
        }
    }, [subscribeTypes]);

    

    return (
        <div className="min-h-screen w-full px-4">
            <div className="z-10 w-full px-10">
                <Header
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSearchChange={handleSearchChange}
                    className="sticky top-0 z-10 bg-white p-10"
                />
            </div>

            <div className="mx-auto w-full max-w-6xl rounded-lg bg-white p-6">
                <h3 className="mb-6 text-center text-2xl font-bold text-gray-800">
                    Choose Your Subscription Plan
                </h3>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
                    {subscribeTypes && subscribeTypes.length > 0 ? (
                        subscribeTypes.map((item) => (
                            <div
                                key={item.id}
                                className={`relative transform cursor-pointer overflow-hidden rounded-lg transition-all duration-200 ease-in-out hover:scale-105 ${
                                    selectedPrice === item.price
                                        ? "border-4 border-blue-500"
                                        : "border-2 border-gray-300"
                                } h-[600px]`}
                                onClick={() => handleSelectPrice(item.price, item.id)}
                            >
                                <div className="absolute bottom-0 left-0 flex h-96 w-full flex-col items-center justify-center bg-gradient-to-t from-gray-900 via-gray-600 px-6 py-6 text-white">
                                    <h4 className="text-xl font-bold">
                                        Plan {item.duration} months
                                    </h4>
                                    <p className="mb-4 text-sm">
                                        Subscription for {item.duration} months
                                        with all features.
                                    </p>
                                    <ul className="space-y-1 text-xs">
                                        <li className="flex items-center">
                                            <span className="text-green-400">
                                                ✔
                                            </span>
                                            Full Access
                                        </li>
                                        <li>
                                            <span className="text-green-400">
                                                ✔
                                            </span>
                                            Unlimited Access
                                        </li>
                                        <li>
                                            <span className="text-green-400">
                                                ✔
                                            </span>
                                            HD Quality
                                        </li>
                                    </ul>
                                    <p className="absolute bottom-5 text-lg font-semibold">
                                        {item.duration} Months
                                    </p>
                                </div>
                                <div className="m-1 my-2 rounded-lg bg-gradient-to-tr from-blue-400 via-blue-600 to-purple-500 px-4 py-8 text-center text-lg font-semibold text-white">
                                    Rp {item.price.toLocaleString()}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-600">
                            Loading...
                        </div>
                    )}
                </div>
            </div>

            <div className="actions mt-8 flex flex-row-reverse justify-center gap-4">
                <button
                    onClick={handleSubscribeClick(subcribeId)}
                    className="w-full rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 md:w-auto"
                >
                    Subscribe
                </button>
                <button
                    onClick={handleCancelClick}
                    className="w-full rounded-lg bg-gray-400 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-gray-500 focus:ring-2 focus:ring-gray-400 md:w-auto"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default SubscribePage;
