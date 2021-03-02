import React, { useState } from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Review from "./Review";

const stripePromise = loadStripe("...");

const PaymentForm = ({ shippingData, checkoutToken, backStep }) => {
  const [submited, setSubmited] = useState(false);
  console.log(shippingData);

  return (
    <>
      <Review checkoutToken={checkoutToken} shippingData={shippingData} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmited(true);
                }}
              >
                <CardElement />
                <br /> <bt />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => {
                      backStep();
                      setSubmited(false);
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!stripe}
                    color="primary"
                  >
                    Pay{" "}
                    {`$${
                      !!parseInt(shippingData.shippingSubdivision)
                        ? parseInt(checkoutToken.live.subtotal.formatted) +
                          parseInt(shippingData.shippingSubdivision)
                        : parseInt(checkoutToken.live.subtotal.formatted)
                    }`}
                  </Button>
                </div>
              </form>
              {submited ? (
                <Typography variant="h6">
                  Thank you for your purchase, payment methods are not being
                  handled, but you get the idea{" "}
                </Typography>
              ) : null}
            </>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;
