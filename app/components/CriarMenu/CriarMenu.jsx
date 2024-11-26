'use client';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
// import menuData from '@/app/data/menuData';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import c from './CriarMenu.module.css';

export default function CriarMenu() {
  const { data: session, status } = useSession();
  const { register, handleSubmit, reset, setValue, getValues } = useForm();
  const [menu, setMenu] = useState([]);

  // Function to add a category
  const addCategory = () => {
    const menuName = getValues('MenuName');
    const categoryName = getValues('categoryName');
    if (categoryName) {
      setMenu((prevMenu) => [
        ...prevMenu,
        { menuName, category: categoryName, subCategory: [] },
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
    const itemPrice = parseFloat(
      getValues(`itemPrice${catIndex}-${subCatIndex}`)
    );
    const itemSize = getValues(`itemSize${catIndex}-${subCatIndex}`);

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
                subCategory: cat.subCategory.map((subCat, j) =>
                  j === subCatIndex
                    ? {
                        ...subCat,
                        items: [
                          ...subCat.items,
                          {
                            name: itemName,
                            price: itemPrice,
                            tamanho: itemSize,
                          },
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
    const res = await axios.post('/api/createmenu', {
      session,
      menu: menuData,
    });
    console.log(res);
  }

  function onSubmit(data) {
    console.log('Data', data);
    const menuData = {
      menuName: data.MenuName,
      categories: menu,
    };
    console.log('menu Data', menuData);
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
          <label>
            Nome do Menu:
            <div className={c.catCont}>
              <input
                {...register('MenuName', { required: true })}
                type="text"
                placeholder="Nome do Menu"
              />
            </div>
          </label>
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
            <div key={catIndex}>
              <div className={c.header}>
                <h3>{category.name}</h3>
                <button
                  onClick={() => deleteCategory(catIndex)}
                  type="button"
                  className="btnLink">
                  Delete
                </button>
              </div>
              <label className={`${c.label} ${c.subCategory}`}>
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
              </label>

              {/* Subcategories and Items */}
              {category.subCategory.map((subCategory, subCatIndex) => (
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
                        // { required: true,}
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
                        // { required: true, }
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
                    onClick={() => addItem(catIndex, subCatIndex)} // Call addItem
                    type="button">
                    + Foto
                  </button>
                  <button
                    className={`btnLink ${c.addItem}`}
                    onClick={() => addItem(catIndex, subCatIndex)} // Call addItem
                    type="button">
                    Add Item
                  </button>

                  {/* Display Items */}
                  {subCategory.items.map((item, itemIndex) => (
                    <div className={c.itemWrapper} key={itemIndex}>
                      <div  className={c.item}>
                        <div className={c.itemName}>
                          {/* {console.log(item)} */}
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
              ))}
            </div>
          ))}
        </form>
      </div>
    </>
  );
}
