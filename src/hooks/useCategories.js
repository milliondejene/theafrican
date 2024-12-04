import { useStaticQuery, graphql } from "gatsby";
import { useMemo } from "react";

const useCategories = () => {
  const data = useStaticQuery(graphql`
    query {
      allWpCategory {
        edges {
          node {
            id
            name
            slug
            parentId
          }
        }
      }
    }
  `);

  // Process the data only once using useMemo for performance
  const { categories, subcategoriesMap } = useMemo(() => {
    const nodes = data.allWpCategory.edges.map((edge) => edge.node);

    // Extract parent categories
    const categories = nodes.filter(
      (node) => node.parentId === null && node.slug !== "uncategorized"
    );

    // Map parent categories to their subcategories
    const subcategoriesMap = nodes.reduce((acc, node) => {
      if (node.parentId) {
        if (!acc[node.parentId]) acc[node.parentId] = [];
        acc[node.parentId].push(node);
      }
      return acc;
    }, {});

    return { categories, subcategoriesMap };
  }, [data]);

  // Function to retrieve subcategories for a given category slug
  const getSubcategories = (categorySlug) => {
    const category = categories.find((cat) => cat.slug === categorySlug);
    return category ? subcategoriesMap[category.id] || [] : [];
  };

  return { categories, getSubcategories };
};

export default useCategories;
