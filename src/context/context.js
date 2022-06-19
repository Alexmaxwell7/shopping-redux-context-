import { createContext, useContext, useReducer } from "react";
import { cartReducer } from "./contextreducer";
import { useSelector, useDispatch } from "react-redux";
const Cart = createContext();

const Context = ({ children }) => {
    const items = useSelector((state) => state.allitems.items);
  console.log("context", items);
  const [state, dispatchcart] = useReducer(cartReducer, {
    products: items,
    cart: [],
  });


  return (
    <Cart.Provider value={{ state, dispatchcart }}>
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => {
  return useContext(Cart);
};

export default Context;