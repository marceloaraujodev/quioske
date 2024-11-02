'use client'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Use 'next/navigation' for Next.js App Router I will remember this one way or another!
import { useEffect } from "react";
import SignedInAs from "../components/SignedInAs/SignedInAs";
import c from './protected.module.css';

export default function Protected() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]); // router to Dependency Array primarily for React best practices
  
  if (status === "loading") return <p>Loading...</p>;

  return (
    <>
    <SignedInAs />
    <h1>Protected</h1>
    </>
  )
}