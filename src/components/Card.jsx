import React from "react";

const Card = ({
    name,
    description,
    progress,
    total,
    imageUrl,
    progressText,
    showProgress,
}) => {
    return (
        <div className="flex w-80 flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-shadow hover:shadow-lg">
            <img
                src={imageUrl}
                alt={name}
                className="mb-4 h-40 w-full rounded-md object-cover"
            />
            <h2 className="mb-2 text-lg font-bold">{name}</h2>
            <p className="mb-4 flex-grow text-xs text-neutral-600">
                {description}
            </p>

            {showProgress && (
                <div className="mt-4 flex items-center justify-between">
                    {/* Progress Bar */}
                    <div className="h-2 w-64 max-w-full rounded-full bg-gray-300">
                        {" "}
                        {/* Adjusting the max width */}
                        <div
                            className="h-2 rounded-full bg-blue-500"
                            style={{ width: `${(progress / total) * 100}%` }}
                        />
                    </div>

                    {/* Progress Text */}
                    <span
                        className="ml-2 text-sm text-gray-600"
                        style={{
                            maxWidth: "3rem",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                        }}
                    >
                        {progressText}
                    </span>
                </div>
            )}
        </div>
    );
};

export default Card;
