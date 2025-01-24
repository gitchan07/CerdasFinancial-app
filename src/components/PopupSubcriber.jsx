import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGlobe,
} from "@fortawesome/free-solid-svg-icons";

const SubscribePopup = ({ show, setShowSubscribePopup }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (show) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [show]);

  const closePopup = () => {
    setShowSubscribePopup(false);
  };

  const goToSubscribe = () => {
    setShowSubscribePopup(false);
    navigate("/subscribe");
  };

  return (
    <>
      {show && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96 max-w-md transform transition-all duration-300 ease-out scale-110 opacity-100 hover:scale-105 hover:shadow-2xl">
            <div className="flex justify-center mb-6">
              <FontAwesomeIcon icon={faGlobe} className="text-7xl text-blue-500"/> {/* FontAwesomeIcon */}
            </div>
            <p className="text-center text-xl text-gray-800 mb-4 font-semibold">Oops! Anda belum subscribe!</p>
            <p className="text-center text-gray-600 mb-6">Dapatkan akses penuh dan keuntungan dengan berlangganan sekarang.</p>
            <div className="flex flex-row-reverse justify-center gap-4">
              <button
                onClick={goToSubscribe}
                className="px-6 py-2 bg-blue-500 text-white rounded-full font-medium text-lg transition-transform duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Berlangganan
              </button>
              <button
                onClick={closePopup}
                className="px-6 py-2 bg-gray-500 text-white rounded-full font-medium text-lg transition-transform duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubscribePopup;
