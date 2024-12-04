// utils/categoryHelpers.js
export const getFilteredCategories = (edges) =>
    edges.map((edge) => edge.node).filter((category) => category.parentId === null && category.slug !== "uncategorized");
  
  export const getSubcategories = (edges, activeCategoryId) =>
    edges.map((edge) => edge.node).filter((subcategory) => subcategory.parentId === activeCategoryId);
  