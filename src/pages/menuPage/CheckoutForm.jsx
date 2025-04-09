import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ price, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [cardError, setcardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof price !== "number" || price < 1) {
      console.log(
        "Invalid price value. Must be a number greater than or equal to 1."
      );
      return;
    }
    // Create PaymentIntent as soon as the page loads
    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      console.log(res.data.clientSecret);
      console.log(price);
      setClientSecret(res.data.clientSecret);
    });
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    // create card element
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setcardError(error.message);
    } else {
      const successMessage = (
        <span style={{ color: "green" }}>Payment successful!</span>
      );
      setcardError(successMessage);
      // console.log("[PaymentMethod]", paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "unknown",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
    }

    console.log("paymentIntent", paymentIntent);

    if (paymentIntent.status === "succeeded") {
      const transitionId = paymentIntent.id;
      setcardError(`Your transitionId is: ${transitionId}`);

      // save payment info to server
      const paymentInfo = {
        email: user.email,
        transitionId: paymentIntent.id,
        price,
        quantity: cart.length,
        status: "Order Pending",
        itemsName: cart.map((item) => item.title),
        cartItems: cart.map((item) => item._id),
        menuItems: cart.map((item) => item.menuItemId),
      };
      console.log(paymentInfo);
      // send payment info
      axiosSecure.post("/payments", paymentInfo).then((res) => {
        console.log(res.data);
        if (res.data) {
          alert("Payment info sent successfully!");
          navigate("/order");
        }
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-start items-start gap-8">
      {/* left */}

      <div className="md:w-1/2 w-full space-y-3">
        <h4 className="text-lg font-bold">Order Summary</h4>
        <p className="text-md font-medium">
          Total Price :{" "}
          <button className="btn btn-sm  bg-[#298E83] text-white font-medium w-24">
            {" "}
            ₹ {price}
          </button>{" "}
        </p>
        <p className="text-md font-medium">
          Number of Items:{" "}
          <button className="btn btn-sm btn-ghost"> {cart.length}</button>
          <button />
        </p>
      </div>

      {/* right */}

      <div className="md:w-1/3 w-full space-y-3 card shrink-0 max-w-sm shadow-2xl bg-base-100 px-4 py-8">
        <h4 className="text-lg font-bold">Process your Payment</h4>
        <h5 className="font-medium ">Credit/Debit Card</h5>

        {/* stripe form  */}

        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            type="submit"
            disabled={!stripe}
            className="btn btn-sm mt-5 bg-[#298E83] text-white w-full font-medium"
          >
            Pay ₹{price}
          </button>
        </form>

        {cardError ? (
          <p className="text-red-500 text-sm italic font-normal">{cardError}</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;
