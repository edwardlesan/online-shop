import { createContext, useReducer, useState } from "react";

export const Cartcontext = createContext();

export const Context = (props) => {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD":
        const tempState = state.filter((item) => action.payload.id === item.id);
        console.log("state:", state, "action", action);

        if (tempState.length > 0) {
          return state;
        } else {
          const newPayload = {
            ...action.payload,
            quantity: action.quantity ? action.quantity : 1,
          };
          return [...state, newPayload];
        }

      case "INCREASE":
        const tempState1 = state.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
        return tempState1;

      case "DECREASE":
        const tempState2 = state.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
        return tempState2;

      case "REMOVE":
        const tempState3 = state.filter(
          (item) => item.id !== action.payload.id
        );
        return tempState3;
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, []);
  const info = { state, dispatch };

  console.log("+++++++++", state);

  return (
    <Cartcontext.Provider value={{ ...info, totalQuantity, setTotalQuantity }}>
      {props.children}
    </Cartcontext.Provider>
  );
};
