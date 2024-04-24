import React from 'react';
import avatar from './avatar.webp';

const Items = () => {
  return (
    <div className="row product">
      <div className="col-md-2">
        <img src={avatar} alt="Avatar" height="150" />
      </div>
      <div className="col-md-8 product-detail">
        <h4>Blue T-Shirt</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <div className="col-md-2 product-price">
        $19.99
      </div>
    </div>
  );
}

export default Items;