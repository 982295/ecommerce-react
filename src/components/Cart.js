import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Paper,
  Box,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./cartstyle";
import { CartContext } from "../context/CartContext";
import { Rating } from "@material-ui/lab";
import { useAuth } from "../context/AuthContext";

const Cart = () => {
  const { isAuthenticated } = useAuth();
  const classes = useStyles();
  const { cart, updateCartQty, removeFromCart, emptyCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch product data
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false); // Data loaded
      });
  }, []);

  const handleQuantityChange = (productId, change) => {
    const newQuantity =
      cart?.products.find((item) => item.productId === productId).quantity +
      change;
    if (newQuantity > 0) {
      updateCartQty(productId, newQuantity);
    }
  };

  const renderEmptyCart = () => (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh" // Center vertically on the full height of the viewport
      textAlign="center"
    >
      <Typography variant="subtitle1" className={classes.emptyCartText}>
        You have no items in your shopping cart,
        <Link className={classes.link} to="/">
          start adding some
        </Link>
        !
      </Typography>
    </Box>
  );

  const renderCart = () => (
    <>
      <Grid container spacing={2} justifyContent="center">
        {cart?.products?.map((cartItem) => {
          const product = products?.find((p) => p?.id === cartItem?.productId);
          return product ? (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card className={classes.card}>
                <CardMedia
                  component="img"
                  src={product?.image}
                  alt={product?.title}
                  className={classes.media}
                />
                <CardContent className={classes.cardContent}>
                  <Typography variant="h6" className={classes.titleProd}>
                    {product?.title}
                  </Typography>
                  <Typography variant="body1" className={classes.price}>
                    Price: ${product?.price}
                  </Typography>
                  <div className={classes.ratingContainer}>
                    <Rating
                      name="read-only"
                      value={product?.rating?.rate}
                      readOnly
                      precision={0.5}
                      className={classes.ratingStars}
                    />
                  </div>
                </CardContent>
                <CardActions className={classes.actions}>
                  <div className={classes.buttons}>
                    <Button
                      className={classes.quantityButton}
                      type="button"
                      size="small"
                      onClick={() =>
                        handleQuantityChange(cartItem.productId, -1)
                      }
                    >
                      -
                    </Button>
                    <Typography>&nbsp;{cartItem.quantity}&nbsp;</Typography>
                    <Button
                      className={classes.quantityButton}
                      type="button"
                      size="small"
                      onClick={() =>
                        handleQuantityChange(cartItem.productId, 1)
                      }
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    className={classes.removeButton}
                    variant="contained"
                    onClick={() => removeFromCart(cartItem.productId)}
                  >
                    Remove
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ) : null;
        })}
      </Grid>

      <Paper className={classes.summary} elevation={3}>
        <Typography variant="h4" className={classes.subtotalText}>
          Subtotal: $
          {cart?.products
            ?.reduce(
              (total, item) =>
                total +
                item?.quantity *
                  products?.find((p) => p?.id === item?.productId)?.price,
              0
            )
            .toFixed(2)}
        </Typography>
        <div className={classes.buttonContainer}>
          <Button
            className={classes.emptyButton}
            size="large"
            variant="contained"
            color="secondary"
            onClick={emptyCart}
          >
            Empty Cart
          </Button>
          <Button
            className={classes.checkoutButton}
            component={Link}
            to="/checkout"
            size="large"
            variant="contained"
            color="primary"
          >
            Checkout
          </Button>
        </div>
      </Paper>
    </>
  );

  return (
    <Container maxWidth="lg">
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>
        Your Shopping Cart
      </Typography>
      {loading ? (
        <div className={classes.loadingContainer}>
          <CircularProgress />
          <Typography variant="subtitle1" style={{ marginTop: 20 }}>
            Loading...
          </Typography>
        </div>
      ) : cart.products.length === 0 ? (
        renderEmptyCart()
      ) : (
        renderCart()
      )}
    </Container>
  );
};

export default Cart;
