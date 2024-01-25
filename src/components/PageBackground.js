import React from "react";
import netflixHeroImage from "../assets/netflixHeroImage.jpg";

const PageBackground = ({ children }) => {
  return (
    <div>
      <div className="absolute -z-10 top-0 h-full min-h-screen overflow-hidden">
        <img className="object-cover" src={netflixHeroImage} alt="" />
      </div>
      <div className="absolute -z-10 top-0 w-full h-full min-h-screen bg-black bg-opacity-10 "></div>
      {children}
    </div>
  );
};

export default PageBackground;
