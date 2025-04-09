import React, { useState } from "react";
import GpsLocator from "../../hooks/GpsLocator";

const TvRepair = () => {
  const [showLocator, setShowLocator] = useState(false);
  const [fetchedAddress, setFetchedAddress] = useState("");
  const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "black",
    color: "white",
  };

  const handleGetLocation = () => {
    setShowLocator(true);
  };

  const handleAddressChange = (address) => {
    setFetchedAddress(address);
  };

  return (
    <div style={styles}>
      <div>
        <h1 className="text-xl">Click to Get Your Current Location</h1>

        {showLocator && <GpsLocator onAddressChange={handleAddressChange} />}
        <button
          onClick={handleGetLocation}
          className="btn btn-ghost btn-xl bg-red-500"
        >
          Get Location
        </button>
      </div>
    </div>
  );
};

export default TvRepair;
