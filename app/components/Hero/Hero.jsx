import Link from "next/link";
import { MdArrowRightAlt } from "react-icons/md";
import contactUs from "@/app/utils/whatsapp";
import c from './Hero.module.css';

import React from 'react'

export default function Hero() {
  const handleScroll = (event, targetId) => {
    event.preventDefault(); // Prevent default link behavior
    
    const targetElement = document.querySelector(targetId); // Select the target element
    const openMenuSize = 100; // Dynamic menu size to deduct
    const offset = targetElement.offsetTop - openMenuSize; // Calculate offset
    
    console.log(targetElement.offsetTop);

    // Scroll to the calculated position
    window.scrollTo({
      top: offset,
      behavior: 'smooth', // Smooth scroll
    });
  };
  return (
    <div className={c.cont}>
      <div className={c.leftBlock}>
        <div className={c.title}>
        Gerenciamento de menus e pedidos para restaurantes
        </div>
        <p>Seamless menu management tailored to your bar and restaurant priorities</p>
        <div className={c.cta}>
          <button onClick={contactUs}>Saiba mais</button>
          <Link className={c.link} href='#recursos' onClick={(e) => handleScroll(e, "#recursos")}>
          <span className={c.how}>como funciona</span> <MdArrowRightAlt size={25}/>
          </Link>
        </div>
      </div>
      <div className={c.rightBlock}>
        <div className={c.imgCont}>
          <img className={c.img} src="./Business-Growing 1.png" alt="img" />
        </div>
      </div>
    </div>
  )
}
