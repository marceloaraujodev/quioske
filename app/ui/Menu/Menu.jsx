import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSession, signOut } from "next-auth/react";
import Link from 'next/link';
import c from './Menu.module.css';


export default function MenuBtn() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  return (
    <>
    <div className={c.cont}>
      <div className={c.linkCont}>
      <Link className={`btnLink`} href="/vendor">
        Menu
      </Link>
      </div>
      {session ? (
          <>
            {/* <p>{session.user?.email}</p> */}
            <button className="btnLink" onClick={() => signOut({ callbackUrl: 'http://localhost:3000' })}>Logout</button>
          </>
        ) : null}
    </div>
    </>
  )
}