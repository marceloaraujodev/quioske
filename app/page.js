"use client";
import { useEffect, useState } from "react";
import { useMenu } from "./hooks/useMenu";
import Cardapio from "./components/Cardapio/Cardapio";
import Login from "./components/Login/Login";
import Tables from "./components/Tables/Tables";
import c from "./page.module.css";
import OrdersPage from "./components/OrdersPage/OrdersPage";
import Nav from "./components/Nav/Nav";
import Hero from './components/Hero/Hero';
import { useOrderContext } from "./Providers/OrderContext";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  // const { isModalOpen, setIsModalOpen } = useOrderContext();
  const { isMenuOpen, menuHeight, toggleMenu } = useMenu();

  return (
    <>
      <Nav
        className={c.x}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        menuHeight={menuHeight}
        // onAnimationComplete={handleAnimationComplete}
      />
     <motion.div className={c.cont}
       initial={{ y: 0 }}
       animate={{ y: isMenuOpen ? menuHeight : 0 }}
       exit={{ y: 0}}
       transition={{ duration: 0.5 }}
      //  style={{
      //    backgroundColor: 'white',
      //  }}
     >
      <Hero />
       {/* <Login /> */}
      {/* <Tables /> */}
      {/* <Cardapio 
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      /> */}
      {/* <OrdersPage /> */}
     </motion.div>
    </>
  );
}
