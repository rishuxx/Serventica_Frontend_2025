import React, { useState } from "react";
import LocationInput from "../../location/LocationInput";

const RoRepair = () => {
  const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "black",
    color: "white",
  };

  const handleLocationChange = (location) => {
    console.log("New location:", location);
  };

  return (
    <div style={styles}>
      <div>
        <LocationInput onLocationChange={handleLocationChange} />
        {/* Rest of your page content */}
      </div>
    </div>
  );
};

export default RoRepair;
