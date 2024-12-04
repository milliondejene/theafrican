// useScroll.js
import { useState, useEffect } from 'react';

const useScroll = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSubcategoriesVisible, setIsSubcategoriesVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
        setIsSubcategoriesVisible(false);
      } else {
        setIsScrolled(false);
        setIsSubcategoriesVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { isScrolled, isSubcategoriesVisible };
};

export default useScroll;
