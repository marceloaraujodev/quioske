'use client'
import { createContext, useState, useContext } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({children}) => {
  const [orders, setOrders] = useState([]);

  const addOrder = (newOrder) => {
    setOrders(newOrder);
  };

  const resetOrders = () => {
    setOrders([]);
  };

  return <OrderContext.Provider value={{orders, addOrder, resetOrders}}>
    {children}
  </OrderContext.Provider>
}

export const useOrderContext = () => {
  return useContext(OrderContext);
}