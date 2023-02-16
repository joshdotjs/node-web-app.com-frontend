import { useState, createContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import { getLS, setLS, removeLS } from 'util/local-storage';

// ==============================================

const AuthContext = createContext({
  user: {},
  setUser: () => {},
  token: '',
  setToken: () => {},
  logged_in: false,
  logOut: () => {},
  logIn: () => {},
});

// ==============================================

function AuthContextProvider ({ children, restrict }) {

  // --------------------------------------------

  const router = useRouter();

  // --------------------------------------------

  const [user, setUser]          = useState({});
  const [token, setToken]        = useState('');
  const [logged_in, setLoggedIn] = useState(false);
  
  // --------------------------------------------

  // -Load data from LS on page load
  useEffect(() => {
    const logged_in = getLS('logged_in');
    if (logged_in) {
      setLoggedIn(logged_in);
      setToken(getLS('token'));
      setUser(getLS('user'));
    }

    if (restrict) {
      const user = getLS('user');
      console.log('user?.is_admin: ', user?.is_admin);

      if (restrict === 'admin' && user?.is_admin !== true) { 
        router.replace('/auth/login');
      }
      if (restrict === 'user' && !user) { 
        router.replace('/auth/login'); 
      }
    }

  }, []);

  // --------------------------------------------

  const logIn = ({token, user}) => {

    console.log('logging user in (auth-ctx)');
    console.log('user: ', user);
    console.log('token: ', token);

    setToken(token);
    setLS('token', token);

    setUser(user);
    setLS('user', {...user, is_admin: !!user?.is_admin}); // mysql 1 => true

    setLoggedIn(true);
    setLS('logged_in', true);

    if (user?.is_admin)
      router.push('/admin');
    else
      router.push('/user');
  };

  // --------------------------------------------
  
  const logOut = () => {
    setToken(null);
    removeLS('token');

    setUser(user);
    removeLS('user');

    setLoggedIn(false);
    removeLS('logged_in');

    router.replace('/');
  };
  
  // --------------------------------------------
  
  const context = {
    user,
    token,
    logged_in,
    logIn,
    logOut,
  };
  
  // --------------------------------------------
  
  return (
    <AuthContext.Provider value={context}>{ children }</AuthContext.Provider>
  );
  
  // --------------------------------------------

}

// ==============================================

export default AuthContext;
export { AuthContextProvider };