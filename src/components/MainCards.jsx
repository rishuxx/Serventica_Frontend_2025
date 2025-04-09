import React, { useContext } from "react";
import ratingIcon from "../assets/star.png";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const MainCards = ({ item }) => {
  const { title, price, image, _id } = item;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const addtoCart = (item) => {
    // console.log("clicked", item);
    if (user && user?.email) {
      const cartItem = {
        menuItemId: _id,
        quantity: 1,
        title,
        price,
        image,
        email: user.email,
      };
      // console.log(cartItem);
      fetch("https://serventica-backend-2025.onrender.com/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if (data._id) {
            // Changed from data.insertedId
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Item Added to Cart",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        title: "Please Signup or Login!",
        text: "Without an account unable to add to cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Signup",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signup", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div>
      <div className="card w-[500px] bg-base-100 shadow-lg mr-24 mt-16">
        <figure className="relative group">
          <img
            src={item.image}
            alt="Image"
            className="w-[500px] h-[450px] rounded-2xl object-cover group-hover:brightness-75 transition duration-300"
          />
          <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300">
            <h2 className="text-white text-3xl font-semibold">{item.title}</h2>
          </div>
        </figure>
        <div className="card-body p-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-64">
                <a className="card-title text-orange">{item.title}</a>
                <p className="text-md text-green-700 font-normal">
                  <span className="text-md text-green-700 font-normal">
                    {" "}
                    ₹{" "}
                  </span>{" "}
                  {item.price}
                </p>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <img src={ratingIcon} alt="Rating Icon" className="w-6 mr-1" />
                <h4 className="font-medium">{item.rating}</h4>
                <div className="card-actions">
                  <button
                    className="btn btn-sm bg-orange text-white rounded-full w-20 h-9 ml-80"
                    onClick={() => addtoCart(item)}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
          <p className="font-medium" style={{ color: "rgba(0, 0, 0, 0.58)" }}>
            {item.des}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainCards;
