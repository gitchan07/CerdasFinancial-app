import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSubscribeType } from "../services/api";
import Header from "../components/Header";

function SubscribePage() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [subscribeTypes, setSubscribeTypes] = useState([]); // Inisialisasi dengan array kosong
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [selectedDuration, setSelectedDuration] = useState(null);
    const [error, setError] = useState(null);

    // Handle perubahan input pencarian
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Handle pemilihan harga dan durasi
    const handleSelectPrice = (price, duration) => {
        setSelectedPrice(price);
        setSelectedDuration(duration);
    };

    // Handle klik subscribe
    const handleSubscribeClick = () => {
        if (selectedPrice && selectedDuration) {
            // Logika untuk melanjutkan subscribe atau tindakan lain
            console.log(
                `Subscribed to plan with price ${selectedPrice} and duration ${selectedDuration} months.`
            );
        }
    };

    // Handle klik cancel
    const handleCancelClick = () => {
        navigate(-1); // Kembali ke halaman sebelumnya
    };

    // Ambil data subscribe type ketika komponen dimuat
    useEffect(() => {
        const token = localStorage.getItem("access_token"); // Gantilah dengan token yang sesuai
        const fetchData = async () => {
            try {
                const response = await getSubscribeType(token);
                // Pastikan response.data ada dan merupakan array
                setSubscribeTypes(Array.isArray(response.data) ? response.data : []);
            } catch (err) {
                setError("Error fetching subscription data.");
                setSubscribeTypes([]); // Set empty array jika error
            }
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen w-full px-4 ">
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
                    {(subscribeTypes && subscribeTypes.length > 0) ? ( // Pengecekan tambahan
                        subscribeTypes.map((item) => (
                            <div
                                key={item.id}
                                className={`relative transform cursor-pointer overflow-hidden rounded-lg transition-all duration-200 ease-in-out hover:scale-105 ${
                                    selectedPrice === item.price
                                        ? "border-4 border-blue-500"
                                        : "border-2 border-gray-300"
                                } h-[600px]`} // Memperpanjang tinggi card
                                onClick={() =>
                                    handleSelectPrice(item.price, item.duration)
                                }
                            >
                                <div className="absolute bottom-0 left-0 flex w-full h-96 flex-col items-center justify-center bg-gradient-to-t from-gray-900 via-gray-600 px-6 py-6 text-white">
                                    <h4 className="text-xl font-bold">
                                        Plan {item.duration} months
                                    </h4>
                                    <p className="mb-4 text-sm">
                                        Subscription for {item.duration} months with all features.
                                    </p>
                                    <ul className="space-y-1 text-xs">
                                        {/* Assuming the perks are passed */}
                                        {item.perks?.map((perk, idx) => (
                                            <li key={idx} className="flex items-center">
                                                <span className="text-green-400">✔</span>{" "}
                                                {perk}
                                            </li>
                                        ))}
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
                        <div className="text-center text-gray-600">Loading...</div>
                    )}
                </div>
            </div>

            <div className="actions mt-8 flex justify-center gap-4 flex-row-reverse">
                <button
                    onClick={handleSubscribeClick}
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
