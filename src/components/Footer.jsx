import React from "react";
import hero from "../assets/Footer.png";

const Footer = () => {
  return (
    <div className="relative w-full -mt-1">
      <div className="h-[calc(100vh-64px)] md:h-[760px]">
        <img src={hero} alt="Hero Image" className="w-full" />
      </div>
    </div>
  );
};

export default Footer;
