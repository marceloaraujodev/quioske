
'use client'
import OrdersPage from "@/app/components/OrdersPage/OrdersPage";

export default function page() {
  return (
    <OrdersPage />
  )
}




















// "use client";
// import { useState, useEffect } from "react";
// import { useOrderContext } from "../../Providers/OrderContext";
// import c from "./orders.module.css";
// import axios from "axios";
// // import SSE from 'sse-client';

// export default function OrdersPage() {
//   const [orders, setOrders] = useState(null);
//   console.log('Component mounted');


//   // working Fetch orders initially when component mounts
//   // useEffect(() => {
//   //   const fetchOrders = async () => {
//   //     try {
//   //       const res = await axios.get("/api/orders");
//   //       setOrders(res.data.orders);
//   //     } catch (error) {
//   //       console.error("Failed to fetch orders:", error);
//   //     }
//   //   };

//   //   fetchOrders(); // Fetch initial orders

//   //   // Set up Server-Sent Events (SSE) connection
//   //   const eventSource = new EventSource("/api/orders/updates");

//   //   // if (orders.length === 0) {
//   //   //   setOrders([]); // Set an empty array for initial state
//   //   // }

//   //   eventSource.onmessage = (event) => {
//   //     const newOrder = JSON.parse(event.data);
//   //     console.log("New order received:", newOrder);

//   //     // Update orders with the new order received via SSE
//   //     setOrders((prevOrders) => [...prevOrders, newOrder]);
//   //   };

//   //   eventSource.onerror = (error) => {
//   //     console.error("SSE connection error:", error);
//   //     eventSource.close();
//   //   };

//   //   // Ensure that even if there are no orders initially, the listener is still active
//   //   eventSource.onopen = () => {
//   //     console.log("SSE connection established");
//   //   };

//   //   // Cleanup on unmount
//   //   return () => eventSource.close();
//   // }, []);

// // Set up EventSource to listen for updates (this should run immediately on mount)
// useEffect(() => {
//   console.log('eventSource started')
//   const eventSource = new EventSource('/api/orders/updates');
//   eventSource.onmessage = (event) => {
//     const newOrder = JSON.parse(event.data);
//     console.log("New order received:", newOrder);
//     setOrders((prevOrders) => {
//       // Add new order to the state
//       return [...prevOrders, newOrder];
//     });
//   };

//   eventSource.onerror = (error) => {
//     console.error("SSE error:", error);
//     eventSource.close();
//   };

//   // Cleanup on unmount
//   return () => {
//     eventSource.close();
//   };
// }, []);

// // Fetch orders initially when the component mounts (this will run after EventSource is set up)
// useEffect(() => {
//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get("/api/orders");
//       // Set orders once fetched
//       if (res.data.orders && res.data.orders.length > 0) {
//         setOrders(res.data.orders);
//       }
//     } catch (error) {
//       console.error("Failed to fetch orders:", error);
//     }
//   };

//   fetchOrders(); // Fetch initial orders
// }, []); // This only runs once when the component mounts




//   // receives one order, a order can have multiple items or just one item
//   async function handleCompletedOrders(order, index, itemId) {
//     console.log(order, index);

//     // if order has multiple items
//     if (order.orderDetails.length > 1) {
//       console.log(itemId);
//       const updatedOrderDetails = order.orderDetails.filter((item) => item._id !== itemId);
//       console.log(updatedOrderDetails.length);

//       await axios.patch("/api/updateorder", {
//         orderId: order._id,
//         orderDetails: updatedOrderDetails,
//       });

//       // update state for multiple items order
//       setOrders((prevOrders) =>
//         prevOrders.map((prevOrder) =>
//           // updates order details to remove item for multiple items orders
//           prevOrder._id === order._id
//             ? { ...prevOrder, orderDetails: updatedOrderDetails }
//             : prevOrder
//         )
//       );
//     } else {
//       console.log(order._id);
//       const orderId = order._id;
//       await axios.delete(`/api/deleteorder?orderId=${orderId}`);

//       // update state if order only has one item
//       setOrders((prevOrders) =>
//         prevOrders.filter((prevOrder) => prevOrder._id !== orderId)
//     );
//     }
//   }

//   return (
//     <>
//       <div className={c.cont}>
//         <h1>Pedidos</h1>
//         <div className={c.headerRow}>
//           <div className={c.headerItem}>Mesa</div>
//           <div className={c.headerItem}>Quantidade</div>
//           <div className={c.headerItem}>Status</div>
//         </div>
//         <div className={c.wrapper}>
//           <div className={c.unfilled}>
//             {orders && orders.map((order, index) => {
//               return (
//                 <div key={order._id} className={c.order}>
//                   {order.orderDetails.map((item, index) => {
//                     return (
//                       <div key={`${item._id}_${index}`} className={c.orderBlock}>
//                         <div className={c.item}>
//                           <span className={c.tableNumber}>#{order.tableNumber}</span>{" "}
//                           <div className={c.imgCont}>
//                             &nbsp;
//                             {item.img ? (
//                               <img className={c.img} src={item.img} aria-labelledby="product image" />
//                             ) : (
//                               <span className={c.itemName}>{item.itemName}</span>
//                             )}
//                           </div>
//                           {item.img ? <span className={c.itemName}>{item.itemName}</span> : null}
//                         </div>
//                         <div className={c.itemQuantity}>{item.quantity}</div>
//                         <div className={c.btnCont}>
//                           <button className={c.btn} onClick={() => handleCompletedOrders(order, index, item._id)}>
//                             Pronto
//                           </button>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* <h2>Completas</h2>
//       <div className={c.wrapper}>
//         <div className={c.filled}>
//           {filledOrders.map((order, index) => {
//             return (
//               <div key={index} className={`${c.order} ${c.finished}`}>
//                 <div className={c.orderBlock}>
//                   <div className={c.item}>
//                     <div className={c.item}>{order.order}</div>
//                   </div>
//                   <div className={c.item}>
//                     <button className={`${c.btn} ${c.btnFinished}`}>Pronta</button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div> */}
//     </>
//   );
// }
