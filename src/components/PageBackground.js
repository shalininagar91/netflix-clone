import React from "react";

const PageBackground = ({ children }) => {
  return (
    <div
      className={`bg-[url('/src/assets/netflixHeroImage.jpg')] h-full min-h-screen`}
    >
      <div className=" h-full min-h-screen bg-black bg-opacity-10">
        {children}
      </div>
    </div>
  );
};

export default PageBackground;
