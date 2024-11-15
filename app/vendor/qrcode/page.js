'use client';
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import CreateQRCode from "@/app/components/CreateQRCode/CreateQRCode";
import axios from 'axios';

export default function page() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState();

  useEffect(() => {
    console.log("useEffect triggered with session:", session);
    console.log("Session:", session); // Check if session is available
    if (session?.user?.email) {
      const fetchData = async () => {
        console.log("Fetching user data...");
        try {
          const res = await axios.get(`/api/user?email=${session.user.email}`);
          setUser(res.data.user);
          console.log("User data fetched:", res.data.user);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchData();
    } else {
      console.log("Session data unavailable or incomplete");
    }
  }, [session]);

  return (
    <>
   <CreateQRCode empresa={user?.empresa}  _id={user?._id}/> 
    </>
  )
}