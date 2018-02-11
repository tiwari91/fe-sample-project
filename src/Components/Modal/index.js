import React, { Component } from "react";
import Modal from "react-modal";

class ModalWin extends Component {
  render() {
    let dictObject = this.props.dictObject;
    let cartItems = this.props.cartItems;

    return (
      <Modal
        isOpen={this.props.modalIsOpen}
        onRequestClose={this.props.closeModal}
        style={this.props.customStyles}
        contentLabel="Cart State"
        ariaHideApp={false}
      >
        <div>
          <h4 style={{ textAlign: "center" }}>Your cart</h4>
          {dictObject
            ? cartItems.map((product, i) => (
                <div
                  className="row"
                  key={product.Id}
                >
                  <span className="col-md-6">
                    <img
                      style={{ height: "50px" }}
                      className="img-fluid"
                      src={require(`../../../images/${product.filename}`)}
                    />
                  </span>

                  <span className="col-md-6">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      <span style={{ whiteSpace: "nowrap", padding: 5 }}>
                        {product.name}
                      </span>

                      <span>
                        <i
                          className="fa fa-times-circle"
                          aria-hidden="true"
                          onClick={e =>
                            this.props.removeFromCart(product, product.Id, e)
                          }
                        />
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end"
                      }}
                    >
                      ${(product.price / 100).toFixed(2) *
                        dictObject[product.Id]}
                    </div>
                  </span>
                </div>
              ))
            : "Nothing in your cart, start shopping."}

          <hr />
          <div>
            <span
              style={{
                float: "left",
                fontWeight: "bolder",
                fontSize: " x-large"
              }}
            >
              Total
            </span>
            <span
              style={{
                float: "right",
                fontWeight: "bolder",
                fontSize: " x-large"
              }}
            >
              {this.props.totalPrice}
            </span>
          </div>
          <div
            style={{
              marginTop: 70,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={this.props.closeModal}
            >
              Back
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ModalWin;
