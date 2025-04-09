import "../styles/AutoCompleteInput.scss";
import PropTypes from "prop-types";
import { useState } from "react";
import getPlaces from "../API/getPlaces";

AutoCompleteInput.propTypes = {
  handleManualInputChange: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
  streetAndNumber: PropTypes.string.isRequired,
  setFormattedAddress: PropTypes.func.isRequired,
};

export default function AutoCompleteInput({
  handleManualInputChange,
  setAddress,
  streetAndNumber,
  setFormattedAddress,
}) {
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (event) => {
    handleManualInputChange(event, "streetAndNumber");
    handleInputChange(event.target.value);
  };

  const handleInputChange = async (query) => {
    const suggesions = await getPlaces(query);
    setSuggestions(suggesions);
  };

  const handleSuggestionClick = (suggestion) => {
    const streetAndNumber = suggestion.place_name.split(",")[0];
    const latitude = suggestion.center[1];
    const longitude = suggestion.center[0];

    const address = {
      streetAndNumber,
      place: "",
      region: "",
      postcode: "",
      country: "",
      latitude,
      longitude,
    };

    suggestion.context.forEach((element) => {
      const identifier = element.id.split(".")[0];

      address[identifier] = element.text;
    });

    const formattedAddress = [
      address.streetAndNumber,
      address.place,
      `${address.region} ${address.postcode}`,
      address.country,
    ]
      .filter((value) => value.trim() !== "")
      .join(", ");

    console.log(address.longitude, address.latitude);

    setAddress(address);
    setSuggestions([]);
    setFormattedAddress(formattedAddress);
  };

  return (
    <div>
      <div className="autoCompleteInputContainer">
        <input
          id="address"
          type="text"
          placeholder="Address"
          value={streetAndNumber}
          onChange={handleChange}
          className="text-black"
        />
        <ul className="addressSuggestions">
          {suggestions?.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion.place_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
