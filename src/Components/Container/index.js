import React, { Component } from "react";
import { Title, cardStyle, amount, btn, bottomContainer } from "./styles";

class Container extends Component {
  render() {
    let products = null;

    if (JSON.parse(localStorage.getItem("productCart"))) {
      products = JSON.parse(localStorage.getItem("productCart")).productsItem;
    }

    return (
      <div className="container mt-5">
        <h3 style={{}}>Shop our feature collection</h3>
        <div className="row">
          {products &&
            products.map((product, i) => (
              <div
                className="col-lg-3 col-md-3 col-sm-6 col-xs-12"
                style={cardStyle}
                key={product.Id}
              >
                <div style={{ marginTop: 10 }}>
                  <img
                    style={{ height: "auto" }}
                    className="img-fluid"
                    src={require(`../../../images/${product.filename}`)}
                  />
                </div>

                <div style={bottomContainer}>
                  <div style={{ textalign: "center" }}>{product.name}</div>
                  <div style={amount}>${(product.price / 100).toFixed(2)}</div>
                  <div style={btn}>
                    <button
                      type="button"
                      className="btn btn-outline-dark btn-lg"
                      onClick={e =>
                        this.props.updateCartCountItem(product, product.Id, e)
                      }
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Container;
