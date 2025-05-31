'use client'
import { useState, useEffect } from 'react'
import Cardapio from "@/app/components/Cardapio/Cardapio";
import c from './tablePage.module.css';

export default function Menu({params}) {
  const [tableNumber, setTableNumber] = useState('');
  const [quioskeName, setQuioskeName] = useState('');
  const [_id, setId] = useState('');
  
  useEffect(() => {
    async function fetchParams() {
      const { id } = await params;
      if (id && id[0]) {
        const [tableNum, quioske, itemId] = id[0].split('_');
        setTableNumber(tableNum);
        setQuioskeName(quioske);
        setId(itemId);
      }
    }
    fetchParams();
  }, [params]);
  console.log(tableNumber, quioskeName, _id);

  return (
    <div className={c.cont}>
      <div className={c.MenuBusinessName}>
        {quioskeName}
      </div>
      <Cardapio quioskeName={quioskeName} tableNumber={tableNumber} _id={_id}/>
    </div>
  )
}


// const [tableNumber, setTableNumber] = useState('');
// const [quioskeName, setQuioskeName] = useState('');
// const [_id, setId] = useState('');

// useEffect(() => {
//   async function fetchParams() {
//     const { id } = await params;
//     if (id && id[0]) {
//       const [tableNum, quioske, itemId] = id[0].split('_');
//       setTableNumber(tableNum);
//       setQuioskeName(quioske);
//       setId(itemId);
//     }
//   }
//   fetchParams();
// }, [params]);
// console.log(tableNumber, quioskeName, _id);