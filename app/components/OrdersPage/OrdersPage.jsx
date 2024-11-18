'use client';
import { useState, useEffect, useRef } from 'react';

import MenuBtn from '@/app/ui/MenuBtn/MenuBtn';
import c from './orders.module.css';
import axios from 'axios';
// import SSE from 'sse-client';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filledOrders, setFilledOrders] = useState([]);
  const retryInterval = useRef(1000); // Initial retry interval set to 1 second
  const eventSourceRef = useRef(null); // Store EventSource instance

  // Fetch all orders from the server when the component mounts
  useEffect(() => {
    async function fetchOrders() {
      // console.log('render initial fetch');
      try {
        const res = await axios.get('/api/ordersinitial');
        // Filter orders to get only items where `fulfilled` is false
        const unfilledOrders = res.data.orders
          .map((order) => {
            // Filter the items within each order to include only unfulfilled items
            const unfulfilledItems = order.orderDetails.filter(
              (item) => !item.fulfilled
            );
            // Return the order with only unfulfilled items
            return {
              ...order,
              orderDetails: unfulfilledItems,
            };
          })
          .filter((order) => order.orderDetails.length > 0);
        // ordersDetails.length > 0  will exclude the full order when items are all filled

        // console.log(unfilledOrders);
        setOrders(unfilledOrders);

        // // sets filled orders
        const filledOrders = res.data.orders
          .map((order) => {
            const filledOrders = order.orderDetails.filter(
              (item) => item.fulfilled
            );
            // console.log(filledOrders);
            return {
              ...order,
              orderDetails: filledOrders,
            };
          })
          .filter((order) => order.orderDetails.length > 0);
        // console.log(filledOrders);
        setFilledOrders(filledOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }

    fetchOrders(); // Fetch orders on page load

    // Initialize SSE for real-time order updates
    initializeSSE();

    // Clean up EventSource when component unmounts
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  const initializeSSE = () => {
    // Create a new EventSource connection for real-time updates
    eventSourceRef.current = new EventSource('/api/orders');

    // Handle incoming messages (order updates)
    eventSourceRef.current.onmessage = (event) => {
      const { order } = JSON.parse(event.data);

      if (!order) return;

      setOrders((prevOrders) => {
        return [...prevOrders, order];
      });
    };

    // Handle errors and attempt to reconnect
    eventSourceRef.current.onerror = () => {
      console.error('EventSource connection lost. Attempting to reconnect...');
      if (eventSourceRef.current.readyState !== EventSource.CLOSED) {
        eventSourceRef.current.close();
      }
      setTimeout(() => {
        retryInterval.current = Math.min(retryInterval.current * 2, 30000); // Cap at 30 seconds
        initializeSSE(); // Re-initialize EventSource connection
      }, retryInterval.current);
    };
  };

  // receives one order, a order can have multiple items or just one item
  async function handleCompletedOrders(order, _, itemId) {
    console.log(order);
    const unfulfilledItems = order.orderDetails.filter(
      (item) => !item.fulfilled
    );
    console.log('this is unfulfilleditems: ', unfulfilledItems);

    // if one order has multiple items
    if (unfulfilledItems.length > 0) {
      // If there are still unfulfilled items, handle as a multi-item order
      const updatedOrderDetails = order.orderDetails.map((item) =>
        item._id === itemId ? { ...item, fulfilled: true } : item
      );

      // Update the state for the order with the updated order details
      setOrders((prevOrders) =>
        prevOrders
          .map((prevOrder) =>
            prevOrder._id === order._id
              ? {
                  ...prevOrder,
                  orderDetails: updatedOrderDetails.filter(
                    (item) => !item.fulfilled
                  ), // Only unfulfilled items
                }
              : prevOrder
          )
          .filter((item) => !item.fulfilled)
      );

      await axios.patch('/api/updateorder', { orderId: order._id, itemId });

      // Find the specific item that was marked as fulfilled
      const filledItem = updatedOrderDetails.find(
        (item) => item._id === itemId
      );

      setFilledOrders((prevFilledOrders) => {
        const existingOrderIndex = prevFilledOrders.findIndex(
          (filledOrder) => filledOrder._id === order._id
        );

        if (existingOrderIndex > -1) {
          // Update the existing order in `filledOrders`
          const updatedFilledOrders = [...prevFilledOrders];
          updatedFilledOrders[existingOrderIndex] = {
            ...prevFilledOrders[existingOrderIndex],
            orderDetails: [
              ...prevFilledOrders[existingOrderIndex].orderDetails,
              filledItem,
            ],
          };
          return updatedFilledOrders;
        } else {
          // Add a new order with the fulfilled item
          return [
            ...prevFilledOrders,
            { ...order, orderDetails: [filledItem] },
          ];
        }
      });

      console.log('filedItem', filledItem); // Log the
    }
  }

  return (
    <>
      <MenuBtn />
      <div className={c.cont}>
        <h1>Pedidos</h1>
        <div className={c.headerRow}>
          <div className={c.headerItem}>Mesa</div>
          <div className={c.headerItem}>Quantidade</div>
          <div className={c.headerItem}>Status</div>
        </div>
        <div className={c.wrapper}>
          <div className={c.unfilled}>
            {orders.map((order, index) => {
              return (
                <div key={order._id} className={c.order}>
                  {order?.orderDetails?.map((item, index) => {
                    console.log(order.name);
                    return (
                      <div key={`${item._id}`} className={c.orderBlock}>
                        <div className={c.item}>
                          <span className={c.tableNumber}>
                            #{order.tableNumber}
                          </span>{' '}
                          <div className={c.imgCont}>
                            {item.img ? (
                              <img
                                className={c.img}
                                src={item.img}
                                aria-labelledby="product image"
                              />
                            ) : (
                              <span className={c.itemName}>
                                {item.itemName}
                              </span>
                            )}
                          </div>
                          {item.img ? (
                            <span className={c.itemName}>{item.itemName}</span>
                          ) : null}
                        </div>
                        <div className={c.itemQuantity}>{item.quantity}
                        <div className={c.name}>{order.name}</div>
                        </div>
                        
                        <div className={c.btnCont}>
                          <button
                            className={c.btn}
                            onClick={() =>
                              handleCompletedOrders(order, index, item._id)
                            }>
                            Pronto
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        <h2>Completas</h2>
        <div className={c.wrapper}>
          <div className={c.unfilled}>
            {filledOrders?.map((order, index) => {
              return (
                <div key={`${order._id}`} className={c.order}>
                  {order?.orderDetails?.map((item, index) => {
                    return (
                      <div
                        key={`${item._id}_${index}`}
                        className={c.orderBlock}>
                        <div className={c.item}>
                          <span className={c.tableNumber}>
                            #{order.tableNumber}
                          </span>{' '}
                          <div className={c.imgCont}>
                            {item.img ? (
                              <img
                                className={c.img}
                                src={item.img}
                                aria-labelledby="product image"
                              />
                            ) : (
                              <span className={c.itemName}>
                                {item.itemName}
                              </span>
                            )}
                          </div>
                          {item.img ? (
                            <span className={c.itemName}>{item.itemName}</span>
                          ) : null}
                        </div>
                        <div className={c.itemQuantity}>{item.quantity}</div>
                        <div className={c.btnCont}></div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
