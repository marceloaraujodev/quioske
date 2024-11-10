"use client";
import { useState, useEffect } from "react";
import c from "./orders.module.css";
import axios from "axios";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]); // this will be the order doc, inside array of individual orders

  const [filledOrders, setFilledOrders] = useState([
    { order: "caipirinha limao" },
    { order: "skol garrafa" },
    { order: "brahma lata" },
    { order: "caipirinha limao" },
    { order: "skol garrafa" },
    { order: "heineken garrafa" },
    { order: "heineken garrafa" },
  ]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('/api/orders');
      setOrders(res.data.orders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

console.log(orders);

  async function handleCompletedOrders(order, index, itemId){
    console.log(order, index);

    // if order has multiple items
    if(order.orderDetails.length > 1){
      console.log(itemId);
      const updatedOrderDetails = order.orderDetails.filter((item) => item._id !== itemId)
      console.log(updatedOrderDetails.length);

      await axios.patch('/api/updateorder',{
        orderId: order._id,
        orderDetails: updatedOrderDetails
      });

      
      // update state
      setOrders((prevOrders) =>
        prevOrders.map((prevOrder) =>
          // updates order details to remove item for multiple items orders
          prevOrder._id === order._id
            ? { ...prevOrder, orderDetails: updatedOrderDetails }
            : prevOrder
        )
      );
    }else{
      // console.log(order._id);
      const orderId = order._id;
      await axios.delete(`/api/deleteorder?orderId=${orderId}`);

      // update state if order only has one item
      setOrders(prevOrders => prevOrders.filter(prevOrder => prevOrder._id !== order._id))
    }
    
    
  }

  return (
    <>
      <div className={c.cont}>
        <h1>Pedidos</h1>
        <div className={c.wrapper}>
          <div className={c.unfilled}>
            {orders.map((order, index) => {
              return (
                <div key={index} className={c.order}>
                  {order.orderDetails.map((item, index) => {
                    return(
                      <div key={index} className={c.orderBlock}>
                      <div className={c.item}>
                        <div className={c.itemName}><span className={c.tableNumber}>#{order.tableNumber}</span> &nbsp;{item.itemName}</div>
                        <button className={c.btn} onClick={() => handleCompletedOrders(order, index, item._id)}>Pronta</button>
                      </div>
                      {/* <div className={c.item}>
                      </div> */}
                    </div>
                    )
                    
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
