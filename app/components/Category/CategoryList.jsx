'use client';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
// import createMenu from '@/app/utils/createMenu';
import c from './CategoryList.module.css';

export default function CategoryList() {
  const { data: session, status } = useSession();
  const { register, handleSubmit, reset, setValue, getValues } = useForm();
  const [menu, setMenu] = useState([]);
  const [shouldCreateMenu, setShouldCreateMenu] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(); // track them by index

  useEffect(() => {
    if(shouldCreateMenu) {
      createMenu(menu);
    }
  }, [menu, shouldCreateMenu])

    // Function to add a category
    const addCategory = () => {
      // const menuName = getValues('MenuName');
      const categoryName = getValues('categoryName');
      if (categoryName.trim()) {
        setMenu((prevMenu) => [ // 2 sets menu
          ...prevMenu,
          { 
            // menuName, 
            category: categoryName, 
            // subCategory: []
           },
        ]);
        reset({ categoryName: '' });
      }
      setShouldCreateMenu(true)
    };
  
    function onSubmit(data) {
      console.log('Data', data);
      const menuData = {
        // menuName: data.MenuName,
        categories: menu,
      };
      console.log('menu Data', menuData);
    }

    async function createMenu(menuData) {
      console.log('menudata inside create func', menuData);
  
      // console.log(session);
      const res = await axios.post('/api/category', {
        session,
        menu: menuData,
      });
      console.log(res);
    }

    function handleCatClick(catIndex){
      setCurrentCategory(catIndex);
    }

  return (
    <div className={c.cont}>
      <button className="btnLink" onClick={() => createMenu(menu)}>
        Create Menu
      </button>
      <form className={c.formCont} onSubmit={handleSubmit(onSubmit)}>
        {/* Menu Name */}

        {/* <label>
          Nome do Menu:
          <div className={c.catCont}>
            <input
              {...register('MenuName', { required: true })}
              type="text"
              placeholder="Nome do Menu"
            />
          </div>
        </label> */}

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
              onClick={addCategory} // Call addCategory directly 1 
              type="button">
              +
            </button>
          </div>
        </label>
      </form>


      {/* Display Added Categories */}
      <div className={c.catListCont}>
          {menu && menu.map((category, index) => (
                  <div 
                    key={index} 
                    className={c.categoryItem} 
                    onClick={() => handleCatClick(index)}
                    style={{
                      backgroundColor: currentCategory === index ? 'lightblue' : 'transparent', // Change background color based on state
                    }}
                    >
                    <span>{category.category}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setMenu((prev) => {
                          return prev.filter((_, idx) => idx !== index )
                        })
                      }>
                      Remove
                    </button>
                  </div>
                ))}
        </div>

      
        {/* itens display */}
   
    </div>

  );
}
