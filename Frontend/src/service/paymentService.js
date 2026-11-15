const API_URL = import.meta.env.VITE_API_URL;

export const createPaymentIntent = async () => {
    const response = await fetch(
        `${API_URL}/api/payment/create-payment-intent`,
        {
            method: "POST",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Payment initialization failed"
        );
    }

    return data;
};