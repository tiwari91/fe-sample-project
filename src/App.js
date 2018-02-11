import React, { Component } from "react";
import "./App.css";

import products from "./data/product-payload";

import Navbar from "./Components/Navbar";
import Container from "./Components/Container";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartCountItem: 0
    };
  }

  loadData = () => {
    let modProd = products["products"].map((product, i) => {
      product.Id = i;
      return product;
    });
    let productItems = {};
    productItems.productsItem = modProd;
    localStorage.setItem("productCart", JSON.stringify(productItems));
  };
  componentDidMount() {}

  updateCartCount = (product, id) => {
    this.setState(
      { cartCountItem: this.state.cartCountItem + 1 },
      this.updateCart(id)
    );
  };

  updateCart = id => {
    if (id !== undefined) {
      if (localStorage.getItem("cartDict")) {
        let dict = JSON.parse(localStorage.getItem("cartDict"));
        if (dict[id]) {
          dict[id] += 1;
        } else {
          dict[id] = 1;
        }
        localStorage.setItem("cartDict", JSON.stringify(dict));
      } else {
        let dict = {};
        dict[id] = 1;
        localStorage.setItem("cartDict", JSON.stringify(dict));
      }
    }
  };

  render() {
    this.loadData();

    return (
      <div>
        <Navbar />
        <Container updateCartCountItem={this.updateCartCount} />
      </div>
    );
  }
}

export default App;
