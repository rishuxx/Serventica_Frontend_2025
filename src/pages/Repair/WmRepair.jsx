import AddressForm from "../../location/AddressForm";
import Map from "../../location/Maps";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";

const WmRepair = () => {
  const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "black",
    color: "white",
  };

  const [address, setAddress] = useState({
    streetAndNumber: "",
    place: "",
    region: "",
    postcode: "",
    country: "",
    latitude: "",
    longitude: "",
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (address.streetAndNumber) {
      console.log("Selected address:", address);
    }
  };

  const updateCoordinates = (latitude, longitude) => {
    setAddress({ ...address, latitude, longitude });
  };

  return (
    <div style={styles}>
      <AddressForm
        onSubmit={handleFormSubmit}
        address={address}
        setAddress={setAddress}
      />
      {address.longitude && address.latitude && (
        <Map
          longitude={address.longitude}
          latitude={address.latitude}
          updateCoordinates={updateCoordinates}
        />
      )}
    </div>
  );
};

export default WmRepair;
