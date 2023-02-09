import React from "react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductProvider";

const Cart = () => {
  const {
    state: { cart, loading, error },
  } = useProducts();

  let content;

  if (loading) {
    content = (
      <h3 className="text-3xl font-light text-center my-32 text-lime-600">
        L...ding!
      </h3>
    );
  }
  if (error) {
    content = (
      <h3 className="text-3xl font-light text-center my-32 text-red-600">
        Something is wrong!
      </h3>
    );
  }
  if (!loading && !error && cart.length === 0) {
    content = <p>Product is not found!</p>;
  }
  if (!loading && !error && cart.length) {
    content = cart.map((product) => (
      <ProductCard key={product._id} product={product} />
    ));
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl gap-14 mx-auto my-10">
      <h1>This is home page</h1>
      {content}
    </div>
  );
};

export default Cart;
