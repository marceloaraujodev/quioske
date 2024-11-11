'use client'
import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const OrderContext = createContext();

export const OrderProvider = ({children}) => {
  const [orders, setOrders] = useState([]);
  const [ordersUpdated, setOrdersUpdated] = useState(false);
  const [ordersToFill, setOrdersToFill] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const res = await axios.get('/api/orders');
  //       setOrders(res.data.orders);
  //     } catch (error) {
  //       console.error('Failed to fetch orders:', error);
  //     }
  //   };
  //   fetchOrders(); // Only fetch orders once on mount
  // }, []);

  const addOrder = (newOrder) => {
    setOrders(newOrder);
  };

  const updateOneItemOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.filter((prevOrder) => prevOrder._id !== orderId)
    );
  }

  const updateMultipleItemsOrder = (orderId, updatedOrderDetails) => {
    setOrders((prevOrders) =>
      prevOrders.map((prevOrder) =>
        // updates order details to remove item for multiple items orders
        prevOrder._id === orderId
          ? { ...prevOrder, orderDetails: updatedOrderDetails }
          : prevOrder
      )
    );
  }

  const resetOrders = () => {
    setOrders([]);
  };

  return <OrderContext.Provider value={{
    orders, 
    addOrder, 
    resetOrders,
    isModalOpen,
    setIsModalOpen,
    updateOneItemOrder,
    updateMultipleItemsOrder,
  }}>
    {children}
  </OrderContext.Provider>
}

export const useOrderContext = () => {
  return useContext(OrderContext);
}