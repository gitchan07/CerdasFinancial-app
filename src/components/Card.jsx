import React from "react";

const Card = ({ name, description, progress, total, imageUrl }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow w-80 flex flex-col">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h2 className="text-lg font-bold text-gray-800 mb-2">{name}</h2>
      <p className="text-gray-600 text-sm mb-4 flex-grow">{description}</p>
      <div className="flex items-center w-full mt-auto">
        <div className="relative w-full h-6 bg-gray-200 rounded-full mr-2">
          <div
            className="absolute top-0 left-0 h-6 bg-blue-500 rounded-full"
            style={{ width: `${(progress / total) * 100}%` }}
          ></div>
        </div>
        <span className="text-sm text-gray-500">{`${progress}/${total}`}</span>
      </div>
    </div>
  );
};

export default Card;
