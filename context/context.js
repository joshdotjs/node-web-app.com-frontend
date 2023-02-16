import { useState, createContext } from 'react';

// ==============================================

const Context = createContext({
  state: null,
  setState: function() {},
});

// ==============================================

const ContextProvider = ({ children }) => {

  const [state, setState] = useState();

  const context = {
    state,
    setState,
  };

  return (
    <Context.Provider value={context}>{ children }</Context.Provider>
  );

};

// ==============================================

export default Context;
export { ContextProvider };