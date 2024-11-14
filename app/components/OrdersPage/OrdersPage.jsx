"use client";
import { useState, useEffect, useRef } from "react";
import c from "./orders.module.css";
import axios from "axios";
// import SSE from 'sse-client';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const retryInterval = useRef(1000); // Initial retry interval set to 1 second
  const eventSourceRef = useRef(null); // Store EventSource instance

 // Fetch all orders from the server when the component mounts
 useEffect(() => {
  async function fetchOrders() {
    try {
      const res = await axios.get("/api/ordersinitial"); 
      // console.log("Orders fetched:", res.data);
      setOrders(res.data.orders); // Set fetched orders to the state
    } catch (error) {
      console.error("Error fetching orders:", error);
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
  eventSourceRef.current = new EventSource("/api/orders");

  // Handle incoming messages (order updates)
  eventSourceRef.current.onmessage = (event) => {
    const { order } = JSON.parse(event.data);

    if(!order) return

    setOrders((prevOrders) => {
      return [...prevOrders, order];
    })
  };

  // Handle errors and attempt to reconnect
  eventSourceRef.current.onerror = () => {
    console.error("EventSource connection lost. Attempting to reconnect...");
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
            {orders.map((order, index) => {
              return (
                <div key={order._id} className={c.order}>
                  {order?.orderDetails?.map((item, index) => {
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