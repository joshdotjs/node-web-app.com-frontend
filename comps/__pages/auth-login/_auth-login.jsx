import { useEffect, useRef, useContext } from 'react';

import AuthContext from 'context/auth-ctx';

import Button from 'comps/button/button';

import { lr, lg } from 'util/log';
import { fetchPOST2 } from 'util/fetch';

// import '.scss';

// ==============================================

export default function AuthLogin () {

  const { logIn } = useContext(AuthContext);

  // --------------------------------------------

  const email_ref = useRef(null);
  const password_ref = useRef(null);

  useEffect(() => {
    email_ref.current.value = 'josh@josh.com';
    password_ref.current.value = 'josh';
  }, []);

  // --------------------------------------------

  const handler = async () => {
    const email = email_ref.current.value;
    const password = password_ref.current.value;

    // const [data, error] = await fetchPOST2({ url: 'http://127.0.0.1:8000/api/login', 
    // const url = `${API_URL}/api/login`;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`;
    const [data, error] = await fetchPOST2({ url, 
      body: {
        email,
        password,
      }
    });

    if (error) {
      lr('ERROR');
    }
    if (!error) {
      // const { user, token } = JSON.parse(data);
      const { user, token } = data;
      lg('SUCCESS');
      console.log('user: ', user);
      console.log('token: ', token);
      logIn({ user, token });
    }

  };

  // --------------------------------------------

  return (
    <>
      <h2>Auth Login Page</h2>

      <label htmlFor="email">Email: </label>
      <input id="email" ref={email_ref} />

      <label htmlFor="password">Password: </label>
      <input id="password" ref={password_ref} />

      <Button onClick={handler}>Submit</Button>
    </>
  );
};

// ==============================================
