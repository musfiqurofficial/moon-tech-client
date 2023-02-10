import React, { createContext, useContext, useEffect, useReducer } from "react";
import { actionType } from "../state/actionType";
import { initialState, productReducer } from "../state/productReducer";

const PRODUCT_CONTEXT = createContext();
const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState)

  console.log(state);

  useEffect(() => {
    dispatch({ type: actionType.FETCHING_START })
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => dispatch({ type: actionType.FETCHING_SUCCESS, payload: data })).catch(() => {
        dispatch({ type: actionType.FETCHING_ERROR })
      })
  }, []);
  const values = {
    state,
    dispatch
  };
  return (
    <PRODUCT_CONTEXT.Provider value={values}>
      {children}
    </PRODUCT_CONTEXT.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(PRODUCT_CONTEXT);
  return context;
};

export default ProductProvider;
