
import { useEffect, useState } from 'react';
import generateQRCode from '../../utils/generateQRCode';
import { useSession } from "next-auth/react";
import dotenv from 'dotenv';
import c from './CreateQRCode.module.css';
dotenv.config() 



export default function CreateQRCode({empresa}) {
  const [tableNumber, setTableNumber] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  
  const qrCode = async () =>  {
    const url = await generateQRCode(`${process.env.NEXT_PUBLIC_URL}/${tableNumber}_${empresa}`);
    setQrCodeUrl(url); 
    console.log(url)
  };

  return (
    <div className={c.cont}>
      <div className={c.form}>
        <label htmlFor="qrcode">Gerar Código de Barras</label>
        <input 
          value={tableNumber}
          type="number" 
          id="tableNumber" 
          name="tableNumber"
          placeholder='Numero da mesa'
          onChange={(e) => setTableNumber(e.target.value)}
        />
        <button type='submit' onClick={qrCode}>criar</button>
      </div>
      {qrCodeUrl && (
          <div>
            <img src={qrCodeUrl} alt="QR Code" />
          </div>
        )}
    </div>
  );
}
