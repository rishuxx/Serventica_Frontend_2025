import React, { useEffect, useState } from "react";
import heroImage from "../../assets/bg.png";
import MainCards from "../../components/MainCards";

const Painting = () => {
  const [Painting, setPainting] = useState([]);

  useEffect(() => {
    fetch("http://localhost:6001/menu")
      .then((res) => res.json())
      .then((data) => {
        const specials = data.filter((item) => item.category === "Painting");
        setPainting(specials);
      });
  }, []);

  return (
    <div>
      {/* Hero Image */}
      <div className="relative w-full h-[771px]">
        <div className="absolute top-0 left-0 w-[1920px] h-[771px]">
          <img
            src={heroImage}
            alt="Hero Image"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text of Hero sectin */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white text-center">
          <h1 className="md:text-4xl text-3xl font-bold md:leading-snug leading-snug">
            "Unleash the Beauty of Your Walls with Our{" "}
            <span className="text-yellow">Painting</span> Expertise{" "}
            <span className="text-yellow">.</span>"
          </h1>
          <p className="mt-4 text-xl font-semibold">
            Transform Your Space with our Expert{" "}
            <span className="text-yellow">Painting</span> Services.
          </p>
        </div>
      </div>

      {/* Upper Line and Text */}
      <div>
        <div className="flex flex-col items-center">
          <hr className=" my-14  border-t-1 border-gray-300 w-[1680px]" />
        </div>
        {/* upper texts */}
        <h3 className="absolute text-2xl font-semibold text-gray-600 mt-1 ml-36">
          Painting Services
        </h3>
      </div>

      {/* Card 1 */}
      <div>
        <div className="flex flex-col sm:flex-row flex-wrap  justify-around items-center ml-20 ">
          {Painting.map((item, i) => (
            <MainCards key={i} item={item} />
          ))}
        </div>
      </div>

      {/* bottom Line and Text */}
      <div>
        <div className="flex flex-col items-center">
          <hr className=" my-20  border-t-1 border-gray-300 w-[1680px]" />
        </div>
        <div className="mb-10 ml-36 max-w-4xl">
          <h3 className="text-2xl font-semibold text-gray-600 ">
            Full House Painting and Waterproofing
          </h3>

          <div className=" ml-9 mb-96">
            <h3 className="text-xl mt-7  font-semibold text-gray-500 ">
              At Home Consultation
            </h3>
            <p className="text-gray-600 ml-9 mt-5  text-md font-medium leading-relaxed">
              • Our experts will visit to discuss your vision, assess your
              space, and offer personalized recommendations within your budget.
            </p>
            <p className="text-gray-600 ml-9 mt-5  text-md font-medium leading-relaxed">
              • Actual Prices may vary from the Estimated Prices (depends)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Painting;
