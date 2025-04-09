import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import heroImage from "../assets/cons.jpg";
import heroImage2 from "../assets/decors2.jpg";
import heroImage3 from "../assets/repairCar.jpg";
import heroImage4 from "../assets/haircut.jpg";
import heroImage5 from "../assets/washing2.jpg";
import LocationInput from "../location/LocationInput";

const HomeContainer = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const heroImages = [heroImage, heroImage2];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 20000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="relative">
      <div className="h-[calc(100vh-64px)] md:h-[760px]">
        <img
          src={heroImages[currentImage]}
          alt="Hero"
          className="w-full h-full object-cover brightness-50"
        />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center gap-8 md:gap-24 px-4">
        {/* Heading */}
        <div>
          <h1 className="text-2xl md:text-5xl font-bold md:leading-snug leading-snug">
            "Elevate Your <span className="text-yellow">Home</span> with Expert
            Care <span className="text-yellow font-extrabold">.</span>"
          </h1>
          <p className="mt-4 text-base md:text-xl font-medium">
            Unlock a world of convenience and quality services, right at your
            doorstep.
          </p>
        </div>

        <div className="mt-8 flex flex-col-reverse md:flex-row-reverse items-center  gap-2 md:gap-14">
          <div className="relative flex items-center w-auto md:w-72 h-[55px] md:h-16 rounded-2xl bg-white overflow-hidden">
            <div className="grid place-items-center h-full w-16 text-2xl text-gray-500">
              <IoSearch />
            </div>
            <input
              className="peer h-full w-full outline-none text-base md:text-lg text-gray-700 pl-4 pr-2"
              type="text"
              id="search"
              placeholder="Search for Services"
            />
          </div>

          <div>
            <LocationInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContainer;
