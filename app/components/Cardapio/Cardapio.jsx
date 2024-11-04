import {useState} from 'react'
import Modal from '../Modal/Modal';
import { useForm } from "react-hook-form";
import c from './Cardapio.module.css';

export default function Cardapio({ isModalOpen, setIsModalOpen, onClose }) {
  const [quantities, setQuantities] = useState({});

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // setIsModalOpen(true);
    console.log('onsubmitForm', data);
  }

  const handleQuantityChange = (index, value) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities, 
      [index]: value,
    }))
  }


  const cervejas = [
    {
      name: 'Skol',
      price: 10.00,
      ml: 350,
      type: 'lata',
    },
    {
      name: 'Brahma',
      price: 11.00,
      ml: 350,
      type: 'lata',
    },
    {
      name: 'Heineken',
      price: 12.00,
      ml: 500,
      type: 'garrafa',
    },
    {
      name: 'Heineken',
      price: 9.00,
      ml: 350,
      type: 'lata',
    },
    {
      name: 'Budweiser',
      price: 14.00,
      ml: 500,
      type: 'garrafa',
    },
    {
      name: 'Corona',
      price: 15.00,
      ml: 330,
      type: 'longneck',
    },
    // Additional beers can be added here
  ];
  

  return (
    <>
    <Modal
     isModalOpen={isModalOpen}
     onClose={onClose}
    //  item={item}
    />
    <div>Cardapio

      <div className={c.card}>
        <h3>BEBIDAS ALCOÓLICAS</h3>
        <p>Cervejas Garrafa:</p>
        <div className={c.itemsCont}>
        {cervejas.map((cerveja, index) => {
          return (
            <form key={index} className={c.item} onSubmit={handleSubmit(onSubmit)}>

              <p className={c.itemName}>{cerveja.name}</p>

              <div className={c.itemDetails}>
              <p className={c.itemPrice}>R$ {cerveja.price.toFixed(2)}</p>
              <p className={c.itemVolume}> ({cerveja.ml} ml)</p>
              <label className={c.label} htmlFor='quantity'>Qt
              <input 
                {...register(`quantity-${index}` )} 
                type="number"
                value={quantities[index] || 0}
                onChange={(e) => handleQuantityChange(index, e.target.value)}
              />
              </label>
              </div>


            </form>
          )
        })}
        </div>
        <button onClick={handleSubmit(onSubmit)}>Pedir</button>
      </div>
    </div>
    </>
  )
}