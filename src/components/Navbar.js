import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
} from "@material-ui/core";
import { Home, ShoppingCart, AccountCircle } from "@material-ui/icons";
import { Link } from "react-router-dom";
import useStyles from "./style"; // Ensure you have your custom styles imported

import logo from "../assets/commerce.png";

const Navbar = ({ totalItems }) => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar} style={{ background: "bisque" }} color="inherit">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <IconButton
          component={Link}
          to="/"
          aria-label="Home"
          color="inherit"
          className={classes.leftIcon}
        >
          <Home />
        </IconButton>

        <Typography
          variant="h6"
          className={classes.title}
          color="inherit"
          style={{
            flexGrow: 1,
            textDecoration: "none", // Remove underline
            fontWeight: "bold", // Make the title bold
            fontSize: "1.5rem", // Adjust font size
            display: "flex",
            alignItems: "center",
            justifyContent: "center", // Center-align the text
          }}
        >
          <img
            src={logo}
            alt="commerce.js"
            height="30px" // Adjust logo size
            className={classes.image}
            style={{ marginRight: "10px" }}
          />
          Amazon Lite
        </Typography>

        <div>
          <IconButton
            component={Link}
            to="/profile" // Adjust the path as needed
            aria-label="Profile"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <IconButton
            component={Link}
            to="/cart"
            aria-label="Show cart items"
            color="inherit"
          >
            <Badge badgeContent={totalItems} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
