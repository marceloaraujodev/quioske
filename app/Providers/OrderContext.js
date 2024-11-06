'use client'
import { createContext, useState, useContext } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({children}) => {
  const [orders, setOrders] = useState([]);
  const [ordersToFill, setOrdersToFill] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addOrder = (newOrder) => {
    setOrders(newOrder);
  };

  const resetOrders = () => {
    setOrders([]);
  };

  return <OrderContext.Provider value={{
    orders, 
    addOrder, 
    resetOrders,
    isModalOpen,
    setIsModalOpen,
  }}>
    {children}
  </OrderContext.Provider>
}

export const useOrderContext = () => {
  return useContext(OrderContext);
}