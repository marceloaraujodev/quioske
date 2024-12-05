'use client';
import { useForm } from 'react-hook-form';
import { useState, useEffect, useRef } from 'react';
// import menuData from '@/app/data/menuData';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import CardapioView from './CardapioView/CardapioView';
import c from './CriarMenu.module.css';

export default function CriarMenu() {
  const { data: session, status } = useSession();
  const { register, handleSubmit, reset, setValue, getValues } = useForm();
  const [menu, setMenu] = useState([]);

  const fileInputRef = useRef(null);

  // Function to add a category
  const addCategory = () => {
    const menuName = getValues('MenuName');
    const categoryName = getValues('categoryName');
    if (categoryName) {
      setMenu((prevMenu) => [
        ...prevMenu,
        // { menuName, category: categoryName, subCategory: [] },
        { menuName, category: categoryName, items: [] },
      ]);
      reset({ categoryName: '' });
    }
  };

  // Delete a category
  const deleteCategory = (catIndex) => {
    setMenu((prevMenu) => prevMenu.filter((_, index) => index !== catIndex));
  };

  // Function to add an item to a specific category
  const addItem = (catIndex) => {
    const itemName = getValues(`itemName${catIndex}`);
    const itemPrice = parseFloat(getValues(`itemPrice${catIndex}`));
    const itemSize = getValues(`itemSize${catIndex}`);

    if (itemName && !isNaN(itemPrice)) {
      const newItem = {
        name: itemName,
        price: itemPrice,
        ...(itemSize && { tamanho: itemSize }),
      };

      setMenu((prevMenu) =>
        prevMenu.map((cat, i) =>
          i === catIndex
            ? {
                ...cat,
                items: [...cat.items, newItem],
              }
            : cat
        )
      );

      // Reset item input fields
      setValue(`itemName${catIndex}`, '');
      setValue(`itemPrice${catIndex}`, '');
      setValue(`itemSize${catIndex}`, '');
    }
  };


  const addPhoto = (event, catIndex, itemIndex) => {
    console.log(event, catIndex, itemIndex);
    const file = event.target.files[0]; // Get the selected file
    // console.log(file);
    if (file) {
      // Generate a mock URL (replace this with your actual upload logic)
      const photoUrl = URL.createObjectURL(file); // Mock URL for the image

      console.log(photoUrl);

      // Update the item with the photo
      setMenu((prevMenu) => {
        const updatedMenu = [...prevMenu];
        updatedMenu[catIndex].items[itemIndex] = {
          ...updatedMenu[catIndex].items[itemIndex],
          img: photoUrl, // Add the image URL to the item
        };
        return updatedMenu;
      });
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click
    }
  };

  // Delete an item from the updated structure without subcategory
  const deleteItem = (catIndex, itemIndex) => {
    setMenu((prevMenu) =>
      prevMenu.map((cat, i) =>
        i === catIndex
          ? {
              ...cat,
              items: cat.items.filter((_, j) => j !== itemIndex),
            }
          : cat
      )
    );
  };

  async function updateMenu(menuData) {
    console.log('menudata inside update func', menuData);

    console.log(session);
    const res = await axios.post('/api/updateMenu', {
      userId: session.user._id,
      menuData,
    });
    console.log(res);
  }

  async function createMenu(menuData) {
    console.log('menudata inside create func', menuData);

    // console.log(session);
    // const res = await axios.post('/api/createmenu', {
    //   session,
    //   menu: menuData,
    // });
    // console.log(res);
  }

  function onSubmit(data) {
    console.log('Data', data);
    // const menuData = {
    //   menuName: data.MenuName,
    //   categories: menu,
    // };
    // console.log('menu Data', menuData);
    // createMenu(data);
    // updateMenu(data);
  }

  return (
    <>
      <div className={c.cont}>
        <button className="btnLink" onClick={() => createMenu(menu)}>
          Create Menu
        </button>
        <form className={c.formCont} onSubmit={handleSubmit(onSubmit)}>
          {/* Category Input */}
          <label>
            Categoria:
            <div className={c.catCont}>
              <input
                {...register('categoryName', { required: true })}
                type="text"
                placeholder="Categoria ex. Bebidas Alcoólicas"
              />
              <button
                className="btnLink"
                onClick={addCategory} // Call addCategory directly
                type="button">
                +
              </button>
            </div>
          </label>

          {/* Categories and Subcategories */}
          {menu.map((category, catIndex) => (
            <div className={c.wrapper} key={catIndex}>
              <div className={c.catBtns}>
                <h3>{category.name}</h3>
                <button
                  onClick={() => deleteCategory(catIndex)}
                  type="button"
                  className="btnLink">
                  Delete Category
                </button>
              </div>
              {/* <label className={`${c.label} ${c.subCategory}`}>
                Subcategoria:
                <div className={c.catCont}>
                  <input
                    {...register(`subCategoryName${catIndex}`, {
                      // required: true,
                    })}
                    type="text"
                    placeholder="Subcategoria ex. Lata"
                  />
                  <button
                    className={`btnLink`}
                    onClick={() => addSubcategory(catIndex)} // Call addSubcategory with index
                    type="button">
                    Add Subcategory
                  </button>
                </div>
              </label> */}

              {/* Items */}
              <div key={catIndex} className={c.categoryItem}>
                {/* <div className={c.header}>
                </div> */}

                {/* Item Input Fields */}
                <label className={c.label}>
                  Item Name:
                  <input
                    {...register(`itemName${catIndex}`)} // Dynamically register based on category index
                    type="text"
                    placeholder="e.g., Skol"
                  />
                </label>
                <label>
                  Preço:
                  <input
                    {...register(`itemPrice${catIndex}`)} // Dynamically register based on category index
                    type="number"
                    placeholder="e.g., 10.0"
                  />
                </label>
                <label>
                  Tamanho:
                  <input
                    {...register(`itemSize${catIndex}`)}
                    type="text"
                    placeholder="e.g., 350ml"
                  />
                </label>
                <button
                  className={`btnLink ${c.addItem}`}
                  onClick={() => addItem(catIndex)} // Add item directly to category
                  type="button">
                  Add Item
                </button>

                {/* Display Items */}
                {/* {category.items.map((item, itemIndex) => (
                  <div className={c.itemWrapper} key={itemIndex}>
                    <div className={c.item}>
                      <div className={c.itemName}>
                        {item.name} - ${item.price} -{' '}
                        {item.tamanho ? item.tamanho : ''}
                      </div>
                    </div>

                    <div className={c.itemBtns}>
                      <button type="button" className={`btnLink`}
                      onClick={() => triggerFileInput()}>
                        + Foto
                      </button>
                      <input
                         ref={fileInputRef}
                         type="file"
                         style={{ display: 'none' }}
                         onChange={(e) => addPhoto(e, catIndex, itemIndex)}
                      />
                    </div>

                    <button
                      onClick={() => deleteItem(catIndex, itemIndex)} // Updated to work with category and item index
                      type="button"
                      className="btnLink">
                      Delete
                    </button>
                  </div>
                ))} */}
              </div>
            </div>
          ))}
        </form>
      </div>

      <CardapioView 
        menu={menu} 
        addPhoto={addPhoto} 
        deleteItem={deleteItem}
        setMenu={setMenu}
      />
    </>
  );
}

