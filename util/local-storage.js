// ==============================================

const getLS = (key /*: string */) => {

  if (typeof window === "undefined") { // we're on the server
    return;
  } else {
    const x = localStorage.getItem(key);
    // console.log('x: ', x);
    if (x) {
      return JSON.parse(x);
    } else {
      return x;
    }
  }

};

// ==============================================

const setLS = (key, value /*: string, object */) => localStorage.setItem(key, JSON.stringify(value));

// ==============================================

const removeLS = (key /*: string */) => localStorage.removeItem(key);

// ==============================================

const getCartLS = () => getLS('cart');
const setCartLS = (cart) => setLS('cart', cart);

// ==============================================

// -Not using local storage at all for auth - using PHP SSR with cookies sent with each request
// const setLoggedInLS = (x) => setLS('logged_in', x);
// const getLoggedInLS = (x) => getLS('logged_in');

// ==============================================

// const getFiltersLS = () => getLS('filters');
// const setFiltersLS = ({ department, tag, category }) => {
//   setLS('filters', { department, tag, category });
// };

// ==============================================

export { 
  getLS, setLS, removeLS,
  getCartLS, setCartLS, 
  // getFiltersLS, setFiltersLS
 };