'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
// import Tables from '../components/Tables/Tables';
import axios from 'axios';
import MenuBtn from '../ui/Menu/Menu';
import Footer from './Footer/Footer';
import Link from 'next/link';
import c from './protected.module.css';

export default function Protected() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
        if (session?.user?.email) { // Check if session and session.user exist
          try {
            const res = await axios.get(`/api/user?email=${session.user.email}`);
            setUser(res.data.user);
            console.log('this is session inside useeffect', session);
          } catch (error) {
            console.log(error);
          }
        }
      };
      fetchData();
  }, [session]);

  // if (status === "loading") return <p>Loading...</p>;
  if (!session) return null;

  return (
    <>
      <MenuBtn />
      <div className={c.cont}>
        <div className={c.wrapper}>
          <div className={c.controlPanel}>
            <div className={c.title}>Painel de Controle</div>
            <Link href="/vendor/orders">
              <div className={c.cardMenu}>Pedidos</div>
            </Link>
            <Link href="/vendor/qrcode">
              <div className={c.cardMenu}>Gerar QR</div>
            </Link>
            <Link href="/vendor/menu">
              <div className={c.cardMenu}>Criar Menu</div>
            </Link>
            <Link href="/vendor/tables">
              <div className={c.cardMenu}>Mesas</div>
            </Link>
          </div>
        </div>
        {/* <Tables empresa={user?.empresa}/> */}
        {/* <CreateQRCode empresa={user?.empresa} _id={user?._id} /> */}
      </div>
      <Footer />
    </>
  );
}
