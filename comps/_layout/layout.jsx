import React from "react";
import { AuthContextProvider } from "context/auth-ctx";
import { CartContextProvider } from "context/cart-ctx";

import Header from "comps/_layout/header/_header";
import Cart from "comps/_layout/cart/_cart";

// ==============================================

export default function Layout({ children, name, restrict }) {

  return (
    <AuthContextProvider { ...{ restrict } }>
      <CartContextProvider>

      <Header />

      <Cart />

      <main id="page" className={name}>
        {children}
      </main> 
      
      </CartContextProvider>
    </AuthContextProvider>
  );

}