
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

const PaymentWrapper = ({ clientSecret }) => {
  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret }}
    >
      <CheckOutForm />
    </Elements>
  );
};

export default PaymentWrapper;
