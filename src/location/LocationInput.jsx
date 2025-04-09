import React, { useState, useEffect, useRef } from "react";
import getPlaces from "../API/getPlaces"; // Assuming getPlaces is in ../API/getPlaces
import { MdGpsFixed } from "react-icons/md";
import "../styles/LocationInput.css";

const LocationInput = ({ onLocationChange }) => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          reverseGeocode(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  };

  const reverseGeocode = async (latitude, longitude) => {
    const apiKey = import.meta.env.VITE_TOKEN; // Replace with your Mapbox API key
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.features.length > 0) {
        const { place_name } = data.features[0];
        setAddress(place_name);
        // Check if onLocationChange is a function before calling it
        if (typeof onLocationChange === "function") {
          onLocationChange({ latitude, longitude, address: place_name });
        }
      } else {
        console.error("Unable to reverse geocode coordinates");
      }
    } catch (error) {
      console.error("Error reverse geocoding coordinates:", error);
    }
  };

  const handleInputChange = async (event) => {
    const query = event.target.value;
    setAddress(query);

    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }

    try {
      const suggestions = await getPlaces(query);
      setSuggestions(suggestions);
    } catch (error) {
      console.error("Error fetching address suggestions:", error);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const [longitude, latitude] = suggestion.center;
    setAddress(suggestion.place_name);
    setLocation({ latitude, longitude });
    setSuggestions([]);
    inputRef.current.blur();
    // Check if onLocationChange is a function before calling it
    if (typeof onLocationChange === "function") {
      onLocationChange({ latitude, longitude, address: suggestion.place_name });
    }
  };

  return (
    <div ref={containerRef} className=" z- relative flex items-center">
      <button
        onClick={getUserLocation}
        className="btn bg-red-600 rounded-2xl px-4 py-3 text-white w-16 h-[55px] md:h-[65px] text-xl mr-1 border-none"
      >
        <MdGpsFixed />
      </button>
      <input
        type="text"
        placeholder=" Your Location or Address"
        value={address}
        onChange={handleInputChange}
        ref={inputRef}
        className="text-gray-500 rounded-2xl px-4 py-2 border-none focus:outline-none w-56 md:w-72 h-[55px] md:h-[65px] text-lg flex-grow"
      />
      {suggestions.length > 0 && (
        <ul
          className="rounded-lg bg-white mt-2 shadow-lg absolute top-full left-0 right-0 z-50 max-h-60 overflow-y-auto suggestion-list"
          style={{ maxHeight: "150px" }}
        >
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-gray-500 text-lg"
            >
              {suggestion.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationInput;
