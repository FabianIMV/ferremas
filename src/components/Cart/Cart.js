import React, { Component } from "react";
import { ReactComponent as CartIcon } from './cart.svg';

class Cart extends Component {
  render() {
    return (
      <div className="cart">
        <CartIcon />
  </div>
    );
  }
}

export default Cart;
