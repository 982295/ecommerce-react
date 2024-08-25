import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from "@material-ui/core";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import useStyles from "./checkoutStyle"; // Import your styles here
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const stripePromise = loadStripe("your-public-key-here"); // Replace with your Stripe public key

const CheckoutForm = () => {
  const classes = useStyles();
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [loading, setLoading] = useState(false);

  const handleShippingChange = (e) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.success('Order placed successfully!');

    // setLoading(true);

    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: "card",
    //   card: elements.getElement(CardElement),
    // });

    // if (error) {
    //   console.log("[error]", error);
    //   setLoading(false);
    // } else {
    //   console.log("[PaymentMethod]", paymentMethod);
    //   const randomOrderId = Math.floor(Math.random() * 1000000);

    //   await new Promise((resolve) => setTimeout(resolve, 2000));

    //   setOrderId(randomOrderId);
    //   setLoading(false);
      
    // }
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Shipping Details
      </Typography>
      <TextField
        label="Full Name"
        name="name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={shippingDetails.name}
        onChange={handleShippingChange}
        className={classes.textField}
      />
      <TextField
        label="Address"
        name="address"
        variant="outlined"
        fullWidth
        margin="normal"
        value={shippingDetails.address}
        onChange={handleShippingChange}
        className={classes.textField}
      />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="City"
            name="city"
            variant="outlined"
            fullWidth
            margin="normal"
            value={shippingDetails.city}
            onChange={handleShippingChange}
            className={classes.textField}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="State"
            name="state"
            variant="outlined"
            fullWidth
            margin="normal"
            value={shippingDetails.state}
            onChange={handleShippingChange}
            className={classes.textField}
          />
        </Grid>
      </Grid>
      <TextField
        label="Zip Code"
        name="zip"
        type="number"
        variant="outlined"
        fullWidth
        margin="normal"
        value={shippingDetails.zip}
        onChange={handleShippingChange}
        className={classes.textField}
      />

      <Typography variant="h6" gutterBottom style={{ marginTop: "16px" }}>
        Payment Details
      </Typography>
      <CardElement className={classes.cardElement} />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        className={classes.submitButton}
        disabled={loading}
      >
        {loading ? "Processing..." : "Place Order"}
      </Button>
    </form>
  );
};

const CheckoutPage = () => (
  <Container maxWidth="xs" className={useStyles().container}>
    <Typography
      variant="h4"
      gutterBottom
      align="center"
      style={{ marginTop: "7%" }}
    >
      Checkout
    </Typography>
    <Paper className={useStyles().paper} elevation={3}>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </Paper>
  </Container>
);

export default CheckoutPage;
