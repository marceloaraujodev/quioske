'use client';
import { useMenu } from '../hooks/useMenu';
import Login from '../components/Login/Login';
import Nav from '../components/Nav/Nav';
import Footer from '../components/Footer/Footer';
import { motion } from 'framer-motion';
import c from './loginRoute.module.css'
export default function LoginRoute() {
  const { isMenuOpen, menuHeight, toggleMenu } = useMenu();
  return (
    <>
      <Nav
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        menuHeight={menuHeight}
      />
      <motion.div
        className={c.test}
        initial={{ y: 0 }}
        animate={{ y: isMenuOpen ? menuHeight : 0 }}
        exit={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >

      <Login />
      </motion.div>
      <Footer />
    </>
  );
}
