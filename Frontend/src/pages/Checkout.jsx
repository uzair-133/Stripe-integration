
import { useState } from "react";
import PaymentWrapper from "../componnets/PaymentWrapper";
import { createPaymentIntent } from "../service/paymentService";

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await createPaymentIntent();

      setClientSecret(data.clientSecret);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "450px", margin: "60px auto" }}>
      <h1>Stripe Checkout</h1>

      <h2>Premium Product - $50</h2>

      {!clientSecret && (
        <button
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "Loading..." : "Proceed to Payment"}
        </button>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {clientSecret && (
        <PaymentWrapper clientSecret={clientSecret} />
      )}
    </div>
  );
};

export default Checkout;
