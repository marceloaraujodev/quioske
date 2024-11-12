'use client';
import { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import { useOrderContext } from '../../Providers/OrderContext';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { CiBeerMugFull } from 'react-icons/ci';
import { TbGlassCocktail } from 'react-icons/tb';
import { v4 as uuidv4 } from 'uuid';
import c from './Cardapio.module.css';

// quioske name userId and table number will come from the qrcode link that it will be open by the client
export default function Cardapio({ tableNumber, quioskeName, _id }) {
  const [menuData, setMenuData] = useState(null);
  const {
    addOrder,
    orders,
    setOrders,
    resetOrders,
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

  // console.log(tableNumber, quioskeName, _id);

  useEffect(() => {
    const fetchMenu = async () => {
      const res = await axios.get('/api/menu', {
        params: { _id, tableNumber, quioskeName },
      });
      setMenuData(res.data.menu);
      // console.log(res.data.menu);
    };
    fetchMenu();
  }, []);



  // console.log('this is from Cardapio, Table Number:', tableNumber)

  const onSubmit = (data) => {
    
    // console.log(data);+
    // console.log(order);
    const newOrder = Object.entries(data).reduce((order, [key, quantity]) => {
      
      const [itemId, itemName, itemPrice] = key.split('_');
      // items with quantity greater than 1
      if (quantity > 0) {
        // console.log('itemId from items clicked:', itemId);

        // console.log(menuData)
        // Find the item in menuData that matches this itemId and itemName
        const category = menuData.category.find((cat) =>
          cat.subCategory.some((subCat) =>
            subCat.items.some((item) => item.itemId === +itemId)
          )
        );
        // console.log(category);

        const subCategory = category?.subCategory.find((subCat) =>
          subCat.items.some((item) => item.itemId === +itemId)
        );
        // console.log(subCategory);

        const item = subCategory?.items.find((item) => item.itemId === +itemId);
        // console.log('this is item------', item);

        order.push({ itemId, itemName, price: itemPrice, quantity, img: item.img });
      }
      return order;
    }, []);
    // console.log(newOrder);
    addOrder(newOrder);
    setIsModalOpen(true);
    
  };
  async function confirmOrder() {
    try {
      const res = await axios.post('/api/createorder', {
        tableNumber,
        userId: _id,
        orders,
        empresa: quioskeName,
      });

      if (res.status === 200) {      
        resetOrders();
        setIsModalOpen(false);
        resetQuantityFields();
        console.log('res data from cardapio confirm',res.data.order);
      } else {
        throw new Error('Failed to send order');
      }
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

  const subCategoryIconMap = {
    Cervejas: <CiBeerMugFull />,
    Caipirinhas: <TbGlassCocktail />, // If you want to use a different icon for this
    // Frios: <MdFastfood />,
    // Quentes: <MdFastfood /> , // Example icon, you can change to suit the category
    // Grandes: CiFood,
    // Pequenas: CiFood,
  };

  return (
    <>
      <Modal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div id="modalContent">
          <h2>Confirmar Pedido</h2>
          {orders.length > 0 ? (
            <ul>
              {orders.map((item) => (
                <li key={`${item.itemId}-${item.itemName}`}>
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
                          <button type="submit" className={c.btnOrder}>
                Pedir
              </button>
            {menuData.category.map((categoryData) => (
              
              <div key={categoryData.name} className={c.categorySection}>
                <h3 className={c.category}>{categoryData.name}</h3>
                {categoryData.subCategory.map((subCategoryData) => (
                  <div key={`${categoryData.name}_${subCategoryData.name}`} className={c.typeSection}>
                    <div className={c.subCategory}>
                      {subCategoryIconMap[subCategoryData.name] || null}
                      {subCategoryData.name}
                    </div>
                    <div className={c.itemsCont}>
                      {subCategoryData.items.map((item, index) => {
                        const fieldName = `${item.itemId}_${item.name}_${item.price}_${index}`;
                        const uniqueKey = Date.now() + item.itemId
                        return (
                          <div key={uniqueKey} className={c.item}>
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
                                  className={c.btnMinus}
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
                                  className={c.btnPlus}
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
            <div className={c.btnCont}>
              {/* <button type="submit" className={c.btnOrder}>
                Pedir
              </button> */}
            </div>
          </form>
        ) : (
          ''
        )}
      </div>
    </>
  );
}
