import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import useCart from "../../hooks/useCart";

const stripePromise = loadStripe(import.meta.env.VITE_Stripe_PK);

const Payment = () => {
  const [cart] = useCart();

  // Debugging: Check the type and contents of cart
  console.log("Cart:", cart);
  console.log("Type of cart:", Array.isArray(cart) ? "Array" : typeof cart);

  // Ensure cart is an array before using reduce
  const cartSubTotal = Array.isArray(cart)
    ? cart.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0)
    : 0;

  const orderTotal = cartSubTotal;
  const totalPrice = parseFloat(orderTotal.toFixed(2));

  return (
    <div>
      <div className="relative bg-red-500 h-24 w-full" />
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-28">
        <Elements stripe={stripePromise}>
          <CheckoutForm price={totalPrice} cart={cart} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
