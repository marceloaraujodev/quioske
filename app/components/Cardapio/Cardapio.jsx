import { useState } from 'react';
import Modal from '../Modal/Modal';
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

export default function Cardapio({ isModalOpen, onClose }) {
  // will get table id from the qrcode scanner 
  const [order, setOrder] = useState([]);
  const [quantities, setQuantities] = useState({});
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data)
  
    console.log(order);
    // const res = await axios.post('/api/orders', order)
    
  };

  const handleQuantityChange = (item, quantity) => {
    // console.log(id, quantity, itemName);
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [item.itemId]: quantity,
    }));
    setOrder((prevOrder) => {
      const existingItemIndex = prevOrder.findIndex(i => i.itemId === item.itemId);

      if(existingItemIndex !== -1){
        // update item quantity 
        const updateOrder = [...prevOrder] // gets all previous orders
        updateOrder[existingItemIndex].quantity = quantity;
        return updateOrder;
      }else{
        // add new if no orders exist
        return [...prevOrder, { ...item, quantity }];
      }
    }
  )
  };



  const menuData = {
    "Bebidas Alcoólicas": {
      Lata: [
        { itemId: 1, name: "Skol", price: 10.00, ml: 350 },
        { itemId: 2, name: "Brahma", price: 11.00, ml: 350 },
        { itemId: 3, name: "Heineken", price: 9.00, ml: 350 }
      ],
      Garrafa: [
        { itemId: 4, name: "Heineken", price: 12.00, ml: 500 },
        { itemId: 5, name: "Budweiser", price: 14.00, ml: 500 }
      ],
      Longneck: [
        { itemId: 6, name: "Corona", price: 15.00, ml: 330 }
      ]
    },
    Entradas: {
      "Frios": [
        { itemId: 7, name: "Queijo", price: 20.00, description: "Assorted cheeses" },
        { itemId: 8, name: "Salame", price: 18.00, description: "Italian salami" }
      ],
      "Quentes": [
        { itemId: 9, name: "Bolinho de Bacalhau", price: 22.00, description: "Codfish balls" }
      ]
    },
    Porções: {
      "Pequenas": [
        { itemId: 10, name: "Frango a Passarinho", price: 25.00, description: "Fried chicken" }
      ],
      "Grandes": [
        { itemId: 11, name: "Batata Frita", price: 30.00, description: "French fries" }
      ]
    },
    Caipirinhas: {
      Tradicional: [
        { itemId: 12, name: "Caipirinha de Limão", price: 18.00, ml: 300 }, 
        { itemId: 13, name: "Caipirinha de Morango", price: 20.00, ml: 300 }
      ],
      "Sabores Diversos": [
        { itemId: 14, name: "Caipirinha de kiwi", price: 20.00, ml: 300 }
      ]
    }
  };

  return (
    <>
      <Modal isModalOpen={isModalOpen} onClose={onClose} />
      <div className={c.cardapioContainer}>
        {Object.entries(menuData).map(([category, types]) => (
          <div key={category} className={c.categorySection}>
            <h3>{category}</h3>
            {Object.entries(types).map(([type, items]) => (
              <div key={type} className={c.typeSection}>
                <h4>{type}</h4>
                <div className={c.itemsCont}>
                  {items.map((item, index) => (
                    <form key={`${item.name}-${index}`} className={c.item} onSubmit={handleSubmit(onSubmit)}>
                      <div>
                        <p className={c.itemName}>{item.name}</p>
                        {item.description && (
                          <span className={c.itemDescription}>{item.description}</span>
                        )}
                      </div>
                      <div className={c.itemDetails}>
                        <div className={c.priceCont}>
                          <p>R$ {item.price.toFixed(2)}</p>
                          {item.ml && <p>({item.ml} ml)</p>}
                        </div>
                        <label className={c.label} htmlFor={`quantity-${index}`}>Qt
                          <input 
                            {...register(item.name)} 
                            type="number"
                            value={quantities[item.itemId] || 0}
                            min={0}
                            onChange={(e) => handleQuantityChange(item, +e.target.value)}
                          />
                          {errors.name && <p>{errors.name.message}</p>}
                        </label>
                      </div>
                    </form>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
        <button onClick={handleSubmit(onSubmit)}>Pedir</button>
      </div>
    </>
  );
}
