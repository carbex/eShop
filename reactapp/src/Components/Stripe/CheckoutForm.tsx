import React, { useState, useEffect, ChangeEvent } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// const CARD_OPTIONS = {
//   iconStyle: "solid",
//   style: {
//     base: {
//       color: "#32325d",
//       fontFamily: "Arial, sans-serif",
//       fontSmoothing: "antialiased",
//       fontSize: "16px",
//       "::placeholder": {
//         color: "#32325d",
//       },
//     },
//     invalid: {
//       fontFamily: "Arial, sans-serif",
//       color: "#fa755a",
//       iconColor: "#fa755a",
//     },
//   },
// };

type FormProps = {
  amount: number,
  removeAllFromCart: () => void
}

export const CheckoutForm: React.FC<FormProps> = ({ amount, removeAllFromCart }) => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false)
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  // Types
  type Card = {
    complete: boolean,
    brand: string,
    elementType: string,
    empty: boolean,
    error: { type: "validation_error"; code: string; message: string } | undefined,
    value: { postalCode: string },
  }

  // create a payment intent
  useEffect(() => {
    const createPaymentIntent = async (): Promise<void> => {
      try {
        let response = await (
          await fetch("http://localhost:4000/stripe/create-payment-intent", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ price: amount }),
          })
        ).json();
        response.success && setClientSecret(response.clientSecret);
      } catch (error) {
        console.log("Error => ", error);
      }
    };
    createPaymentIntent();
  }, [amount]);

  // empty the cart
  useEffect(() => {
    if (succeeded) {
      removeAllFromCart();
    }
  }, [succeeded]);

  // handle input errors
  const handleChange = async (event: Card): Promise<void> => {
    console.log('Event handleChange => ', event)
    setDisabled(event.empty);
    setError(event?.error ? event.error.message : "");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setProcessing(true);
    const payload = await stripe?.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements?.getElement(CardElement)!,
      },
    });
    if (payload?.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError("");
      setProcessing(false);
      setSucceeded(true);
    }
  };

  return (
    <>
      {!succeeded ? (
        <>
          <form id="payment-form" onSubmit={handleSubmit}>
            <h3>Your shopping amount is {(amount / 100).toFixed(2)}€</h3>
            <p>Use this card number to test me: 4242 4242 4242 4242</p>
            <CardElement
              id="card-element"
              // options={CARD_OPTIONS}
              onChange={handleChange}
            />
            <button style={{width: '100%'}} disabled={processing || disabled || succeeded} id="submit">
              <span id="button-text">
                {processing ? (
                  <div className="spinner" id="spinner"></div>
                ) : (
                  `Pay now ${(+amount / 100).toFixed(2)}€`
                )}
              </span>
            </button>
            {error && (
              <div className="card-error" role="alert">
                {error}
              </div>
            )}
          </form>
        </>
      ) : (
        <div style={{ padding: "20px" }}>
          <p className="result-message">Payment succeeded ! Congrats !!!</p>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
