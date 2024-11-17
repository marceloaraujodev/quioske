'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
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
      try {
        const res = await axios.get('/api/ordersinitial');
      // Filter orders to get only items where `fulfilled` is false
      const unfilledOrders = res.data.orders.map((order) => {
        // Filter the items within each order to include only unfulfilled items
        const unfulfilledItems = order.orderDetails.filter(item => !item.fulfilled);
        // Return the order with only unfulfilled items
        return {
          ...order,
          orderDetails: unfulfilledItems
        };
      }).filter(order => order.orderDetails.length > 0); 
      // ordersDetails.length > 0  will exclude the full order when items are all filled

        // console.log(unfilledOrders);
        setOrders(unfilledOrders);

        // // sets filled orders
        const filledOrders = res.data.orders.map((order) => {
          const filledOrders = order.orderDetails.filter((item) => item.fulfilled)
          console.log(filledOrders);
          return {
            ...order,
            orderDetails: filledOrders
          }
        }
          
        ).filter(order => order.orderDetails.length > 0)
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

  useEffect(() => {
    console.log(filledOrders);
  }, []);

  // receives one order, a order can have multiple items or just one item
  async function handleCompletedOrders(order, _, itemId) {
    // if order has multiple items, more than one
    if (order.orderDetails.length > 1) {
      const updatedOrderDetails = order.orderDetails.map((item) =>
        item._id === itemId ? { ...item, fulfilled: true } : item
      );

      console.log(updatedOrderDetails); // Log updated order details

      await axios.patch('/api/updateorder', { orderId: order._id, itemId });

      // Update the state for the order with the updated order details
      setOrders((prevOrders) =>
        prevOrders.map((prevOrder) =>
          prevOrder._id === order._id
            ? { ...prevOrder, orderDetails: updatedOrderDetails } // Keep unfilled items
            : prevOrder
        )
      );

      console.log(orders); // Log updated orders

      // Find the specific item that was marked as fulfilled
      const filledItem = updatedOrderDetails.find(
        (item) => item._id === itemId
      );

      // This has to be changed to fix the same key issues
      setFilledOrders((prevFilledOrders) => [
        ...prevFilledOrders,
        { ...order, orderDetails: [filledItem] },  // Add only the fulfilled item
      ]);

      console.log('filedItem', filledItem); // Log the
    } else {
      // console.log(order._id);
      const orderId = order._id;
      await axios.patch(`/api/updateorder`, {
        orderId,
        itemId,
      });

      // update state if order only has one item
      setOrders((prevOrders) =>
        prevOrders.filter((prevOrder) => prevOrder._id !== orderId)
      );

      setFilledOrders((prevFilledOrders) => [...prevFilledOrders, order]); // have to check if the order has multiple items
    }
  }

  return (
    <>
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
              // Debugging the order details
              order.orderDetails.forEach(item => {
                console.log(item._id); // Log the key for debugging
              });
              return (
                <div key={order._id} className={c.order}>
                  {order?.orderDetails?.map((item, index) => {
                    return (
                      <div
                        key={`${item._id}`}
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

        <div className={c.linkCont}>
          <Link className={`btnLink`} href="/vendor">
            Menu
          </Link>
        </div>

        <h2>Completas</h2>
        <div className={c.wrapper}>
          <div className={c.unfilled}>
            {filledOrders.map((order, index) => {
              // console.log(order)
              
              return (
                <div key={`${order._id} filled`} className={c.order}>
                  {order?.orderDetails?.map((item, index) => {
                    return (
                      <div
                        key={`${item._id}_${index}filled`}
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
                        <div className={c.btnCont}>
                          {/* <button className={c.btn} onClick={() => handleCompletedOrders(order, index, item._id)}>
                            Pronto
                            </button> */}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          {/* <div className={c.filled}>
          {filledOrders.map((order, index) => {
            console.log(order);
            return (
              <div key={index} className={`${c.order} ${c.finished}`}>
              <div className={c.orderBlock}>
              <div className={c.item}>
              <div className={c.item}>{order.order}</div>
              </div>
              <div className={c.item}>
              <button className={`${c.btn} ${c.btnFinished}`}>Pronta</button>
              </div>
              </div>
              </div>
              );
              })}
              </div> */}
        </div>
      </div>
    </>
  );
}

// // Pooling mechanism
//  // Fetch orders function
//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get("/api/orders");
//       setOrders(res.data.orders);
//       console.log('Orders fetched:', res.data.orders);
//     } catch (error) {
//       console.error("Failed to fetch orders:", error);
//     }
//   };

//    // Polling mechanism to ensure order updates
//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       console.log("Polling for orders...");
//       fetchOrders();
//     }, 10000); // Poll every 10 seconds

//     return () => clearInterval(intervalId);
//   }, []);

//-----------------------------

// // second working option

// useEffect(() => {
//   let eventSource;

//   const setupSSE = () => {
//     console.log('Setting up SSE connection');
//     eventSource = new EventSource('/api/orders/updates');

//     eventSource.onopen = () => {
//       console.log('SSE connection established');
//     };

//     eventSource.onmessage = (event) => {
//       console.log("New order received via SSE:", event.data);
//       if (event.data) {
//         try {
//           const newOrder = JSON.parse(event.data);
//           setOrders(prevOrders => {
//             // Check if the order already exists
//             const orderExists = prevOrders.some(order => order._id === newOrder._id);
//             if (!orderExists) {
//               return [...prevOrders, newOrder];
//             }
//             return prevOrders;
//           });
//         } catch (error) {
//           console.error("Error parsing SSE data:", error);
//         }
//       }
//     };

//     eventSource.onerror = (error) => {
//       console.error("SSE error:", error);
//       // Attempt to reconnect after a delay
//       setTimeout(() => {
//         eventSource.close();
//         setupSSE();
//       }, 5000);
//     };
//   };

//   const fetchInitialOrders = async () => {
//     try {
//       const res = await axios.get("/api/orders");
//       const initialOrders = res.data.orders || [];
//       console.log("Initial orders fetched:", initialOrders);
//       setOrders(initialOrders);
//     } catch (error) {
//       console.error("Failed to fetch orders:", error);
//     }
//   };

//   // First fetch initial orders
//   fetchInitialOrders().then(() => {
//     // Then set up SSE after initial fetch is complete
//     setupSSE();
//   });

//   // Cleanup
//   return () => {
//     if (eventSource) {
//       console.log('Closing SSE connection');
//       eventSource.close();
//     }
//   };
// }, []); // Empty dependency array
