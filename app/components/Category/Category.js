// this should be a single category
'use client';
import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import {
  Modal,
  ButtonToolbar,
  Button,
  RadioGroup,
  Radio,
  Placeholder,
} from 'rsuite';
import { HiEllipsisVertical } from 'react-icons/hi2';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import 'rsuite/Modal/styles/index.css';
import 'rsuite/Button/styles/index.css';
import c from './Category.module.css';

export default function Category() {
  // const { data: session, status } = useSession();
  // const { register, handleSubmit, reset, setValue, getValues } = useForm();
  const [menu, setMenu] = useState([
    {
      category: 'Bebidas',
      items: [
        {
          itemId: '1',
          name: 'heineken',
          price: 5.0,
          ml: '350ml',
          img: '/heineken-lata.jpeg',
          description: 'Refrigerante de 350ml',
        },
        {
          itemId: '3',
          name: 'Brahma',
          price: 5.0,
          ml: '350ml',
          img: '/brahma-lata.jpeg',
          description: 'Refrigerante de 250ml',
        },
      ],
    },
  ]);
  const [isAddItem, setIsAddItem] = useState(false);

  const iconRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [backdrop, setBackdrop] = useState('static');
  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    if (iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setModalStyle({
        position: 'absolute',
        top: `${rect.bottom + window.scrollY}px`, // Position below the icon
        left: `${rect.left + window.scrollX}px`, // Align with the icon
        transform: 'none', // Override default centering
      });
    }
    setOpen(true);
  };

  return (
    <div className={c.cont}>
      <div>
        <button className="btnLink" onClick={() => setIsAddItem(true)}>
          Adicionar Item
        </button>
      </div>

      <div className={c.itemLabel}>
        <p>Item</p>
        <p className={c.size}>Tam. </p>
        <p className={c.price}>Preço</p>
      </div>
      {menu &&
        menu.map((item, index) => {
          // console.log(item.category)
          return item.items.map((item, index) => {
            return (
              <div key={index} className={c.itemCont}>
                <div className={c.imgCont}>
                  <img className={c.img} src={item.img} alt="item imag" />
                  <span>{item.name}</span>
                </div>
                {/* <p>{item.itemId}</p> */}
                <p className={c.size}>{item.ml}</p>
                <p className={c.price}>
                  R${item.price}{' '}
                  <span onClick={() => setOpen(true)}>
                    <HiEllipsisVertical />
                  </span>
                </p>
                
                <Modal
                  className={c.modal}
                  backdrop={backdrop}
                  keyboard={false}
                  open={open}
                  size={180}
                  onClose={handleClose}>
                  <Modal.Header>
                  </Modal.Header>
                  <Modal.Body className={c.modalBody}>
                    <div className={c.edit}>
                      <CiEdit /> <span>Editar</span>
                    </div>
                    <div className={c.edit}>
                      <MdDeleteOutline color="red" />
                      <span>Deletar</span>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                  </Modal.Footer>
                </Modal>
              </div>
            );
          });
        })}
    </div>
  );
}
