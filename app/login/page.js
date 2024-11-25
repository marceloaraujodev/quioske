'use client';
import { useMenu } from '../hooks/useMenu';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Login from '../components/Login/Login';
import Nav from '../components/Nav/Nav';
import Footer from '../components/Footer/Footer';
import { motion } from 'framer-motion';
import c from './loginRoute.module.css'
export default function LoginRoute() {
  const { isMenuOpen, menuHeight, toggleMenu } = useMenu();

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect authenticated users
    if (status === 'authenticated') {
      router.replace('/vendor');
    }
  }, [status, router]);

  // Prevent rendering while session is loading or user is authenticated
  if (status === 'loading' || status === 'authenticated') {
    return null; // Or a spinner/loader if needed
  }

  return (
    <>
      <Nav
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        menuHeight={menuHeight}
      />
        <motion.div
          className={c.content}
          initial={{ y: 0 }}
          animate={{ y: isMenuOpen ? menuHeight : 0 }}
          exit={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
        <div className={c.body}>
          <Login  />
        </div>
        <Footer />
        </motion.div>
    </>
  );
}
