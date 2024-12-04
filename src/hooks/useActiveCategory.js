import { useState } from "react";
import { useLocation } from "@reach/router";

const useActiveCategory = () => {
  const location = useLocation();
  
  // Retrieve the current category and subcategory from the URL
  const currentPath = location.pathname.split("/").filter(Boolean);
  const currentCategorySlug = currentPath[0] || null;
  const currentSubcategorySlug = currentPath[1] || null;

  // State management for active category and subcategory
  const [activeCategory, setActiveCategory] = useState(currentCategorySlug);
  const [activeSubcategory, setActiveSubcategory] = useState(currentSubcategorySlug);

  return { activeCategory, activeSubcategory, setActiveCategory, setActiveSubcategory };
};

export default useActiveCategory;
