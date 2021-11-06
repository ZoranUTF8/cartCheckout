import React, { useState, useContext, useReducer, useEffect } from "react";
import cartItems from "./data";
import reducer from "./reducer";

const url = "https://course-api.com/react-useReducer-cart-project";
const AppContext = React.createContext();

const initialState = {
  //! starting state
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //! clear cart function
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };
  //! remove single item
  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };
  //! increase amount
  const increase = (id) => {
    dispatch({ type: "INCREASE", payload: id });
  };
  //! decrease amount
  const decrease = (id) => {
    dispatch({ type: "DECREASE", payload: id });
  };
  //! fetch API data and send to reducer.js
  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    const response = await fetch(url);
    const cartData = await response.json();
    dispatch({ type: "DISPLAY_ITEMS", payload: cartData });
  };
 //! toogle amount function
 const toggleAmount = (id, type) => {
  dispatch({ type: "TOGGLE_AMOUNT", payload: { id, type } });
};


  //? on render fetch the data
  useEffect(() => {
    fetchData();
  }, []);

 
  //! whenever the cart changes we rerender and get the total amount and price
  useEffect(() => {
    dispatch({ type: "GET_TOTAL" });
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increase,
        decrease,
        toggleAmount
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
