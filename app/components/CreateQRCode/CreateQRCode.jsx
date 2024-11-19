import { useEffect, useState } from 'react';
import generateQRCode from '../../utils/generateQRCode';
import { useSession } from 'next-auth/react';
import dotenv from 'dotenv';
import printQrCode from '../../utils/printQRCode';
import MenuBtn from '@/app/ui/Menu/Menu';
import c from './CreateQRCode.module.css';
dotenv.config();

export default function CreateQRCode({ empresa, _id }) {
  const [tableNumber, setTableNumber] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState(null);

  const qrCode = async () => {
    const url = await generateQRCode(
      `${process.env.NEXT_PUBLIC_URL}/${tableNumber}_${empresa}_${_id}`
    );
    setQrCodeUrl(url);
    console.log(
      `${process.env.NEXT_PUBLIC_URL}/customer/table/${tableNumber}_${empresa}_${_id}`
    );
  };

  const print = () => printQrCode(qrCodeUrl, 'Small', empresa, tableNumber); // only 2 sizes "Large" and "Small"

  return (
    <>
      <MenuBtn />
      <div className={c.cont}>
        <div className={c.innerCont}>
          <label htmlFor="tableNumber">Gerar Código de Barras</label>
          <div className={c.btnAndInputCont}>
            <input
              value={tableNumber}
              type="number"
              id="tableNumber"
              name="tableNumber"
              placeholder="Numero da mesa"
              onChange={(e) => setTableNumber(e.target.value)}
            />
            <button type="submit" onClick={qrCode} className="btnLink">
              criar
            </button>
            {qrCodeUrl && (
              <>
                <img src={qrCodeUrl} alt="QR Code" />
                <a href="#" onClick={print}>
                  Imprimir
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
