import React from 'react';

const AcademicExcellence = () => {
  return (
    <div className="relative w-full h-[1100px]"> {/* Reduced height */}
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('Screenshot 2025-04-27 215852.png')" }}
      ></div>

      {/* Black Transparent Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Text Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
      </div>
    </div>
  );
};

export default AcademicExcellence;