'use client';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import menuData from '@/app/data/menuData';
import axios from 'axios';
import { useSession } from "next-auth/react";
import c from './menu.module.css';

export default function EditMenuPage() {
  const { data: session, status } = useSession();
  const { register, handleSubmit, reset, setValue, getValues } = useForm();
  const [menu, setMenu] = useState([]);

  // Function to add a category
  const addCategory = () => {
    const categoryName = getValues('categoryName');
    if (categoryName) {
      setMenu((prevMenu) => [
        ...prevMenu,
        { name: categoryName, subCategory: [] },
      ]);
      reset({ categoryName: '' });
    }
  };

  // Delete a category
  const deleteCategory = (catIndex) => {
    setMenu((prevMenu) => prevMenu.filter((_, index) => index !== catIndex));
  };

  // Function to add a subcategory to a specific category
  const addSubcategory = (catIndex) => {
    const subCategoryName = getValues(`subCategoryName${catIndex}`);
    if (subCategoryName) {
      setMenu((prevMenu) =>
        prevMenu.map((cat, index) =>
          index === catIndex
            ? {
                ...cat,
                subCategory: [
                  ...cat.subCategory,
                  { name: subCategoryName, items: [] },
                ],
              }
            : cat
        )
      );
      setValue(`subCategoryName${catIndex}`, ''); // Reset specific subcategory input
    }
  };

  // Delete a subcategory
  const deleteSubcategory = (catIndex, subCatIndex) => {
    setMenu((prevMenu) =>
      prevMenu.map((cat, index) =>
        index === catIndex
          ? {
              ...cat,
              subCategory: cat.subCategory.filter(
                (_, subIndex) => subIndex !== subCatIndex
              ),
            }
          : cat
      )
    );
  };

  // Function to add an item to a specific subcategory
  const addItem = (catIndex, subCatIndex) => {
    const itemName = getValues(`itemName${catIndex}-${subCatIndex}`);
    const itemPrice = parseFloat(getValues(`itemPrice${catIndex}-${subCatIndex}`));
    const itemSize = getValues(`itemSize${catIndex}-${subCatIndex}`);

    if (itemName && !isNaN(itemPrice)) {

      const newItem = {
        name: itemName,
        price: itemPrice,
        ...(itemSize && { tamanho: itemSize })
      }

      setMenu((prevMenu) =>
        prevMenu.map((cat, i) =>
          i === catIndex
            ? {
                ...cat,
                subCategory: cat.subCategory.map((subCat, j) =>
                  j === subCatIndex
                    ? {
                        ...subCat,
                        items: [
                          ...subCat.items,
                          { name: itemName, price: itemPrice, tamanho: itemSize },
                        ],
                      }
                    : subCat
                ),
              }
            : cat
        )
      );
      // Reset item input fields
      setValue(`itemName${catIndex}-${subCatIndex}`, '');
      setValue(`itemPrice${catIndex}-${subCatIndex}`, '');
      setValue(`itemSize${catIndex}-${subCatIndex}`, '');
    }
  };

  // Delete an item
  const deleteItem = (catIndex, subCatIndex, itemIndex) => {
    setMenu((prevMenu) =>
      prevMenu.map((cat, i) =>
        i === catIndex
          ? {
              ...cat,
              subCategory: cat.subCategory.map((subCat, j) =>
                j === subCatIndex
                  ? {
                      ...subCat,
                      items: subCat.items.filter((_, k) => k !== itemIndex),
                    }
                  : subCat
              ),
            }
          : cat
      )
    );
  };
  
  async function updateMenu(menuData){
    console.log('menudata inside update func',menuData);

    console.log(session);
    // const res = await axios.post('/api/updateMenu', menuData)
    // console.log(res);
  }

  return (
    <>
    <button onClick={() => updateMenu(menuData)}>updateMenu</button>
    <form className={c.formCont} onSubmit={(e) => e.preventDefault()}>
      {/* Category Input */}
      <label>
        Categoria:
        <div>
          <input
            {...register('categoryName', { required: true })}
            type="text"
            placeholder="Categoria ex. Bebidas Alcoólicas"
          />
          <button
            className={c.btnAdd}
            onClick={addCategory} // Call addCategory directly
            type="button"
          >
            Add Category
          </button>
        </div>
      </label>

      {/* Categories and Subcategories */}
      {menu.map((category, catIndex) => (
        <div key={catIndex}>
          <h3>{category.name}</h3>
          <button onClick={() => deleteCategory(catIndex)} type="button" className={c.btnDelete}>
              Delete
            </button>
          <label>
            Subcategoria:
            <div>
              <input
                {...register(`subCategoryName${catIndex}`, {
                  required: true,
                })}
                type="text"
                placeholder="Subcategoria ex. Lata"
              />
              <button
                className={c.btnAdd}
                onClick={() => addSubcategory(catIndex)} // Call addSubcategory with index
                type="button"
              >
                Add Subcategory
              </button>
            </div>
          </label>

          {/* Subcategories and Items */}
          {category.subCategory.map((subCategory, subCatIndex) => (
            <div key={subCatIndex} className={c.subcategory}>
              <h4>{subCategory.name}</h4>
              <button
                  onClick={() => deleteSubcategory(catIndex, subCatIndex)}
                  type="button"
                  className={c.btnDelete}
                >
                  Delete
                </button>
              <label>
                Item Name:
                <input
                  {...register(`itemName${catIndex}-${subCatIndex}`, {
                    required: true,
                  })}
                  type="text"
                  placeholder="e.g., Skol"
                />
              </label>
              <label>
                Price:
                <input
                  {...register(`itemPrice${catIndex}-${subCatIndex}`, {
                    required: true,
                  })}
                  type="number"
                  placeholder="e.g., 10.0"
                />
              </label>
              <label>
                Tamanho:
                <input
                  {...register(`itemSize${catIndex}-${subCatIndex}`, {
                  })}
                  type="text"
                  placeholder="e.g., 350ml"
                />
              </label>
              <button
                className={c.btnAdd}
                onClick={() => addItem(catIndex, subCatIndex)} // Call addItem with indices
                type="button"
              >
                Add Item
              </button>

              {/* Display Items */}
              {subCategory.items.map((item, itemIndex) => (
                <div key={itemIndex} className={c.item}>
                  <p>
                    {console.log(item)}
                    {item.name} - ${item.price} - {item.tamanho ? item.tamanho :  ''}
                  </p>
                  <button
                    onClick={() => deleteItem(catIndex, subCatIndex, itemIndex)}
                    type="button"
                    className={c.btnDelete}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </form>
    </>
  );
}

// // working code

// export default function EditMenuPage() {
//   const { register, handleSubmit, reset, setValue, getValues } = useForm();
//   const [menu, setMenu] = useState([]);

//   // Function to add a category
//   const addCategory = () => {
//     const categoryName = getValues('categoryName');
//     if (categoryName) {
//       setMenu((prevMenu) => [
//         ...prevMenu,
//         { name: categoryName, subCategory: [] },
//       ]);
//       reset({ categoryName: '' });
//     }
//   };

//   // Delete a category
//   const deleteCategory = (catIndex) => {
//     setMenu((prevMenu) => prevMenu.filter((_, index) => index !== catIndex));
//   };

//   // Function to add a subcategory to a specific category
//   const addSubcategory = (catIndex) => {
//     const subCategoryName = getValues(`subCategoryName${catIndex}`);
//     if (subCategoryName) {
//       setMenu((prevMenu) =>
//         prevMenu.map((cat, index) =>
//           index === catIndex
//             ? {
//                 ...cat,
//                 subCategory: [
//                   ...cat.subCategory,
//                   { name: subCategoryName, items: [] },
//                 ],
//               }
//             : cat
//         )
//       );
//       setValue(`subCategoryName${catIndex}`, ''); // Reset specific subcategory input
//     }
//   };

//   // Delete a subcategory
//   const deleteSubcategory = (catIndex, subCatIndex) => {
//     setMenu((prevMenu) =>
//       prevMenu.map((cat, index) =>
//         index === catIndex
//           ? {
//               ...cat,
//               subCategory: cat.subCategory.filter(
//                 (_, subIndex) => subIndex !== subCatIndex
//               ),
//             }
//           : cat
//       )
//     );
//   };

//   // Function to add an item to a specific subcategory
//   const addItem = (catIndex, subCatIndex) => {
//     const itemName = getValues(`itemName${catIndex}-${subCatIndex}`);
//     const itemPrice = parseFloat(getValues(`itemPrice${catIndex}-${subCatIndex}`));
//     const itemSize = getValues(`itemSize${catIndex}-${subCatIndex}`);

//     if (itemName && !isNaN(itemPrice)) {

//       const newItem = {
//         name: itemName,
//         price: itemPrice,
//         ...(itemSize && { tamanho: itemSize })
//       }

//       setMenu((prevMenu) =>
//         prevMenu.map((cat, i) =>
//           i === catIndex
//             ? {
//                 ...cat,
//                 subCategory: cat.subCategory.map((subCat, j) =>
//                   j === subCatIndex
//                     ? {
//                         ...subCat,
//                         items: [
//                           ...subCat.items,
//                           { name: itemName, price: itemPrice, tamanho: itemSize },
//                         ],
//                       }
//                     : subCat
//                 ),
//               }
//             : cat
//         )
//       );
//       // Reset item input fields
//       setValue(`itemName${catIndex}-${subCatIndex}`, '');
//       setValue(`itemPrice${catIndex}-${subCatIndex}`, '');
//       setValue(`itemSize${catIndex}-${subCatIndex}`, '');
//     }
//   };

//   // Delete an item
//   const deleteItem = (catIndex, subCatIndex, itemIndex) => {
//     setMenu((prevMenu) =>
//       prevMenu.map((cat, i) =>
//         i === catIndex
//           ? {
//               ...cat,
//               subCategory: cat.subCategory.map((subCat, j) =>
//                 j === subCatIndex
//                   ? {
//                       ...subCat,
//                       items: subCat.items.filter((_, k) => k !== itemIndex),
//                     }
//                   : subCat
//               ),
//             }
//           : cat
//       )
//     );
//   };

//   return (
//     <form className={c.formCont} onSubmit={(e) => e.preventDefault()}>
//       {/* Category Input */}
//       <label>
//         Categoria:
//         <div>
//           <input
//             {...register('categoryName', { required: true })}
//             type="text"
//             placeholder="Categoria ex. Bebidas Alcoólicas"
//           />
//           <button
//             className={c.btnAdd}
//             onClick={addCategory} // Call addCategory directly
//             type="button"
//           >
//             Add Category
//           </button>
//         </div>
//       </label>

//       {/* Categories and Subcategories */}
//       {menu.map((category, catIndex) => (
//         <div key={catIndex}>
//           <h3>{category.name}</h3>
//           <button onClick={() => deleteCategory(catIndex)} type="button" className={c.btnDelete}>
//               Delete
//             </button>
//           <label>
//             Subcategoria:
//             <div>
//               <input
//                 {...register(`subCategoryName${catIndex}`, {
//                   required: true,
//                 })}
//                 type="text"
//                 placeholder="Subcategoria ex. Lata"
//               />
//               <button
//                 className={c.btnAdd}
//                 onClick={() => addSubcategory(catIndex)} // Call addSubcategory with index
//                 type="button"
//               >
//                 Add Subcategory
//               </button>
//             </div>
//           </label>

//           {/* Subcategories and Items */}
//           {category.subCategory.map((subCategory, subCatIndex) => (
//             <div key={subCatIndex} className={c.subcategory}>
//               <h4>{subCategory.name}</h4>
//               <button
//                   onClick={() => deleteSubcategory(catIndex, subCatIndex)}
//                   type="button"
//                   className={c.btnDelete}
//                 >
//                   Delete
//                 </button>
//               <label>
//                 Item Name:
//                 <input
//                   {...register(`itemName${catIndex}-${subCatIndex}`, {
//                     required: true,
//                   })}
//                   type="text"
//                   placeholder="e.g., Skol"
//                 />
//               </label>
//               <label>
//                 Price:
//                 <input
//                   {...register(`itemPrice${catIndex}-${subCatIndex}`, {
//                     required: true,
//                   })}
//                   type="number"
//                   placeholder="e.g., 10.0"
//                 />
//               </label>
//               <label>
//                 Tamanho:
//                 <input
//                   {...register(`itemSize${catIndex}-${subCatIndex}`, {
//                   })}
//                   type="text"
//                   placeholder="e.g., 350ml"
//                 />
//               </label>
//               <button
//                 className={c.btnAdd}
//                 onClick={() => addItem(catIndex, subCatIndex)} // Call addItem with indices
//                 type="button"
//               >
//                 Add Item
//               </button>

//               {/* Display Items */}
//               {subCategory.items.map((item, itemIndex) => (
//                 <div key={itemIndex} className={c.item}>
//                   <p>
//                     {console.log(item)}
//                     {item.name} - ${item.price} - {item.tamanho ? item.tamanho :  ''}
//                   </p>
//                   <button
//                     onClick={() => deleteItem(catIndex, subCatIndex, itemIndex)}
//                     type="button"
//                     className={c.btnDelete}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       ))}
//     </form>
//   );
// }
