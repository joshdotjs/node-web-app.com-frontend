import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Link from "next/link";

import Layout from "comps/_layout/layout";
import Button from "comps/button/button";

import { fetchGET2, authFetch } from "util/fetch";
import { lg, lr } from "util/log";

// ==============================================

function Page() {

  // --------------------------------------------

  const router = useRouter();
  const { isReady: is_ready, query } = router;

  console.log('router: ', router);

  // --------------------------------------------

  const [order, setOrder] = useState({ id: null, email: null, total: null, status: null, created_at: null, products: [] });

  // --------------------------------------------
  
  const getOrder = async () => {

    // const url = `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${query.id}`;
    const url = `/api/orders/${query.id}`;
    const [data, error] = await authFetch({ url });
    // const [data, error] = await fetchGET2({ url });
    console.log('data: ', data);

    if (error) {
      // alert('TODO: Unauthorized Notification...');
    }
    if (!error) {
      lg('SUCCESS');
      console.log('data: ', data);

      const { order, products } = data;
      const { id, email, total, status, created_at } = order;

      setOrder({ id, email, total, status, created_at, products });
    }
  };
  
  // --------------------------------------------

  useEffect(() => {
    if (is_ready)
      getOrder();
  }, [is_ready]);

  // --------------------------------------------

  return (
    <>

      <table className="border-separate border-spacing-2 border border-slate-500 ">
        <thead>
          <tr>
            <th>User</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>

          </tr>
        </thead>

        <tbody>

          <tr>
            <th>{order.email}</th>
            <th>{order.created_at}</th>
            <th>{order.status}</th>
            <th>{order.total}</th>

          </tr>  

        </tbody>
      </table>


      <table className="border-separate border-spacing-2 border border-slate-500 ">
        
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Variant ID</th>
            <th>Product</th>
            <th>Price</th>
            <th>Body</th>
            <th>Size</th>
            <th>Color</th>
            <th>Qty</th>
            <th></th>
          </tr>
        </thead>

        <tbody>

          {order.products.length > 0 && order.products.map(({ variant_id: id, product_id, title, body, price, qty, size, color }) => {

            const key = `product-${id}`;

            return (
              <tr key={key}>
                <th>{product_id}</th>
                <th>{id}</th>
                <th>{title}</th>
                <th>{price}</th>
                <th>{body}</th>
                <th>{size}</th>
                <th>{color}</th>
                <th>{qty}</th>
                <th>
                  {/* <Link href={{
                    pathname: '/store/product/[id]',
                    query: { id: product_id }
                  }}> */}
                  <Link href={`/store/product/${id}`}>
                    <Button>Details</Button>
                  </Link>
                </th>
              </tr>  
            );
          })}


        </tbody>
      </table>

    </>
  );

  // --------------------------------------------
}

// ==============================================

export default function Root() {

  // --------------------------------------------

  return(
    <Layout name="admin--orders" restrict="admin">
      <Page />
    </Layout>
  );
}

// ==============================================