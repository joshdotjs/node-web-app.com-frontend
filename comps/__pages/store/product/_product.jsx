import React, { useEffect, useState, useContext } from 'react';
// import { createRoot } from 'react-dom/client';

import Context from '/context/context';
import CartContext from 'context/cart-ctx';

// import Header from '../../comps/header/_header';
// import Cart from '../../comps/cart/_cart';
import Button from '/comps/button/button';

// import { lo, lg, lr, lb, ly } from '../../util/log';
// import { fetchGET, fetchPOST } from '../../util/fetch';
// import { 
//   getCartLS, setCartLS, 
// } from '../../util/local-storage';
// import { fireEvent } from '../../util/custom-event';

import css from './.module.scss';

// ==============================================

export default function Product ({ product, variants }) {


  // --------------------------------------------

  console.log('product: ', product);
  console.log('variants: ', variants);

  // --------------------------------------------

  const ctx = useContext(Context);
  const { addToCart } = useContext(CartContext);

  // --------------------------------------------

  const { id: product_id, title, body, price } = product;

  // --------------------------------------------

  const [variant, setVariant] = useState(variants[0]);

  useEffect(() => console.log('variant: ', variant), [variant]);


  // --------------------------------------------

  return (
    <section id="product" className={`${css.product} bg-orange-200`}>

      <div className="mb-4 border p-4">
        <h2>{title}</h2>
        <p>{body}</p>
        <p><strong>${price}</strong></p>


        <div className={css.radio_group}>

        { variants.map(({ id: variant_id, size, color }) => {


          return (
            <div
              key={`variant-${variant_id}`}
              onClick={() => {
                
                console.log('variant_id', variant_id);
                const new_variant = variants.find(item => item.id === variant_id);
                console.log('new_variant: ', new_variant);
                setVariant(new_variant);
              }}
              className={`${css.radio}  ${variant_id === variant.id ? `${css.active}` : ''}`}
            >
              <p>Size: {size}</p>
              <p>Color: {color}</p>
            </div>
            );
          })}
        </div>


        <div style={{background: 'red', height: '100px', width: '100px'}}>

          {JSON.stringify(variant)}
        </div>



        <Button onClick={() => addToCart(product, variant)}>Add to Cart</Button>
      </div>

      <button onClick={() => ctx.setState(prev => prev + 1)}>Context State: { ctx.state }</button>

    </section>
  );
};

// ==============================================
