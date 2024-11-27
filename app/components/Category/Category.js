// this should be a single category
'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { HiEllipsisVertical } from 'react-icons/hi2';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import 'rsuite/Modal/styles/index.css';
import 'rsuite/Button/styles/index.css';
import c from './Category.module.css';

// to do: 1 update state after update not finished

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

  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {

  }, [menu])

  const handleOpenModal = (event, item) => {
    const rect = event.target
      .closest(`.${c.ellipsisCont}`)
      .getBoundingClientRect();
    setModalPosition({
      top: rect.top + window.scrollY - 120,
      left: rect.left + window.scrollX - 150,
    });

    setActiveItem(item); // Set the active item for the modal
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setActiveItem(null);
  };

  const handleDelete = () => {
    console.log(activeItem);
    setMenu((prevMenu) => {
      return prevMenu.map((category) => {
        // Filter out the item that matches the active item to be deleted
        const updatedItems = category.items.filter(
          (item) => item.itemId !== activeItem.itemId
        );
        console.log(category.items) // 
        console.log(updatedItems)
        // only return a new category object if the item was actually removed
        if (updatedItems.length !== category.items.length) {
          return { ...category, items: updatedItems };
        }
        
        // Return the category unchanged if no items were removed
        return category;
      });
    });
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
                {isEditing ? (
                  <>
                    <div className={c.imgCont}>
                      <img className={c.img} src={item.img} alt="item imag" />
                      <span>
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) =>
                            handleChange(item.itemId, 'name', e.target.value)
                          }
                        />
                      </span>
                    </div>
                    <div className={c.size}>
                      <input
                        type="text"
                        value={item.ml}
                        onChange={(e) =>
                          handleChange(item.itemId, 'ml', e.target.value)
                        }
                      />
                    </div>
                    <div className={c.price}>
                      R${' '}
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) =>
                          handleChange(item.itemId, 'price', e.target.value)
                        }
                      />
                      <div
                        className={c.ellipsisCont}
                        onClick={(e) => handleOpenModal(e, item)}>
                        <HiEllipsisVertical />
                      </div>
                    </div>
                  </>
                ) : (
                  // not editing
                  <>
                    <div className={c.imgCont}>
                      <img className={c.img} src={item.img} alt="item imag" />
                      <span>{item.name}</span>
                    </div>
                    <div className={c.size}>{item.ml}</div>
                    <div className={c.price}>
                      <span>R$</span>
                      {item.price}{' '}
                      <div
                        className={c.ellipsisCont}
                        onClick={(e) => handleOpenModal(e, item)}>
                        <HiEllipsisVertical />
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          });
        })}

      {open && activeItem && (
        <div
          className={c.modal}
          style={{
            top: modalPosition.top,
            left: modalPosition.left,
          }}>
          <div className={c.modalContentWrapper}>
            <div className={c.modalIconWrapper}>
              <div className={c.edit}>
                <CiEdit />{' '}
                <span
                  onClick={() => {
                    setIsEditing(true);
                    handleClose();
                  }}>
                  Editar
                </span>
              </div>
              <div className={c.edit}>
                <MdDeleteOutline color="red" />
                <span onClick={handleDelete}>Deletar</span>
              </div>
            </div>
          </div>
          <button onClick={handleClose} className={`btnLink ${c.modalBtn}`}>
            x
          </button>
        </div>
      )}
    </div>
  );
}

// modal

// {open && activeItem && (
//   <div
//     className={c.modal}
//     style={{
//       top: modalPosition.top,
//       left: modalPosition.left,
//     }}
//   >
//     <div className={c.modalContentWrapper}>
//       <div className={c.modalIconWrapper}>
//         <div className={c.edit}>
//           <CiEdit /> <span>Editar</span>
//         </div>
//         <div className={c.edit}>
//           <MdDeleteOutline color="red" />
//           <span>Deletar</span>
//         </div>
//       </div>
//     </div>
//       <button onClick={handleClose} className={`btnLink ${c.modalBtn}`}>
//         x
//       </button>
//   </div>
// )}

{
  /* <div>
                <label>Name:</label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleChange(item.itemId, 'name', e.target.value)}
                />
              </div>
              <div>
                <label>Tamanho:</label>
                <input
                  type="text"
                  value={item.ml}
                  onChange={(e) => handleChange(item.itemId, 'ml', e.target.value)}
                />
              </div>
              <div>
                <label>Preço:</label>
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => handleChange(item.itemId, 'price', e.target.value)}
                />
              </div>
            </div> */
}
