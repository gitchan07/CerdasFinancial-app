const SubscribePopup = ({ show, setShowSubscribePopup, setSelectedPrice, handleSubscribeClick, selectedPrice }) => {
    if (!show) return null;

    const handleSelectPrice = (price) => {
        setSelectedPrice(price);
    };

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
                <h3 className="mb-6 text-center text-2xl font-bold text-gray-800">
                    Subscribe to Access All Content
                </h3>
                <p className="mb-6 text-center text-gray-600">
                    Choose your subscription plan:
                </p>

                {/* Subscription Duration Choices */}
                <div className="mb-6 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-3">
                    {[150000, 400000, 700000].map((price, index) => (
                        <div
                            key={index}
                            className={`flex cursor-pointer flex-col items-center rounded-lg p-4 shadow-lg transition-shadow duration-200 
                                ${selectedPrice === price ? 'bg-blue-50 shadow-2xl' : 'bg-white hover:bg-blue-50 hover:shadow-2xl'}`}
                            onClick={() => handleSelectPrice(price)}
                        >
                            <p className="text-2xl font-bold text-gray-800">{price === 150000 ? '1 Month' : price === 400000 ? '3 Months' : '6 Months'}</p>
                            <p className="text-lg text-gray-600">Rp {price.toLocaleString()}</p>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center gap-6">
                    <button
                        className="rounded-lg bg-gray-300 px-6 py-2 text-lg text-gray-700 hover:bg-gray-400"
                        onClick={() => setShowSubscribePopup(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="rounded-lg bg-blue-500 px-6 py-2 text-lg text-white hover:bg-blue-600"
                        onClick={handleSubscribeClick}
                    >
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubscribePopup;
