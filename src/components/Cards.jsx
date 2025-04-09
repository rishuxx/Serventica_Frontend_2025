import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ item }) => {
  return (
    <div>
      <div className=" w-32 bg-transparent ">
        <Link to={`/services/${item.id}`}>
          <figure>
            <img src={item.image} alt="Service" className="w-14 p-2 " />
          </figure>
        </Link>

        <div className="">
          <Link to={`/services/${item.id}`}>
            <h2 className="">{item.title}</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cards;
