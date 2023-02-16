import React, { useState, useEffect, createContext, } from 'react';

import { 
  getCartLS, setCartLS, 
} from 'util/local-storage';
import { lg, lr } from "util/log";

// ==============================================

const CartContext = createContext({
  cart: [],
  setCart: function() {},
});

// ==============================================

const CartContextProvider = ({ children }) => {

  // --------------------------------------------

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cart_ls = getCartLS();
    if (cart_ls) {
      setCart(cart_ls)
    }
  }, []);

  // --------------------------------------------

  const addToCart = (product, variant) => {

    // console.log('product: ', product, '\nvariant: ', variant);

    const { id: variant_id } = variant;

    setCart((prev_cart) => {

      const idx = prev_cart.findIndex(line => line.variant.id === variant_id);
      
      let new_cart;

      if (idx < 0) {
        // lo('addToCart() - new line item');
        new_cart = [...prev_cart, { product, variant, qty: 1 }]; // clone local cart state and add a new product item to the array with the cloned cart.        
      } else {
        // ly('addToCart() - updating quantity');
        new_cart = [...prev_cart]; // clone local cart state via deep copy.
        new_cart[idx] = {...prev_cart[idx], qty: prev_cart[idx].qty + 1}; // update specific item's quantity in the cloned cart array.        
      }

      setCartLS(new_cart);
      return new_cart;
    });



    // - - - - - - - - - - - - - - - - - - - - - 


    // TODO: FLIP anim...

    // - - - - - - - - - - - - - - - - - - - - - 

  };

  // --------------------------------------------

  const removeFromCart = (variant_id) => {
    // lg('removeFromCart()');

    console.log('cart: ', cart);

    setCart((prev_cart) => {

      const new_cart = prev_cart.filter(line => line.variant.id !== variant_id);
      setCartLS(new_cart);
      // fireEvent('cart-remove');
      return new_cart;
    });

    // if (new_cart.length < 1) {
    //   closeCart();
    // }
  }

  // --------------------------------------------

  const resetCart = () => {
    lr('resetting cart');
    setCart([]);
    setCartLS([]);
  };

  // --------------------------------------------

  const context = {
    cart,
    addToCart,
    removeFromCart,
    resetCart
  };

  // --------------------------------------------

  return (
    <CartContext.Provider value={context}>{ children }</CartContext.Provider>
  );

};

// ==============================================

export default CartContext;
export { CartContextProvider };