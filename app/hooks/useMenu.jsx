import { useState } from 'react';

export const useMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);

  const toggleMenu = (height) => {
    setIsMenuOpen((prev) => {
      const newState = !prev;
      setMenuHeight(newState ? height : 0);
      return newState;
    });
  };

  return { isMenuOpen, menuHeight, toggleMenu, setMenuHeight, setIsMenuOpen };
};
