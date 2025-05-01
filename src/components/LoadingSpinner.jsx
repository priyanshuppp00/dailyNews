import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center my-10">
      <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
