import React from "react";
import plumbingImage from "../../assets/green.jpg";

const AcRepair = () => {
  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      <img
        src={plumbingImage}
        alt="Plumbing"
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
            textShadow: "2px 2px 4px #000000",
          }}
        >
          Expert Plumbing Services
        </h2>
        <p
          style={{
            color: "white",
            fontSize: "18px",
            textShadow: "1px 1px 2px #000000",
          }}
        >
          Our team of skilled plumbers offers comprehensive plumbing services
          for residential and commercial properties.
        </p>
      </div>
    </div>
  );
};

export default AcRepair;
