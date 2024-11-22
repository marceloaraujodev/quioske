"use client";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMenu } from "@/app/hooks/useMenu";
import contactUs from "@/app/utils/whatsapp";
import c from "./Nav.module.css";


export default function Nav({ isMenuOpen, toggleMenu }) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);
  const ulRef = useRef(null);


  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600); // Adjust the breakpoint as needed
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check screen size on initial load

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if(ulRef.current){
      console.log(ulRef);
      const height = ulRef.current.scrollHeight;
      setMenuHeight(height);
    }
  }, [isMenuOpen]);

  return (
    <>

      <div className={c.cont}>
        <div className={c.wrapper}>
          <div className={c.innerCont}>
            <motion.div className={`${c.menuIcon}`} onClick={() => toggleMenu(isMenuOpen ? 0 : menuHeight)}>
              <RxHamburgerMenu size={25} />
            </motion.div>
            <div className={c.logoCont}>
            <img className={c.logo} src="/quiosque.png" alt="logo" />
            </div>

            <div>
              <div className={c.icons}>
                <FaWhatsapp onClick={contactUs} className={c.iconsItem} size={25} />
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
          className={`${isMenuOpen ? (isSmallScreen ? c.menuSmall : c.menu) : ""}`}
          initial={{ top: "0", opacity: 0 }}
          animate={{ top: isMenuOpen ? "100px" : 0, opacity: isMenuOpen ? 1 : 0, height: isMenuOpen ? menuHeight : 0 }}
          exit={{ top: "-100px" , opacity: 0}}
          transition={{ duration: 0.5 }}
          style={{
            top: 100,
            width: isSmallScreen ? "100vw" : "100vw",
            zIndex: 900,
          }}
          
          >
          {isMenuOpen && (
            <>
              <ul className={c.ul} ref={ulRef}>
                <li className={c.menuItems}><a 
                // onClick={() => setIsMenuOpen(false)}
                 href="#recursos">Recursos</a></li>
                <li className={c.menuItems}><a 
                // onClick={() => setIsMenuOpen(false)}
                 href="#faq">Perguntas frequentes</a></li>
                <li className={c.menuItems}><a 
                // onClick={() => setIsMenuOpen(false)} 
                href="#otimizando">Otimizando o seu negócio</a></li>
                <li className={c.menuItems}><a 
                // onClick={() => setIsMenuOpen(false)} 
                href="#contact">Contato</a></li>
              </ul>
            </>
          )}
              </motion.div>
        )}

          </AnimatePresence>
  

    </>
  );
}

// animation that I want!!
// animate={{height: '100vh', width: '400px', borderRadius: '0', left: '0', top: '0', position: 'absolute',  }}
// transition={{duration: 1}}
