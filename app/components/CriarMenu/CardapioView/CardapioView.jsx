import { useState, useEffect, useRef } from 'react';
import { RiImageAddLine } from "react-icons/ri";
import c from './CardapioView.module.css';
// import menuData from '@/app/data/menuData';


export default function CardapioView({menu, addPhoto, deleteItem}) {

  const fileInputRef = useRef(null);

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click
    }
  };

console.log(menu);
  return (
<div className={c.cardapioCont}>
      {menu && menu.length > 0 ? (
        menu.map((menu, catIndex) => (
          <div key={catIndex} className={c.menuSection}>
            {menu.category ? (
              <div key={menu.category} className={c.categorySection}>
                {/* Category Name */}
                <h3 className={c.category}>{menu.category}</h3>

                {/* Items List */}
                <div className={c.itemsCont}>
                  {menu.items.map((item, itemIndex) => (
                    <div key={item.itemId || itemIndex} className={c.item}>
                      <div className={c.imgCont}>
                        {/* Item Image */}
                        {item.img ? (
                          <img
                            src={item.img}
                            alt={item.name}
                            className={c.itemImg}
                          />
                        ) : (
                          <div>
                            <RiImageAddLine className={c.addImgIcon} size={40} onClick={triggerFileInput}/> 
                            <input type="file" style={{ display: 'none' }} ref={fileInputRef} onChange={(e) => addPhoto(e, catIndex, itemIndex)} />
                          </div>
                        )}

                        {/* Item Name */}
                        <div className={c.itemName}>{item.name}</div>

                        {/* Optional Description */}
                        {item.description ? (
                          <p className={c.itemDescription}>
                            {item.description}
                          </p>
                        ) : null}
                      </div>
                      

                      {/* Item Details */}
                      <div className={c.itemDetails}>
                        {/* Price */}
                        <div className={c.priceCont}>
                          <p>R$ {item.price.toFixed(2)}</p>
                          <button type="button" className='btnLink' onClick={() => deleteItem(catIndex, itemIndex)}>Deletar</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ))
      ) : (
        <p>No menu data available.</p>
      )}
    </div>

  )
}