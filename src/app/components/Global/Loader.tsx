import React from "react";

const Loader = () => {
    return (
        <div className="flex justify-center items-center space-x-2 mt-4">
            <div className="w-8 h-8 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            <span className="text-gray-700">Loading...</span>
        </div>
    );
};

export default Loader;
