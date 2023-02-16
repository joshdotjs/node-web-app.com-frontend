import { useState, useEffect } from "react";
import Link from "next/link";
// import Link from 'comps/link/link';

import Layout from "comps/_layout/layout";
import Button from "comps/button/button";

import { authFetch } from "util/fetch";
import { lg, lr } from "util/log";

// ==============================================

function Page() {

  // --------------------------------------------

  const [orders, setOrders] = useState([]);

  // --------------------------------------------
  
  const getOrders = async () => {

    const url = '/api/orders';
    const [data, error] = await authFetch({ url });
    // const [data, error] = await fetchGET2({ url });
    console.log('data: ', data);

    if (error) {
      alert('TODO: Unauthorized Notification...');
    }
    if (!error) {
      lg('SUCCESS');
      console.log('data: ', data);
      setOrders(data);
    }
  };
  
  // --------------------------------------------

  useEffect(() => {
    getOrders();
  }, []);

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
            <th></th>
          </tr>
        </thead>

        <tbody>

          { orders.length > 0 && orders.map(({ id, email, status, total, created_at }) => {

            const key = `order-${id}`;

            return (
              <tr key={key}>
                <th>{email}</th>
                <th>{created_at}</th>
                <th>{status}</th>
                <th>{total}</th>
                <th>
                  <Link href={{
                    pathname: '/admin/orders/[id]',
                    query: { id }
                  }}>
                    <Button>Details</Button>
                  </Link>
                </th>
              </tr>  
            );
          }) }

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