import { useState, useEffect, Fragment } from "react";


import Layout from "comps/_layout/layout";
 import { authFetch } from "util/fetch";
import { getLS } from "util/local-storage";
import { lg, lr } from "util/log";

// ==============================================

function Page() {

  // --------------------------------------------

  const [users, setUsers] = useState([]);

  // --------------------------------------------

  const getUsers = async () => {
    
    // const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users`;
    const url = '/api/users';
    const [data, error] = await authFetch({ url });
    console.log('data: ', data);

    if (error) {
      alert('TODO: Unauthorized Notification...');
    }
    if (!error) {
      const { users } = data;
      lg('SUCCESS');
      setUsers(users);
    }

  };

  // --------------------------------------------

  useEffect(() => {
    getUsers();
  }, []);

  // --------------------------------------------

  return (
    <>
      <h1>/admin/users</h1>

      <ul>
        { users.length > 0 && users.map(({id, email, password, is_admin}) => {
          const key = `user-${id}`;
          return (
            <Fragment key={key}>
              <li>
                <p>ID: {id}</p>
                <p>email: {email}</p>
                <p>Is Admin? {JSON.stringify(is_admin)}</p>
              </li>

              <hr />
            </Fragment>
          );
        }) }
      </ul>
    </>
  );

  // --------------------------------------------
}

// ==============================================

export default function Root() {

  // --------------------------------------------

  return(
    <Layout name="admin--users" restrict="admin">
      <Page />
    </Layout>
  );
}

// ==============================================