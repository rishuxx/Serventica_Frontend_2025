import React, { useContext, useState } from "react";
import useCart from "../../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  //calculatedPrice
  const calculatePrice = (item) => {
    return item.price * item.quantity;
  };

  //handleIncrease
  const handleIncrease = (item) => {
    fetch(`http://localhost:6001/carts/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ quantity: item.quantity + 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem._id === item._id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }

          return cartItem;
        });

        setCartItems(updatedCart);
        refetch();
      });
  };

  //handleDecrease
  const handleDecrease = (item) => {
    const quantity = item.quantity || item.menuItem.quantity || 0;

    if (quantity > 1) {
      fetch(`http://localhost:6001/carts/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ quantity: quantity - 1 }),
      })
        .then((res) => res.json())
        .then((data) => {
          const updatedCart = cartItems.map((cartItem) => {
            if (cartItem._id === item._id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              };
            }
            return cartItem;
          });
          setCartItems(updatedCart);
          refetch();
        });
    } else {
      let timerInterval;
      Swal.fire({
        title: " Alert!",
        html: "Quantity can't set to be Zero",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      });
    }
  };

  //handleDelete
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:6001/carts/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  //CalculateSubTotal
  const cartSubTotal = cart.reduce((total, item) => {
    return total + calculatePrice(item);
  }, 0);

  const orderTotal = cartSubTotal;

  return (
    <div>
      <div className="relative bg-red-500 h-24 w-full" />
      <div className="max-w-7xl px-32 py-11 flex flex-col md:flex-row items-center md:justify-between gap-4 md:gap-0">
        <p className="text-red-600 font-bold text-xl md:w-1/2">Cart Items</p>
      </div>

      {/* table cart */}
      {cart.length > 0 ? (
        <div>
          <div className="mx-32">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead className="bg-red-500 text-white ">
                  <tr>
                    <th>#</th>
                    <th>Service</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {cart.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-32">
                              <img src={item.image} alt="" />
                            </div>
                          </div>
                          {/* <div>
                        <div className="font-bold">{item.title}</div>
                        <div className="text-sm opacity-50">United States</div>
                      </div> */}
                        </div>
                      </td>
                      <td>
                        <div className="font-semibold">{item.title}</div>
                      </td>
                      <td>
                        <button
                          className="font-semibold btn btn-ghost btn-sm"
                          onClick={() => handleDecrease(item)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          className="w-10 mx-2 text-center overflow-hidden appearance-none"
                        ></input>
                        <button
                          className="font-semibold btn btn-ghost btn-sm"
                          onClick={() => handleIncrease(item)}
                        >
                          +
                        </button>
                      </td>
                      <th>
                        <button className="btn btn-ghost btn-sm">
                          ₹ {calculatePrice(item).toFixed(2)}
                        </button>
                      </th>
                      <th>
                        <button
                          className="btn btn-ghost btn-sm text-red-500"
                          onClick={() => handleDelete(item)}
                        >
                          <FaTrash />
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* user detail */}

          <div className="flex flex-col items-center">
            <hr className=" my-8  border-t-1 border-gray-300 w-[1680px]" />
          </div>

          <div className="my-1 flex justify-between items-end">
            <div className="flex mb-10 ml-40 items-center space-x-4">
              <h3 className="font-semibold">Customer Details</h3>
              <p className="font-medium btn">
                Name : {user?.displayName || "Null"}
              </p>
              <p className="font-medium btn">
                Email : {user?.email || "no email"}
              </p>
            </div>
            <div className="flex mb-10 mr-52 items-center space-x-4">
              <h3 className="font-semibold">Shopping Details</h3>
              <p className="font-medium btn">Total Item : {cart.length}</p>
              <p className="font-medium btn">Total Price : ₹ {orderTotal}</p>
              <Link to="/process-checkout">
                <button className="btn bg-red-500 text-white font-normal">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-20">
          <p>Cart is empty. Please add products.</p>
          <Link to="/">
            <button className="btn bg-green text-white mt-3">
              Back to Home
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
