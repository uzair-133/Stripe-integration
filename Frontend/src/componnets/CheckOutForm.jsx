
import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setMessage("");

    const { error, paymentIntent } =
      await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin,
        },
        redirect: "if_required",
      });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent?.status === "succeeded") {
      setMessage("Payment successful!");
    } else {
      setMessage(
        `Payment status: ${paymentIntent?.status || "processing"}`
      );
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />

      <button
        type="submit"
        disabled={!stripe || !elements || loading}
      >
        {loading ? "Processing..." : "Pay $50"}
      </button>

      {message && <p>{message}</p>}
    </form>
  );
};

export default CheckOutForm;
