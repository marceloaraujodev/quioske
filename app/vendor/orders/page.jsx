'use client';
import { useState, useEffect } from 'react';
import { useOrderContext } from '../../Providers/OrderContext';
import c from './orders.module.css';
import axios from 'axios';

export default function OrdersPage() {
  // fetch the orders after order

  const {
    orders,
    setOrders,
    updateOneItemOrder,
    updateMultipleItemsOrder, 
    setIsOrdersDirty,
    isOrdersDirty,
  } = useOrderContext();

  const fetchOrders = async () => {
    try {
      const res = await axios.get('/api/orders');
      setOrders(res.data.orders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders(); // Initial fetch only
  }, []);

    // Re-fetch orders if `isOrdersDirty` is true
    useEffect(() => {
      console.log(isOrdersDirty);
      // if (isOrdersDirty) {
      //   fetchOrders();
      //   setIsOrdersDirty(false); // Reset after refetching
      // }
    }, [isOrdersDirty, setIsOrdersDirty]);

  // receives one order, a order can have multiple items or just one item
  async function handleCompletedOrders(order, index, itemId) {
    // console.log(order, index);

    // if order has multiple items
    if (order.orderDetails.length > 1) {
      console.log(itemId);
      const updatedOrderDetails = order.orderDetails.filter(
        (item) => item._id !== itemId
      );
      console.log(updatedOrderDetails.length);

      await axios.patch('/api/updateorder', {
        orderId: order._id,
        orderDetails: updatedOrderDetails,
      });

      // update state for multiple items order
      updateMultipleItemsOrder(order._id, updatedOrderDetails)
 
    } else {
      // console.log(order._id);
      const orderId = order._id;
      await axios.delete(`/api/deleteorder?orderId=${orderId}`);

      // update state if order only has one item
      updateOneItemOrder(order._id)
    }
    setIsOrdersDirty(true);
  }

  return (
    <>
      <div className={c.cont}>
        <h1>Pedidos</h1> <button onClick={() => setIsOrdersDirty(!isOrdersDirty)}>test order</button>
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
                  {order.orderDetails.map((item, index) => {
                    return (
                      <div key={`${item._id}_${index}`} className={c.orderBlock}>
                        <div className={c.item}>
                          <span className={c.tableNumber}>
                            #{order.tableNumber}
                          </span>{' '}
                          <div className={c.imgCont}>
                            &nbsp;
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