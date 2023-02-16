import { useState, useEffect, Fragment } from "react";


import Layout from "comps/_layout/layout";
 import { authFetch } from "util/fetch";
import { getLS } from "util/local-storage";
import { lg, lr } from "util/log";

// ==============================================

function Page() {

  // --------------------------------------------

  const [user, setUser] = useState([]);

  // --------------------------------------------

  const getUser = async () => {
    
    // -get the user id from local storage:
    const user = getLS('user');
    console.log('getUser() - user: ', user);

    // const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users/1`; // id = 1: josh@josh.com
    const url = `/api/users/${user?.id}`; // id = 1: josh@josh.com
    const [data, error] = await authFetch({ url });
    console.log('data: ', data);

    if (error) {
      lr('TODO: Display Unauthorized Notification...');
      console.warn('error message from backend: ', error);
    }
    if (!error) {
      const { user } = data;
      lg('SUCCESS');
      setUser(user);
    }

  };

  // --------------------------------------------

  useEffect(() => {
    getUser();
  }, []);

  // --------------------------------------------

  return (
    <>
      <h1>/admin/users</h1>

      <ul>

        <li>
          <p>ID: {user?.id}</p>
          <p>email: {user?.email}</p>
          <p>Is Admin? {JSON.stringify(user?.is_admin)}</p>
        </li>
      </ul>
    </>
  );

  // --------------------------------------------
}

// ==============================================

export default function Root() {

  // --------------------------------------------

  return(
    <Layout name="user" restrict="user">
      <Page />
    </Layout>
  );
}

// ==============================================