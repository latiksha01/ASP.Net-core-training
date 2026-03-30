import React from "react";

function ProductItem({ product, addToCart }) {
  return (
    <div className="product">
      <span>{product.name} - ${product.price}</span>
      <button onClick={() => addToCart(product)}>Add</button>
    </div>
  );
}

export default ProductItem;