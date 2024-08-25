import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import useStyles from "./style";
import { AddShoppingCart } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@material-ui/core/CircularProgress";


const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);


  const { addToCart } = useContext(CartContext);
  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success("Product added to cart successfully!");
  };

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data)
        setLoading(false);
    });
  }, []);

  const classes = useStyles();

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </div>
      ) : (
        <Grid container justifyContent="center" spacing={4}>
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <Card
              className={classes.root}
              style={{
                padding: "16px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                style={{ width: "50%", height: "auto", borderRadius: "8px" }}
                className={classes.media}
                src={product.image}
                alt={product.title}
              />
              <CardContent>
                <div className={classes.cardContent}>
                  <Typography
                    variant="subtitle1"
                    component="p"
                    color="textSecondary"
                  >
                    ⭐ {product?.rating?.rate} / 5.0 ({product?.rating?.count}{" "}
                    reviews)
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h4"
                    style={{ fontWeight: 600 }}
                  >
                    {product.title}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h5"
                    color="secondary"
                  >
                    ${product.price}
                  </Typography>
                </div>
                <Typography
                  dangerouslySetInnerHTML={{ __html: product.description }}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  style={{ marginTop: "16px" }}
                />
              </CardContent>
              <CardActions
                disableSpacing
                className={classes.cardActions}
                style={{ padding: "0 16px" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddShoppingCart />}
                  onClick={() => handleAddToCart(product)}
                  style={{ fontWeight: 600, textTransform: "none" }}
                >
                  Add to Cart
                </Button>
                <ToastContainer
                  position="bottom-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  closeOnClick
                  pauseOnHover
                  draggable
                  pauseOnFocusLoss
                />
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      )}
    </main>
  );
  
};

export default ProductDetailPage;
