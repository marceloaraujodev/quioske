import c from './Hero.module.css';
import { MdArrowRightAlt } from "react-icons/md";

import React from 'react'

export default function Hero() {
  return (
    <div className={c.cont}>
      <div className={c.title}>
       Facilitando seu gerenciamento de menus e pedidos
      </div>
      <p>Seamless menu management tailored to your bar and restaurant priorities</p>
      <div className={c.cta}>
        <button>Saiba mais</button>
        <a className={c.link}>
        <span className={c.how}>how it works</span> <MdArrowRightAlt size={25}/>
        </a>
      </div>
    </div>
  )
}