// ----For sub Category might not use it
// // Function to add a subcategory to a specific category
// const addSubcategory = (catIndex) => {
//   const subCategoryName = getValues(`subCategoryName${catIndex}`);
//   if (subCategoryName) {
//     setMenu((prevMenu) =>
//       prevMenu.map((cat, index) =>
//         index === catIndex
//           ? {
//               ...cat,
//               subCategory: [
//                 ...cat.subCategory,
//                 { name: subCategoryName, items: [] },
//               ],
//             }
//           : cat
//       )
//     );
//     setValue(`subCategoryName${catIndex}`, ''); // Reset specific subcategory input
//   }
// };

// // Delete a subcategory
// const deleteSubcategory = (catIndex, subCatIndex) => {
//   setMenu((prevMenu) =>
//     prevMenu.map((cat, index) =>
//       index === catIndex
//         ? {
//             ...cat,
//             subCategory: cat.subCategory.filter(
//               (_, subIndex) => subIndex !== subCatIndex
//             ),
//           }
//         : cat
//     )
//   );
// };

// // Delete an item with subcategory
// const deleteItem = (catIndex, subCatIndex, itemIndex) => {
//   setMenu((prevMenu) =>
//     prevMenu.map((cat, i) =>
//       i === catIndex
//         ? {
//             ...cat,
//             subCategory: cat.subCategory.map((subCat, j) =>
//               j === subCatIndex
//                 ? {
//                     ...subCat,
//                     items: subCat.items.filter((_, k) => k !== itemIndex),
//                   }
//                 : subCat
//             ),
//           }
//         : cat
//     )
//   );
// };

