"use client";
import { useState, useEffect } from "react";
import c from "./orders.module.css";
import axios from "axios";
// import SSE from 'sse-client';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  const [sseConnected, setSseConnected] = useState(false);

  // Fetch orders function
  const fetchOrders = async () => {
    try {
      const res = await axios.get("/api/orders");
      setOrders(res.data.orders);
      console.log('Orders fetched:', res.data.orders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders(); // Initial fetch

    // SSE for real-time order updates
    const eventSourceUpdates = new EventSource("/api/orders/updates");

    eventSourceUpdates.onopen = () => {
      console.log("SSE connection established for order updates");
      setSseConnected(true);
    };

    eventSourceUpdates.onmessage = (event) => {
      const newOrder = JSON.parse(event.data);
      console.log("New order update received:", newOrder);
      setOrders((prevOrders) => [...prevOrders, newOrder]);
    };

    eventSourceUpdates.onerror = (error) => {
      console.error("SSE connection error:", error);
      setSseConnected(false);
      eventSourceUpdates.close();
    };

    return () => {
      eventSourceUpdates.close();
      console.log("Closing SSE connection");
    };
  }, []);

  // Polling mechanism to ensure order updates
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("Polling for orders...");
      fetchOrders();
    }, 10000); // Poll every 10 seconds

    return () => clearInterval(intervalId);
  }, []);


 
  // // working Fetch orders initially when component mounts
  // useEffect(() => {
  //     const fetchOrders = async () => {
  //       try {
  //         const res = await axios.get("/api/orders");
  //         setOrders(res.data.orders);
  //       } catch (error) {
  //         console.error("Failed to fetch orders:", error);
  //       }
  //     };

  //   fetchOrders(); // Fetch initial orders

  //   // Set up Server-Sent Events (SSE) connection
  //   const eventSource = new EventSource("/api/orders/updates");

  //   // if (orders.length === 0) {
  //   //   setOrders([]); // Set an empty array for initial state
  //   // }

  //   eventSource.onmessage = (event) => {
  //     const newOrder = JSON.parse(event.data);
  //     console.log("New order received:", newOrder);

  //     // Update orders with the new order received via SSE
  //     setOrders((prevOrders) => [...prevOrders, newOrder]);
  //   };

  //   eventSource.onerror = (error) => {
  //     console.error("SSE connection error:", error);
  //     eventSource.close();
  //   };

  //   // Ensure that even if there are no orders initially, the listener is still active
  //   eventSource.onopen = () => {
  //       console.log("SSE connection established");
  //     };
    
  //     // Cleanup on unmount
  //     return () => eventSource.close();
  // }, []);

    

  // receives one order, a order can have multiple items or just one item
  async function handleCompletedOrders(order, index, itemId) {
    console.log(order, index);

    // if order has multiple items
    if (order.orderDetails.length > 1) {
      console.log(itemId);
      const updatedOrderDetails = order.orderDetails.filter((item) => item._id !== itemId);
      console.log(updatedOrderDetails.length);

      await axios.patch("/api/updateorder", {
        orderId: order._id,
        orderDetails: updatedOrderDetails,
      });

      // update state for multiple items order
      setOrders((prevOrders) =>
        prevOrders.map((prevOrder) =>
          // updates order details to remove item for multiple items orders
          prevOrder._id === order._id
            ? { ...prevOrder, orderDetails: updatedOrderDetails }
            : prevOrder
        )
      );
    } else {
      console.log(order._id);
      const orderId = order._id;
      await axios.delete(`/api/deleteorder?orderId=${orderId}`);

      // update state if order only has one item
      setOrders((prevOrders) =>
        prevOrders.filter((prevOrder) => prevOrder._id !== orderId)
    );
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
            {orders && orders.map((order, index) => {
              return (
                <div key={order._id} className={c.order}>
                  {order.orderDetails.map((item, index) => {
                    return (
                      <div key={`${item._id}_${index}`} className={c.orderBlock}>
                        <div className={c.item}>
                          <span className={c.tableNumber}>#{order.tableNumber}</span>{" "}
                          <div className={c.imgCont}>
                            &nbsp;
                            {item.img ? (
                              <img className={c.img} src={item.img} aria-labelledby="product image" />
                            ) : (
                              <span className={c.itemName}>{item.itemName}</span>
                            )}
                          </div>
                          {item.img ? <span className={c.itemName}>{item.itemName}</span> : null}
                        </div>
                        <div className={c.itemQuantity}>{item.quantity}</div>
                        <div className={c.btnCont}>
                          <button className={c.btn} onClick={() => handleCompletedOrders(order, index, item._id)}>
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
      </div>

      {/* <h2>Completas</h2>
      <div className={c.wrapper}>
        <div className={c.filled}>
          {filledOrders.map((order, index) => {
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
        </div>
      </div> */}
    </>
  );
}


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