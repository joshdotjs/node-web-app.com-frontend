import { useState, useEffect } from "react";
import Link from "next/link";

import Layout from "comps/_layout/layout";
import Button from "comps/button/button";

import { fetchGET2, authFetch } from "util/fetch";
import { lg, lr } from "util/log";
import { getLS } from "util/local-storage";

// ==============================================

function Page() {

  // --------------------------------------------

  const user = getLS('user');
  const [orders, setOrders] = useState([]);

  // --------------------------------------------
  
  const getOrders = async () => {

    // const url = `${process.env.NEXT_PUBLIC_API_URL}/api/orders/user/${user.id}`;
    const url = `/api/orders/user/${user?.id}`;
    const [data, error] = await authFetch({ url });
    // const [data, error] = await fetchGET2({ url });
    console.log('data: ', data);

    if (error) {
      lr('TODO: Unauthorized Notification...');
    }
    if (!error) {
      lg('SUCCESS');
      console.log('data: ', data);
      setOrders(data);
    }
  };
  
  // --------------------------------------------

  useEffect(() => {

    console.log('orders.jsx -- user_id: ', user.id);
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
    <Layout name="user--orders" restrict="user">
      <Page />
    </Layout>
  );
}

// ==============================================