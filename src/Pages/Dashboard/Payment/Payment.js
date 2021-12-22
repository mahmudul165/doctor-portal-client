import React from "react";
import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import "./Payment.css";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
import { Box } from "@mui/material";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// To avoid exposing it, don't submit any personally identifiable information through requests with this API key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe(
  "pk_test_51K9RqkLxh6ggHi5pK8zSbQwwx27HVvXjvtGmJTskR27CpoV8HIfbpgr73HlQAjIdfzTj3vlxcL9LUXi6LL0FzjKX000UiQyGt6"
);

const Payment = () => {
  const { appointmentId } = useParams();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: appointmentId }),
      //[{ id: "xl-tshirt" }]
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <Box style={{ textAlign: "center", margin: "auto" }}>
      <h2>payment pay for :{appointmentId}</h2>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </Box>
  );
};

export default Payment;
