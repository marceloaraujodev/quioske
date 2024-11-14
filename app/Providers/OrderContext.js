'use client'
import { createContext, useState, useContext, useEffect } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({children}) => {
  // const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // const addOrder = (newOrder) => {
  //   setOrders((prevOrders) => [...prevOrders, ...newOrder]);
  //   console.log(orders);
  // };
  
  // const updateOneItemOrder = (orderId) => {
  //   setOrders((prevOrders) =>
  //     prevOrders.filter((prevOrder) => prevOrder._id !== orderId)
  // );

  // }

  // const updateMultipleItemsOrder = (orderId, updatedOrderDetails) => {
  //   setOrders((prevOrders) =>
  //     prevOrders.map((prevOrder) =>
  //       // updates order details to remove item for multiple items orders
  //       prevOrder._id === orderId
  //         ? { ...prevOrder, orderDetails: updatedOrderDetails }
  //         : prevOrder
  //     )
  //   );

  // }

  // const resetOrders = () => {
  //   setOrders(() => []);
  // };

  return <OrderContext.Provider value={{
    // orders, 
    // setOrders,
    // addOrder, 
    // resetOrders,
    // updateOneItemOrder,
    // updateMultipleItemsOrder,
    isModalOpen,
    setIsModalOpen,
  }}>
    {children}
  </OrderContext.Provider>
}

export const useOrderContext = () => {
  return useContext(OrderContext);
}