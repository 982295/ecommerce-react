import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { AddShoppingCart } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "./style";
import { Rating } from "@material-ui/lab";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filterInput, setFilterInput] = useState("");
  const [isSort, setIsSort] = useState(false);
  const productsPerPage = 4;

  console.log("selectcat", selectedCategory);

  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success("Product added to cart successfully!");
  };

  const handleSelect = (e) => {
    setIsSort(e.target.value);
  };

  useEffect(() => {
    let apiUrl = "";
    if (isSort) {
      apiUrl = "https://fakestoreapi.com/products?sort=desc";
    } else {
      apiUrl = "https://fakestoreapi.com/products?limit=5";
    }

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });

    const fetchCategory = () => {
      fetch("https://fakestoreapi.com/products/categories")
        .then((res) => res.json())
        .then((data) => {
          setCategory(data);
          setLoading(false);
        });
    };

    fetchCategory();
  }, [isSort]);

  useEffect(() => {
    if(selectedCategory !== null){
      fetch(`https://fakestoreapi.com/products/category/${selectedCategory}`)
      .then((res) => res.json())
      .then((json) => setProducts(json));
    }
    
  }, [selectedCategory]);

  console.log("product",products)

  const classes = useStyles();

  console.log("categoty", category);

  const filterProducts = () => {
    return products.filter((product) => {
      const filterText = filterInput.toLowerCase();

      return (
        product.title.toLowerCase().includes(filterText) ||
        product.category.toLowerCase().includes(filterText) ||
        product.rating.rate.toString().includes(filterText)
      );
    });
  };

  const filteredProducts = filterProducts();
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />

      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <FormControl>
          <InputLabel id="demo-simple-select-label" style={{}}>
            Sort
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={isSort}
            label="Age"
            onChange={handleSelect}
            className={classes.selectTag}
          >
            <MenuItem value={false}>select</MenuItem>
            <MenuItem value={true}>Sort</MenuItem>
          </Select>
        </FormControl>

        <FormControl width="200px">
          <InputLabel id="demo-simple-select-label" style={{}}>
            Filter By Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCategory}
            label="Age"
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={classes.selectTag}
          >
            {category?.length > 0 &&
              category?.map((item) => <MenuItem value={item}>{item}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>

      <TextField
        label="Filter products"
        placeholder="Filter By Name, Rating, Category"
        variant="outlined"
        fullWidth
        value={filterInput}
        onChange={(e) => setFilterInput(e.target.value)}
        className={classes.filterInput}
        style={{ marginTop: "20px" }}
      />

      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <>
          <Grid
            container
            justify="center"
            spacing={4}
            style={{ marginTop: "3%" }}
          >
            {currentProducts.map((product) => (
              <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
                <Card className={classes.card}>
                  <img
                    style={{
                      width: "200px",
                      height: "200px",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate(`/product/${product?.id}`)}
                    className={classes.media}
                    src={product.image}
                    alt={product.title}
                  />
                  <CardContent style={{ height: "120px" }}>
                    <div
                      className={classes.cardContent}
                      style={{ height: "100%" }}
                    >
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="h4"
                        className={classes.productTitle}
                        onClick={() => navigate(`/product/${product?.id}`)}
                        style={{ cursor: "pointer" }}
                      >
                        {product.title}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body1"
                        className={classes.price}
                        component="p"
                      >
                        ${product.price}
                      </Typography>
                    </div>
                  </CardContent>
                  <CardActions
                    disableSpacing
                    className={classes.cardActions}
                    style={{ justifyContent: "space-between" }}
                  >
                    <div className={classes.ratingContainer}>
                      <Rating
                        name="read-only"
                        value={product?.rating?.rate}
                        readOnly
                        precision={0.5}
                        className={classes.ratingStars}
                      />
                      <Typography
                        variant="subtitle1"
                        component="p"
                        color="textSecondary"
                      >
                        ⭐ {product.rating.rate} / 5.0
                      </Typography>
                    </div>

                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<AddShoppingCart />}
                      onClick={() => handleAddToCart(product)}
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        textTransform: "none",
                      }}
                    >
                      Add to Cart
                    </Button>

                    <Typography
                      variant="body2"
                      component="span"
                      style={{
                        marginRight: "8px",
                        color: "#FF5722",
                        fontWeight: "bold",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        backgroundColor: "#FFE0B2",
                      }}
                    >
                      {product.rating.count} left
                    </Typography>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
            pauseOnFocusLoss
          />
          <Pagination
            count={Math.ceil(filteredProducts.length / productsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          />
        </>
      )}
    </main>
  );
};

export default Products;
