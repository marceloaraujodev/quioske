'use client';
import { useState } from 'react';
import axios from 'axios';
import { FaPhoneAlt } from 'react-icons/fa';
import { MdOutlineMailOutline } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa6';
import { FaLocationDot } from 'react-icons/fa6';
import { FiLogIn } from "react-icons/fi";
import Link from 'next/link';

import c from './Footer.module.css';

export default function Footer() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    console.log('click');
    const contactForm = {
      name,
      lastName,
      email,
      message,
    }

    // console.log(contactForm);

    // change url for message route url
    const res = await axios.post('/api/contact', contactForm);
    // const res = {status: 200};

    if (res.status === 200) {
      alert('Mensagem enviada com sucesso!');
      setName('');
      setLastName('');
      setEmail('');
      setMessage('');
    } else {
      alert('Ocorreu um erro ao enviar a mensagem!');
    }
  }

  return (
    <div className={c.cont} id='contato'>
      <p className={c.contato}>Contato</p>
      <div className={c.wrapper}>
        <div className={c.icons}>
          {/* <div className={c.iconCont}>
            <FaPhoneAlt className={c.iconItem} /> 55 47 99200 9823
          </div> */}
          {/* <div className={c.iconCont}>
            <MdOutlineMailOutline className={c.iconItem} /> gohb@gohb.com.br
          </div> */}
          <div className={c.iconCont}>
            <FiLogIn className={c.iconItem} /> <Link href='/login'>Login</Link>
          </div>
          <div className={c.iconCont}>
            <FaWhatsapp className={c.iconItem} /> 55 47 99200 9823
          </div>
          <div className={c.iconCont}>
            <FaInstagram className={c.iconItem} /> quioske
          </div>
          <div className={c.iconCont}>
            <div>
              <FaLocationDot className={c.iconItem} />
            </div>
            <div>
              Rua Miguel Matte, Pioneiros Balneário Camboriú, SC 
            </div>
          </div>
        </div>
        {/* <div className={c.divider}></div> */}
        <form className={c.form} onSubmit={handleSubmit}>
          <div className={c.name}>
            <label>
              Nome:
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
              />
            </label>
            <label>
              Sobrenome:
              <input
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                type="text"
              />
            </label>
          </div>
          <label>
            E-mail:
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
            />
          </label>
          <label>
            Mensagem:
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              placeholder="Mensagem"></textarea>
          </label>
          <label>
            <button type="submit">Enviar</button>
          </label>
        </form>
      </div>
    </div>
  );
}
