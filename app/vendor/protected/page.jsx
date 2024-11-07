'use client'
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Use 'next/navigation' for Next.js App Router I will remember this one way or another!
import Tables from "../../components/Tables/Tables";
import axios from 'axios'
import SignedInAs from "../../components/SignedInAs/SignedInAs";
import CreateQRCode from "@/app/components/CreateQRCode/CreateQRCode";
import c from './protected.module.css';

export default function Protected() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState();

  const router = useRouter();


  useEffect(() => {
    const fetchData = async () => {
      // fetch user data
      console.log(session.session.user.email);
      if(session.session.user.email){
        try {
          console.log('before axios');
          const res = await axios.get(`/api/user?email=${session.session.user.email}`)
          console.log(res.data.user);
          setUser(res.data.user);
        } catch (error) {
          
        }
      }
    }
    fetchData();
    console.log('x');
  }, []); // user to Dependency Array primarily for React best practices
  
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]); // router to Dependency Array primarily for React best practices
  
  if (status === "loading") return <p>Loading...</p>;

  return (
    <>
    <SignedInAs />
    <CreateQRCode empresa={user?.empresa} />
    <h1>Protected</h1>
    <Tables empresa={user?.empresa}/>
    
    </>
  )
}