"use client";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import contactUs from "@/app/utils/whatsapp";
import c from "./Nav.module.css";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600); // Adjust the breakpoint as needed
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check screen size on initial load

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleMenuClick() {
    console.log("Menu clicked");
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
    <div className={c.mainCont}>

      <div className={c.cont}>
        <div className={c.wrapper}>


          <div className={c.innerCont}>
            <motion.div className={`${c.menuIcon}`} onClick={handleMenuClick}>
              <RxHamburgerMenu size={25} />
            </motion.div>
            <div className={c.logoCont}>
            <img className={c.logo} src="/quiosque.png" alt="logo" />
            </div>

            <div>
              <div className={c.icons}>
                <FaWhatsapp onClick={contactUs} className={c.iconsItem} size={25} />
                {/* <a href="https://www.instagram.com/gobags.br/" target="_blank"><FaInstagram className={c.iconsItem} size={25} /></a> */}
                {/* <FaShoppingCart className={c.iconsItem} size={25} /> */}
              </div>
            </div>
          </div>
        </div>



      </div>
  
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
          className={`${isMenuOpen ? (isSmallScreen ? c.menuSmall : c.menu) : ""}`}
          initial={{ top: "0", opacity: "0", opacity: 0 }}
          animate={{ top: isMenuOpen ? "100px" : 0, opacity: isMenuOpen ? 1 : 0 }}
          exit={{ top: "-100px" , opacity: 0}}
          transition={{ duration: 0.5 }}
          style={{
            backgroundColor: 'white',
            top: 100,
            width: isSmallScreen ? "100vw" : "100vw",
            zIndex: -1,
          }}
          >
          {/* <div className={c.closeIcon} onClick={handleMenuClick}>
            <IoCloseSharp size={40} />
          </div> */}
          {isMenuOpen && (
            <>
              <ul className={c.ul}>
                <li className={c.menuItems}><a onClick={() => setIsMenuOpen(false)} href="#gobags">O que é Go Bags</a></li>
                <li className={c.menuItems}><a onClick={() => setIsMenuOpen(false)} href="#privatelabel">Private Label</a></li>
                <li className={c.menuItems}><a onClick={() => setIsMenuOpen(false)} href="#contato">Contato</a></li>
              </ul>
            </>
          )}
              </motion.div>
        )}

          </AnimatePresence>
    </div>

    </>
  );
}

// animation that I want!!
// animate={{height: '100vh', width: '400px', borderRadius: '0', left: '0', top: '0', position: 'absolute',  }}
// transition={{duration: 1}}
