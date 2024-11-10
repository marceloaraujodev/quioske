"use client";
import { useState, useEffect } from "react";
import c from "./orders.module.css";
import { use } from "bcrypt/promises";

export default function OrdersPage() {
  const [orders, setOrder] = useState([
    { order: "brahma lata" },
    { order: "caipirinha limao" },
    { order: "skol garrafa" },
    { order: "heineken garrafa" },
    { order: "caipirinha limao" },
    { order: "skol garrafa" },
    { order: "heineken garrafa" },
  ]);
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

  }, [orders])


  function handleCompletedOrders(order, index){
    console.log(order, index);
    setOrder((prevOrders) => {
      console.log(prevOrders)
      
      
      return prevOrders.filter((item) => item !== order)
    })
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
                  <div className={c.orderBlock}>
                    <div className={c.item}>
                      <div className={c.item}>{order.order}</div>
                    </div>
                    <div className={c.item}>
                      <button className={c.btn} onClick={() => handleCompletedOrders(order, index)}>Pronta</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <h2>Completas</h2>
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
      </div>
    </>
  );
}
