import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  function addProductToCart(productId) {
    setCartProducts((prev) => [...prev, productId]);
  }

  function clearCart() {
    setCartProducts([]);
    ls?.setItem("cart", JSON.stringify(cartProducts));
  }

  function removeProductFromCart(productId) {
    setCartProducts((prev) => {
      const productIndex = prev.indexOf(productId);
      if (productIndex !== -1) {
        const newCart = prev.filter((value, i) => i !== productIndex);
        if (newCart.length === 0) ls?.setItem("cart", JSON.stringify([]));
        return newCart;
      }
      return prev;
    });
  }

  return <CartContext.Provider value={{ cartProducts, setCartProducts, addProductToCart, removeProductFromCart, clearCart }}>{children}</CartContext.Provider>;
}
