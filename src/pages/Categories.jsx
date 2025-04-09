import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import heroImage from "../assets/Hinterior.png";
import plumber from "../assets/plumber.png";
import painting from "../assets/painting.png";
import electrician from "../assets/electrician.png";
import cleaning from "../assets/cleaning.png";
import { Link } from "react-router-dom";

const serviceItem = [
  { id: 1, title: "Plumbing", image: plumber },
  { id: 2, title: "Painting", image: painting },
  { id: 3, title: "Electrician", image: electrician },
  { id: 4, title: "Cleaning", image: cleaning },
];

const Cards = ({ item }) => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full hover:-translate-y-1 duration-400 transition-all">
      <div>
        <Link to={`/${item.title.toLowerCase()}`}>
          <img src={item.image} alt={item.title} className="w-12 md:w-16 p-2" />
        </Link>
      </div>
      <div className="mt-1 space-y-8">
        <Link to={`/${item.title.toLowerCase()}`}>{item.title}</Link>
      </div>
    </div>
  );
};

const Categories = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {/* card section */}
      <div className="sticky z-10">
        <div className="text-center bg-yellow relative -top-24 left-1/3  translate-x-1  lg:translate-x-9 lg:translate-y-1 rounded-lg w-28 lg:w-32">
          <p className=" text-gray-600 tracking-wide font-semibold text-lg">
            Services
          </p>
        </div>
        <div className="relative flex  w-80 md:w-2/3  xl:w-2/6 h-20 lg:h-28 -top-36 bg-white m-auto rounded-3xl flex-col sm:flex-row flex-wrap justify-center gap-20 items-center mt-12 font-normal shadow-2xl text-sm">
          <Slider
            {...settings}
            className="relative flex w-full h-full justify-center items-center"
          >
            {serviceItem.map((item, i) => (
              <Cards key={i} item={item} />
            ))}
          </Slider>
        </div>
      </div>

      {/* Hero Section */}
      <HeroSection />
    </>
  );
};

const HeroSection = () => {
  return (
    <div className="relative w-full -mt-48">
      {" "}
      <div className="h-[calc(100vh-64px)] md:h-[760px]">
        <img
          src={heroImage}
          alt="Hero Image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-1/3 ml-10 md:ml-28 transform md:-translate-y-1/2 text-white text-left">
        {" "}
        <h2 className="md:text-4xl text-xl font-bold md:leading-snug leading-snug">
          "<span className="text-yellow">Designing </span>
          Dreams, Crafting Spaces,
          <br />
          of Your Home <span className="text-yellow text-5xl">.</span>"
        </h2>
        <p className="mt-4 text-base md:text-lg">
          Get Started Your Home Design Journey for{" "}
          <span className="text-yellow">₹999.</span>
        </p>
      </div>
    </div>
  );
};

export default Categories;
