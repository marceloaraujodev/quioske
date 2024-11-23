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
import HowItWorks from "./components/HowItWorks/HowItWorks";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Footer/Footer";
import SalesIncrease from "./components/SalesIncrease/SalesIncrease";
import Testimonials from "./components/Testimonials/Testimonials";
import { motion } from "framer-motion";

export default function Home() {
  // const { isModalOpen, setIsModalOpen } = useOrderContext();
  const { isMenuOpen, menuHeight, toggleMenu } = useMenu();

  return (
    <>
      <Nav
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        menuHeight={menuHeight}
      />
     <motion.div className={c.cont}
       initial={{ y: 0 }}
       animate={{ y: isMenuOpen ? menuHeight : 0 }}
       exit={{ y: 0}}
       transition={{ duration: 0.5 }}
     >
      <Hero />
      <HowItWorks />
      <FAQ />
      <Testimonials />
      <SalesIncrease />
       {/* <Login /> */}
      {/* <Tables /> */}
      {/* <Cardapio 
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      /> */}
      {/* <OrdersPage /> */}
     </motion.div>
     <Footer />
    </>
  );
}