// // Function to add an item to a specific subcategory
// const addItem = (catIndex, subCatIndex) => {
//   const itemName = getValues(`itemName${catIndex}-${subCatIndex}`);
//   const itemPrice = parseFloat(
//     getValues(`itemPrice${catIndex}-${subCatIndex}`)
//   );
//   const itemSize = getValues(`itemSize${catIndex}-${subCatIndex}`);

//   if (itemName && !isNaN(itemPrice)) {
//     const newItem = {
//       name: itemName,
//       price: itemPrice,
//       ...(itemSize && { tamanho: itemSize }),
//     };

//     setMenu((prevMenu) =>
//       prevMenu.map((cat, i) =>
//         i === catIndex
//           ? {
//               ...cat,
//               subCategory: cat.subCategory.map((subCat, j) =>
//                 j === subCatIndex
//                   ? {
//                       ...subCat,
//                       items: [
//                         ...subCat.items,
//                         {
//                           name: itemName,
//                           price: itemPrice,
//                           tamanho: itemSize,
//                         },
//                       ],
//                     }
//                   : subCat
//               ),
//             }
//           : cat
//       )
//     );
//     // Reset item input fields
//     setValue(`itemName${catIndex}-${subCatIndex}`, '');
//     setValue(`itemPrice${catIndex}-${subCatIndex}`, '');
//     setValue(`itemSize${catIndex}-${subCatIndex}`, '');
//   }
// };

{
  /* Subcategories and Items */
}
{
  /* {category.subCategory.map((subCategory, subCatIndex) => (
                <div key={subCatIndex} className={c.subCategoryItem}>
                  <div className={c.header}>
                    <h4>{subCategory.name}</h4>
                    <button
                      onClick={() => deleteSubcategory(catIndex, subCatIndex)}
                      type="button"
                      className="btnLink">
                      Delete
                    </button>
                  </div>
                  <label className={c.label}>
                    Item Name:
                    <input
                      {...register(
                        `itemName${catIndex}-${subCatIndex}`
                      )}
                      type="text"
                      placeholder="e.g., Skol"
                    />
                  </label>
                  <label>
                    Preço:
                    <input
                      {...register(
                        `itemPrice${catIndex}-${subCatIndex}`
                      )}
                      type="number"
                      placeholder="e.g., 10.0"
                    />
                  </label>
                  <label>
                    Tamanho:
                    <input
                      {...register(`itemSize${catIndex}-${subCatIndex}`, {})}
                      type="text"
                      placeholder="e.g., 350ml"
                    />
                  </label>
                  <button
                    className={`btnLink ${c.addItem}`}
                    onClick={() => addItem(catIndex, subCatIndex)} 
                    type="button">
                    + Foto
                  </button>
                  <button
                    className={`btnLink ${c.addItem}`}
                    onClick={() => addItem(catIndex, subCatIndex)} 
                    type="button">
                    Add Item
                  </button>

                  {subCategory.items.map((item, itemIndex) => (
                    <div className={c.itemWrapper} key={itemIndex}>
                      <div  className={c.item}>
                        <div className={c.itemName}>
                          {item.name} - ${item.price} -{' '}
                          {item.tamanho ? item.tamanho : ''}
                        </div>
                      </div>
                        <button
                          onClick={() =>
                            deleteItem(catIndex, subCatIndex, itemIndex)
                          }
                          type="button"
                          className="btnLink">
                          Delete
                        </button>
                    </div>
                  ))}
                </div>
              ))} */
}

// // ---- End Sub Category
