import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import "../App.css";
import Modal from "./Modal";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);
  const { user } = useAuth();
  const [cart, refetch] = useCart();
  const [showSidebar, setShowSidebar] = useState(false);

  // handle scroll fnc
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        const offset = window.scrollY;
        if (offset > 0) {
          setSticky(true);
        } else {
          setSticky(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = (
    <>
      <li className="font-semibold mb-4 flex items-center border-b">
        <a href="/" className="lg:text-white">
          HOME
        </a>
      </li>
      <li className="font-semibold lg:text-white mb-4   border-b ">
        <details>
          <summary className="flex items-center">SERVICES</summary>
          <ul className="pl-4 text-gray-600 my-5">
            <li className="flex items-center my-3">
              <Icon icon="tabler:paint" className="mr-2  text-2xl lg:hidden" />
              <a href="painting">Painting</a>
            </li>
            <li className="flex items-center my-3">
              <Icon
                icon="ic:baseline-bolt"
                className="mr-2  text-2xl lg:hidden"
              />
              <a href="electrician">Electrician</a>
            </li>
            <li className="flex items-center my-3">
              <Icon
                icon="ic:baseline-plumbing"
                className="mr-2  text-2xl lg:hidden"
              />
              <a href="plumbing">Plumbing</a>
            </li>
            <li className="flex items-center my-3">
              <Icon
                icon="ic:baseline-cleaning-services"
                className="mr-2  text-2xl lg:hidden"
              />
              <a href="cleaning">Cleaning</a>
            </li>
          </ul>
        </details>
      </li>

      <li className="font-semibold mb-4 lg:text-white border-b ">
        <details>
          <summary className="flex items-center">REPAIR</summary>
          <ul className="pl-4 text-gray-600 my-5">
            <li className="flex items-center my-3">
              <Icon
                icon="ic:baseline-air"
                className="mr-2 text-2xl lg:hidden"
              />
              <a href="ac-repair">AC Repair</a>
            </li>
            <li className="flex items-center my-3">
              <Icon icon="ic:baseline-tv" className="mr-2 text-2xl lg:hidden" />
              <a href="tv-repair">TV repair</a>
            </li>
            <li className="flex items-center my-3">
              <Icon
                icon="ic:baseline-water-drop"
                className="mr-2 text-2xl lg:hidden"
              />
              <a href="ro-repair">R.O</a>
            </li>
            <li className="flex items-center my-3">
              <Icon
                icon="ic:baseline-wind-power"
                className="mr-2 text-2xl lg:hidden"
              />
              <a href="fan-repair">Cooler/Fan</a>
            </li>
            <li className="flex items-center my-3">
              <Icon
                icon="ic:baseline-local-laundry-service"
                className="mr-2 text-2xl lg:hidden"
              />
              <a href="wm-repair">Washing Machine </a>
            </li>
          </ul>
        </details>
      </li>

      <li className="font-semibold mb-4 lg:text-white border-b">
        <details>
          <summary className="flex items-center">ONDEMAND</summary>
          <ul className="pl-4 text-gray-600 my-5">
            <li className="flex items-center my-3">
              <Icon
                icon="map:beauty-salon"
                className="mr-2  text-2xl lg:hidden"
              />
              <a>Salon</a>
            </li>

            <li className="flex items-center my-3">
              <Icon
                icon="mdi:string-lights"
                className="mr-2  text-2xl lg:hidden"
              />
              <a>Decors</a>
            </li>

            <li className="flex items-center my-3">
              <Icon
                icon="ic:baseline-engineering"
                className="mr-2 text-2xl lg:hidden"
              />
              <a>Menpower</a>
            </li>
          </ul>
        </details>
      </li>

      <li className="font-semibold mb-4 flex items-center lg:text-white border-b">
        <a>CONTACT</a>
      </li>
    </>
  );

  return (
    <header className="max-w-[1620px] container mx-auto pt-4 font-medium fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out z-50">
      <div
        className={`navbar xl:px-1 ${
          isSticky
            ? "shadow-2xl bg-gray-900/30 backdrop-blur-lg rounded-xl text-white transition-all duration-300 ease-in-out"
            : ""
        }`}
      >
        <div className="navbar-start">
          <div className="lg:hidden">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="btn btn-ghost btn-circle"
            >
              <Icon icon="ic:baseline-menu" className="text-2xl" />
            </button>
          </div>
          <a href="/">
            <img
              src={logo}
              alt="Logo for Company"
              className="w-36 ml-4"
              loading="lazy"
            />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end">
          {/* cart Items */}
          <Link to="cart">
            <motion.ul
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <div
                tabIndex="0"
                role="button"
                className="btn btn-ghost btn-circle mr-4 lg:flex hidden items-center justify-center"
              >
                <div className="indicator">
                  <Icon
                    icon="solar:cart-check-outline"
                    className="text-4xl text-white cursor-pointer hover:text-yellow-500 duration-100 transition-all ease-in-out"
                  />
                  <span className="badge badge-sm bg-yellow border-none indicator-item">
                    {cart.length}
                  </span>
                </div>
              </div>
            </motion.ul>
          </Link>
          {/* Login button */}

          {user ? (
            <Profile user={user} />
          ) : (
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="btn px-5 text-white bg-yellow hover:bg-yellow-600 transition-all duration-200 ease-in-out mr-4 ml-8 border-none 
               md:btn-xl"
            >
              Login
            </button>
          )}

          <Modal />
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-xl transition-all duration-500 ease-in-out z-400 ${
          showSidebar ? "visible" : "invisible"
        }`}
        onClick={() => setShowSidebar(false)}
      ></div>
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-red-500 text-white p-8 transition-all duration-300 ease-in-out z-50 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setShowSidebar(false)}
          className="btn btn-ghost btn-circle absolute top-4 right-4"
        >
          <Icon icon="ic:baseline-close" className="text-2xl " />
        </button>
        <ul className="mt-16">{navItems}</ul>
      </div>
    </header>
  );
};

export default Navbar;
