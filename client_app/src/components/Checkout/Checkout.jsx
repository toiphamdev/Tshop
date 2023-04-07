import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from "react";

function Checkout({ amount }) {
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: 50,
          },
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    return actions.order.capture().then(function (details) {
      // const res = createOrder()
    });
  };

  const onError = (err) => {
    //   setError(err);
    console.error(err);
  };
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AdVIdJt2mChviDiIU_UCqFOE6nymIVWDU1MZdQvG24JswAsaIOkY55IgaLzaudjLMU4V2P_sd8G2J1hq",
      }}
    >
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
}

export default Checkout;
