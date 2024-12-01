const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allWpCategory {
        edges {
          node {
            id
            slug
            parentId
            name
            wpChildren {
              nodes {
                id
                slug
                name
              }
            }
            posts {
              nodes {
                id
                slug
                title
              }
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const categories = result.data.allWpCategory.edges.map(edge => edge.node);

  // Create pages for all categories (including subcategories)
  categories.forEach(category => {
    // Create a category page with a clean URL
    createPage({
      path: `/${category.slug}/`,  // Clean URL, removing "/category/"
      component: path.resolve(`./src/templates/category-template.js`),
      context: {
        id: category.id,
        name: category.name,
        slug: category.slug,
      },
    });

    // Create pages for subcategories with clean URLs
    category.wpChildren?.nodes?.forEach(subcategory => {
      createPage({
        path: `/${category.slug}/${subcategory.slug}/`,  // Clean URL
        component: path.resolve(`./src/templates/subcategory-template.js`),
        context: {
          id: subcategory.id,
          name: subcategory.name,
          slug: subcategory.slug,
          parentSlug: category.slug,
        },
      });
    });

    // Create pages for posts within the category with clean URLs
    category.posts?.nodes?.forEach(post => {
      createPage({
        path: `/post/${post.slug}/`,  // Clean URL
        component: path.resolve(`./src/templates/post-template.js`),
        context: {
          id: post.id,
          title: post.title,
          slug: post.slug,
          categorySlug: category.slug,
        },
      });
    });
  });
};
