'use client'
import { createContext, useState, useContext, useEffect } from 'react';


const OrderContext = createContext();

export const OrderProvider = ({children}) => {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [triggerRefresh, setTriggerRefresh] = useState(false);

  useEffect(() => {
    console.log('triggerRefreshed ...', triggerRefresh);
  }, [triggerRefresh]);


  const addOrder = (newOrder) => {
    setOrders((prevOrders) => [...prevOrders, ...newOrder]);
    // setTriggerRefresh(true);
  };

  const updateOneItemOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.filter((prevOrder) => prevOrder._id !== orderId)
    );
    // setTriggerRefresh(true);
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
    // setTriggerRefresh(true);
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
    setTriggerRefresh,
    triggerRefresh,
  }}>
    {children}
  </OrderContext.Provider>
}

export const useOrderContext = () => {
  return useContext(OrderContext);
}