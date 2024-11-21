import c from './Hero.module.css';
import { MdArrowRightAlt } from "react-icons/md";

import React from 'react'

export default function Hero() {
  return (
    <div className={c.cont}>
      <div className={c.leftBlock}>
        <div className={c.title}>
        Gerenciamento de menus e pedidos para restaurantes
        </div>
        <p>Seamless menu management tailored to your bar and restaurant priorities</p>
        <div className={c.cta}>
          <button>Saiba mais</button>
          <a className={c.link}>
          <span className={c.how}>como funciona</span> <MdArrowRightAlt size={25}/>
          </a>
        </div>
      </div>
      <div className={c.rightBlock}>
        <div className={c.imgCont}>
          <img className={c.img} src="./businesswoman.webp" alt="img" />
        </div>
      </div>
    </div>
  )
}
