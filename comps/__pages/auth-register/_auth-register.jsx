import { useState, useRef, useContext } from 'react';
import { useRouter } from 'next/router';

import Button from 'comps/button/button';

import { lr, lg } from 'util/log';
import { fetchPOST2 } from 'util/fetch';

// import '.scss';

// ==============================================

export default function AuthRegister () {

  // --------------------------------------------

  const router = useRouter();

  // --------------------------------------------


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [is_admin, setIsAdmin] = useState(false);

  // --------------------------------------------

  const handler = async () => {

    // const [data, error] = await fetchPOST2({ url: 'http://127.0.0.1:8000/api/login', 
    // const url = `${API_URL}/api/login`;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`;
    const [data, error] = await fetchPOST2({ url, 
      body: {
        email,
        password,
        is_admin,
      }
    });

    if (error) {
      lr('ERROR');
    }
    if (!error) {
      // const { user, token } = JSON.parse(data);
      const { status, user, token } = data;
      
      if (status === 'success') {
        lg('SUCCESS');
        router.push('/auth/login');
      } else {
        lr('Invalid registration...');
      }
    }

  };

  // --------------------------------------------

  return (
    <>
      <h2>Auth Register Page</h2>

      <label htmlFor="email">Email: </label>
      <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label htmlFor="password">Password: </label>
      <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        
      <div 
        style={{ background: is_admin ? 'red' : 'transparent', padding: '0.5rem 1rem', border: 'solid 1px black', display: 'inline-block', cursor: 'pointer'}}
        onClick={() => {
          setIsAdmin(prev => !prev);
        }}
      >
        Is Admin?
      </div>


      
      <Button onClick={handler} disabled={email.length === 0 || password.length === 0}>Submit</Button>
    </>
  );
};

// ==============================================
