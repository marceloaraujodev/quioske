import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSession, signOut } from "next-auth/react";
import c from './SignedInAs.module.css';

export default function SignedInAs() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);
  console.log('SignedInAs.jsx session log',session);

  return (
    <div className={c.cont}>
      {session ? (
        <>
          <p>{session.user?.email}</p>
          <button onClick={() => signOut({ callbackUrl: 'http://localhost:3000' })}>Sign out</button>
        </>
      ) : null}
    </div>
  );
}
