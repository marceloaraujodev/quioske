'use client'
import { createContext, useState, useContext, useEffect } from 'react';


const OrderContext = createContext();

export const OrderProvider = ({children}) => {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  useEffect(() => {console.log('this is orders and is orders placed from orderContext,', orders, isOrderPlaced)}, [orders, isOrderPlaced])
  
  const addOrder = (newOrder) => {
    setOrders((prevOrders) => [...prevOrders, ...newOrder]);
    setIsOrderPlaced(true);
  };
  
  const updateOneItemOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.filter((prevOrder) => prevOrder._id !== orderId)
  );
  setIsOrderPlaced(true);

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
  const resetOrderFlag = () => {
    setIsOrderPlaced(false); // Reset flag after fetch
  };
  const resetOrders = () => {
    setOrders(() => []);
  };

  return <OrderContext.Provider value={{
    orders, 
    setOrders,
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