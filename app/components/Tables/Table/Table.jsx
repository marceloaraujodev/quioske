"use client";
import { useState, useEffect } from "react";
import c from "./Table.module.css";
import MenuBtn from "@/app/ui/Menu/Menu";
import axios from "axios";

// this is for the vendor view
export default function Table({ id, orders }) {
  // get table by id, and populate orders details
  const [table, setTable] = useState(null); // [orders]
  const [isLoading, setIsLoading] = useState(false);

  // gets table data
  useEffect(() => {
    const tableData = async () => {
      const res = await axios.get(`/api/orders/table/${id}`);
      if (res.status === 200) {
        // console.log("res.data", res.data);
        setTable(res.data);
      } else {
        console.error("Error fetching table data:", res.data);
      }
    };
    tableData();
  }, [orders, id]);

  if(table){
      table.map((i)=> console.log(i.orderItems))
  }

  return (
    <>
      <MenuBtn />
      <div className={c.container}>
        <header className={c.header}>
          <h1 className={c.title}>Mesa {id}</h1>
          <div className={c.statusBadge}>Occupied</div>
        </header>

        {table ? (
  <div className={c.orderSection}>
    <h2 className={c.sectionTitle}>Current Orders</h2>
    <div className={c.orderList}>
      <div className={c.orderHeader}>
        <span>Item</span>
        <span>Qt</span>
        <span>Preço</span>
        <span>Status</span>
      </div>
      {table.map((i, index) => (
        i.orderItems.map((item, index) => (
        <div key={index} className={c.orderItem}>
          <span className={c.itemName}>{item.itemName}</span>
          <span className={c.itemQty}>{item.quantity}</span>
          <span className={c.itemPrice}>R${item.price}</span>
          <span className={`${c.status} ${item.fulfilled ? c.ready : c.preparing}`}>{item.fulfilled? 'ready': 'preparing'}</span>
        </div>
        ))
      ))}
    </div>
  </div>
) : (
  <div>
    <p>No orders yet.</p>
    <p>Please add some items to your order.</p>
    <p>Press the menu button to add items to your order.</p>
  </div>
)}

      </div>
    </>
  );
}
