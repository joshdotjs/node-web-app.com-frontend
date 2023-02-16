import { useState, useEffect, useContext, Fragment } from "react";

import CartContext from "context/cart-ctx";

import { authFetch, fetchGET2 } from "util/fetch";
import { lg, lr } from "util/log";

// ==============================================

export default function ModifyProduct() {

  // --------------------------------------------

  const { resetCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [selected_product, setSelectedProduct] = useState({ title: '', body: '', price: '' }); // choose from list, edit values, submit to update

  // --------------------------------------------
  
  const getProducts = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/products`;
    // const url = `${API_URL_LARAVEL}/api/products`;
    const [products, error] = await fetchGET2({ url });
    setProducts(products);
  };
  
  // --------------------------------------------

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    console.log('products: ', products);
  }, [products]);

  // --------------------------------------------

  const submitUpdate = async () => {

    // const url = `${process.env.NEXT_PUBLIC_API_URL}/api/products/${selected_product.id}`;
    // const url = `${API_URL_LARAVEL}/api/products/${selected_product.id}`;
    const url = `/api/products/${selected_product.id}`;
    const [data, error] = await authFetch({ 
      url: url, 
      method: 'PUT', 
      body: selected_product,
    });

    if (error) {
      alert('TODO: Unauthorized Notification...');
    }
    if (!error) {
      lg('SUCCESS');
      console.log('data: ', data);
      setProducts(data);
      resetCart(); // ensure no stale data in cart
    }

  };

  // --------------------------------------------

  const submitDelete = async () => {

    // const url = `${process.env.NEXT_PUBLIC_API_URL}/api/products/${selected_product.id}`;
    const url = `/api/products/${selected_product.id}`;
    const [data, error] = await authFetch({ 
      url: url, 
      method: 'DELETE', 
      body: selected_product,
    });

    if (error) {
      alert('TODO: Unauthorized Notification...');
    }
    if (!error) {
      lg('SUCCESS');
      console.log('data: ', data);
      setProducts(data);
      resetCart(); // ensure no stale data in cart
    }

  };

  // --------------------------------------------

  return (
    <>
      <h1 className="underline text-xl mb-4 text-orange-300">Update Product</h1>

      {products?.length > 0 && products.map((product) => {
        
        const { id, title, body, price } = product;

        const key = `product-${id}`;
        return (
          <Fragment key={key}>
            <div>
              <p>ID: {id}</p>
              <p>Title: {title}</p>
              <p>Body: {body}</p>
              <p>Price: {price}</p>

              <div 
                onClick={() => setSelectedProduct(product)}
                className={`
                inline 
                py-2  px-4
                cursor-pointer
                ${selected_product?.id === id ? 'bg-red-500' : ''}
              `}>Select</div>
            </div>

            <hr  className="my-2"/>
          </Fragment>
        );
      })}

      <label htmlFor="title"></label>
      <input 
        id="title" 
        onChange={(e) => setSelectedProduct(prev => ({ ...prev, title: e.target.value }))} 
        value={selected_product.title} 
      />

      <label htmlFor="body"></label>
      <input 
        id="body" 
        onChange={(e) => setSelectedProduct(prev => ({ ...prev, body: e.target.value }))} 
        value={selected_product.body} 
      />


      <label htmlFor="price"></label>
      <input 
        id="price" 
        type="number"
        onChange={(e) => setSelectedProduct(prev => ({ ...prev, price: Number(e.target.value) }))} 
        value={selected_product.price} 
      />



      <div onClick={submitUpdate} className="border inline py-2 px-4 cursor-pointer ml-4">Update</div>
      <div onClick={submitDelete} className="border inline py-2 px-4 cursor-pointer ml-4">Delete</div>
    </>
  );

  // --------------------------------------------
}

// ==============================================