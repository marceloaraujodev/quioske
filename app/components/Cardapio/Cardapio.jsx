'use client';
import { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import { useOrderContext } from '../../Providers/OrderContext';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import c from './Cardapio.module.css';
// import io from 'socket.io-client';

// const socket = io('http://your-server-url'); // Update with your server URL

// const tablesOrders = {
//   table1: {
//     orders: [
//       { itemId: 1, itemName: "Skol", quantity: 1, price: 10.00 },
//       { itemId: 2, itemName: "Heineken", quantity: 2, price: 12.00 },
//     ],
//     totalAmount: 34.00,
//   },
//   // More tables...
// };

// quioske name userId and table number will come from the qrcode link that it will be open by the client
export default function Cardapio({ tableNumber, quioskeName, _id }) {
  const [orderDetails, addOrderDetails] = useState([]);
  const [menuData, setMenuData] = useState(null);
  const {
    addOrder,
    orders,
    resetOrders,
    setOrdersToFill,
    isModalOpen,
    setIsModalOpen,
  } = useOrderContext();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset: resetQuantityFields,
    formState: { errors },
  } = useForm();

  console.log(tableNumber, quioskeName, _id);

  useEffect(() => {
    const fetchMenu = async () => {
      const res = await axios.get('/api/menu', {params: { _id, tableNumber, quioskeName}})
      setMenuData(res.data.menu);
      console.log(res.data.menu);
    }
    fetchMenu();
  }, []);

  // console.log('this is from Cardapio, Table Number:', tableNumber)

  const onSubmit = (data) => {
    // console.log(data);
    // console.log(order);
    const newOrder = Object.entries(data).reduce((order, [key, quantity]) => {
      const [itemId, itemName, itemPrice] = key.split('_');
      if (quantity > 0) {
        order.push({ itemId, itemName, price: itemPrice, quantity });
      }
      return order;
    }, []);
    console.log(newOrder);
    addOrder(newOrder);
    setIsModalOpen(true);
  };

  async function confirmOrder() {
    try {
      const res = await axios.post('/api/orders', {
        tableNumber,
        userId: _id,
        orders,
        empresa: quioskeName,
      });
      console.log(res);
      // if (res.status === 200) {
      //   socket.emit('order', orderDetails);
      setOrdersToFill(res.data.order.orders)
      resetOrders();
      setIsModalOpen(false);
      resetQuantityFields();
      // setOrdersToFill(res.data)
      // alert('Pedido enviado com sucesso');
      // } else {
      //   throw new Error('Failed to send order');
      // }
    } catch (error) {
      alert('Alguma coisa deu errado, por favor tente novamente');
      console.error(error);
    }
  }

  const handleIncrement = (fieldName) => {
    setValue(fieldName, (watch(fieldName) || 0) + 1); // Increase quantity by 1
  };

  const handleDecrement = (fieldName) => {
    const currentValue = watch(fieldName) || 0;
    if (currentValue > 0) {
      setValue(fieldName, currentValue - 1); // Decrease quantity by 1, but not below 0
    }
  };

  return (
    <>
      <Modal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div id="modalContent">
          <h2>Confirmar Pedido</h2>
          {orders.length > 0 ? (
            <ul>
              {orders.map((item) => (
                <li key={item.itemId}>
                  {item.itemName} x{item.quantity} - R${' '}
                  {(item.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
          ) : (
            <p>No items in your order.</p>
          )}
          <div id="modalBtn-Cancel-Confirm-Cont">
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button onClick={confirmOrder}>Confirm Order</button>
          </div>
        </div>
      </Modal>
      <div>
        {menuData ? (
        <form onSubmit={handleSubmit(onSubmit)} className={c.cardapioCont}>
          {menuData.category.map((categoryData) => (
            <div key={categoryData.name} className={c.categorySection}>
              <h3>{categoryData.name}</h3>
              {categoryData.subCategory.map((subCategoryData) => (
                <div key={subCategoryData.name} className={c.typeSection}>
                  <h4>{subCategoryData.name}</h4>
                  <div className={c.itemsCont}>
                    {subCategoryData.items.map((item) => {
                      const fieldName = `${item.itemId}_${item.name}_${item.price}`;

                      return (
                        <div key={item.itemId} className={c.item}>
                          <div className={c.imgCont}>
                            {item.img ? (
                              <img
                                src={item.img}
                                alt={item.name}
                                className={c.itemImg}
                              />
                            ) : (
                              ''
                            )}

                            <div className={c.itemName}>{item.name}</div>
                            {item.description ? (
                              <p className={c.itemDescription}>
                                {item.description}
                              </p>
                            ) : null}
                          </div>

                          <div className={c.itemDetails}>
                            <div className={c.priceCont}>
                              <p>R$ {item.price.toFixed(2)}</p>
                            </div>
                            <div className={c.label}>
                              <button
                                type="button"
                                onClick={() => handleDecrement(fieldName)}>
                                -
                              </button>
                              <input
                                type="number"
                                min={0}
                                {...register(fieldName, {
                                  valueAsNumber: true,
                                })}
                                value={watch(fieldName) || 0} // Display 0 when field is empty
                              />
                              <button
                                type="button"
                                onClick={() => handleIncrement(fieldName)}>
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ))}
          <button type="submit">Pedir</button>
        </form>
        ) : ''}
      </div>
    </>
  );
}
