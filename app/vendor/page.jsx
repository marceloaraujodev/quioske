'use client'
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Tables from "../components/Tables/Tables";
import axios from 'axios'
import SignedInAs from "../components/SignedInAs/SignedInAs";
import CreateQRCode from "@/app/components/CreateQRCode/CreateQRCode";
import Link from "next/link";
import c from './protected.module.css';

export default function Protected() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState();

  useEffect(() => {

    const fetchData = async () => {
      if(session.user.email){
        try {
          const res = await axios.get(`/api/user?email=${session.user.email}`)
          // console.log(res.data.user);
          setUser(res.data.user);
          console.log('this is session inside useeffect', session);
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchData();
  }, [session]); 
  
  
  // if (status === "loading") return <p>Loading...</p>;
  if(!session) return null;

  return (
    <>
    <SignedInAs />
    <h1>Protected</h1>
    <div className={c.controlPanel}>
      <Link href='/vendor/orders' className="btnLink">Orders</Link>
      <Link href='/vendor/qrcode' className="btnLink">Gerar QR</Link>
    </div>
    {/* <Tables empresa={user?.empresa}/> */}
    <CreateQRCode empresa={user?.empresa}  _id={user?._id}/> 
    </>
  )
}