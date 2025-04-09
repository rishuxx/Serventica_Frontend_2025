import React from "react";
import Image from "../../assets/grass.jpg"; // Import your image

const Cleaning = () => {
  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      <img
        src={Image}
        alt="Cleaning"
        style={{ width: "100%", height: "auto" }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <h2
          style={{
            color: "white",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          Expert Cleaning Services
        </h2>
        <p
          style={{
            color: "white",
            fontSize: "18px",
            textShadow: "1px 1px 2px #000000",
          }}
        >
          Our team provides professional cleaning services for residential and
          commercial properties.
        </p>
      </div>
    </div>
  );
};

export default Cleaning;
