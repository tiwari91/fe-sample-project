import React, { Component } from "react";
import {
  navbar,
  iconColor,
  cartly,
  shopText,
  ulStyle,
  cartCount
} from "./styles";
import ModalWin from "../Modal/";

const customStyles = {
  content: {
    overflowY: "auto",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "calc(100vh - 210px) ",
    maxWidth: "calc(100hw - 210px) "
  }
};

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  componentDidMount() {
    localStorage.clear();
  }

  removeFromCart(product, Id) {
    let dictObject = JSON.parse(localStorage.getItem("cartDict"));
    delete dictObject[Id];
    localStorage.setItem("cartDict", JSON.stringify(dictObject));
    this.setState({ modalIsOpen: true });
  }

  render() {
    let cartCountItems = 0;
    let dictObject = JSON.parse(localStorage.getItem("cartDict"));
    let cartItems = JSON.parse(localStorage.getItem("productCart"))? JSON.parse(localStorage.getItem("productCart"))[
      "productsItem"
    ]: null;
    let totalPrice = 0;

    if (dictObject) {
      cartCountItems = Object.keys(dictObject).reduce(function(sum, key) {
        return sum + parseInt(dictObject[key]);
      }, 0);

      cartItems = cartItems.filter(Item => {
        if (dictObject.hasOwnProperty(Item.Id)) {
          return Item;
        }
      });

      totalPrice =
        Object.keys(cartItems).length === 0
          ? "$0"
          : "$" +
            Object.values(cartItems)
              .map(product => product.price / 100 * dictObject[product.Id])
              .reduce((a, b) => a + b)
              .toFixed(2);
    }

    return (
      <header>
        <nav
          className="navbar navbar-expand-md navbar-dark fixed-top"
          style={navbar}
        >
          <a className="navbar-brand">
            <i
              style={iconColor}
              className="fa fa-shopping-cart fa-2x"
              aria-hidden="true"
            />
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto" style={ulStyle}>
              <li className="nav-link" style={cartly}>
                Cart.ly
              </li>

              <li>
                <a className="nav-link" href="#" style={shopText}>
                  Shop
                </a>
              </li>
            </ul>

            <ul className="nav navbar-nav navbar-right">
              <li>
                <a
                  className="nav-link"
                  href="#"
                  style={shopText}
                  onClick={this.openModal}
                >
                  Your cart
                </a>
              </li>
              <li>
                <div style={cartCount}>{cartCountItems}</div>
              </li>
            </ul>

            <ModalWin
              modalIsOpen={this.state.modalIsOpen}
              onRequestClose={this.state.closeModal}
              customStyles={customStyles}
              dictObject={dictObject}
              cartItems={cartItems}
              removeFromCart={this.removeFromCart}
              closeModal={this.closeModal}
              totalPrice={totalPrice}
            />
          </div>
        </nav>
      </header>
    );
  }
}

export default Navbar;
