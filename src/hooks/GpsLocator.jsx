import React, { useState, useEffect } from "react";

const GpsLocator = ({ onAddressChange }) => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [region, setState] = useState("");
  const [city, setCity] = useState("");
  const [locality, setLocality] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if the Geolocation API is supported
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    // Get the user's current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        console.log("Position obtained:", position);

        // Fetch address using Mapbox Geocoding API
        const apiKey =
          "pk.eyJ1IjoicmlzaHV4eCIsImEiOiJjbHdyZjZueGQwMDRrMmpzZ3YzNGZqZ2pxIn0.0C3--6p3f_NxIBifKE9-Vg";
        const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${position.coords.longitude},${position.coords.latitude}.json?access_token=${apiKey}`;
        console.log("Fetching address from URL:", apiUrl);

        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            console.log("Data received from Mapbox:", data);
            if (data.features.length > 0) {
              const place = data.features[0];

              const fetchedAddress = place.place_name;
              setAddress(fetchedAddress);
              onAddressChange(fetchedAddress); // Call the onAddressChange callback with the fetched address

              // Parse the context array to get country, region, city, locality, and neighborhood
              const pin = place.context.find((c) =>
                c.id.startsWith("postcode")
              );
              const country = place.context.find((c) =>
                c.id.includes("country")
              );
              const region = place.context.find((c) => c.id.includes("region"));
              const city = place.context.find((c) => c.id.includes("place"));
              const locality = place.context.find((c) =>
                c.id.includes("locality")
              );
              const neighborhood = place.context.find((c) =>
                c.id.includes("neighborhood")
              );

              setCountry(country ? country.text : "");
              setState(region ? region.text : "");
              setCity(city ? city.text : "");
              setLocality(locality ? locality.text : "");
              setNeighborhood(neighborhood ? neighborhood.text : "");
              setPinCode(pin ? pin.text : "Pin code not found");

              console.log("Address:", fetchedAddress);
              console.log("Country:", country ? country.text : "");
              console.log("State:", region ? region.text : "");
              console.log("City:", city ? city.text : "");
              console.log("Locality:", locality ? locality.text : "");
              console.log(
                "Neighborhood:",
                neighborhood ? neighborhood.text : ""
              );
              console.log("Pin code:", pin ? pin.text : "Not available");
            } else {
              setError("Unable to fetch address");
            }
          })
          .catch((error) => {
            console.error("Error fetching address:", error);
            setError(`Error fetching address: ${error.message}`);
          });
      },
      (error) => {
        console.error("Error getting location:", error);
        setError(`Error getting location: ${error.message}`);
      }
    );
  }, [onAddressChange]);

  return (
    <div>
      {error && <p>{error}</p>}
      {location && (
        <div>
          <p>Country: {country}</p>
          <p>State: {region}</p>
          <p>City: {city}</p>
          <p>Locality: {locality}</p>
          <p>Neighborhood: {neighborhood}</p>
          <p>Pin Code: {pinCode}</p>

          <p className="text-xl">
            Full Address: <span className="text-xl">{address}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default GpsLocator;
