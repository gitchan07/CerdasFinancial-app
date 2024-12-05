import React from "react";

const Card = ({ name, description, progress, total, imageUrl }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow w-80 flex flex-col">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h2 className="text-lg font-bold mb-2">{name}</h2>
      <p className="text-neutral-600 text-sm mb-4 flex-grow">{description}</p>
    </div>
  );
};

export default Card;
