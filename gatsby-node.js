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

  const categories = result.data.allWpCategory.edges.map(edge => edge.node);

  // Create pages for all categories (including subcategories)
  categories.forEach(category => {
    // Create a category page
    createPage({
      path: `/category/${category.slug}/`,
      component: path.resolve(`./src/templates/category-template.js`),
      context: {
        id: category.id,
        name: category.name,
        slug: category.slug,
      },
    });

    // Create pages for subcategories
    category.wpChildren?.nodes?.forEach(subcategory => {
      createPage({
        path: `/category/${category.slug}/${subcategory.slug}/`,
        component: path.resolve(`./src/templates/subcategory-template.js`),
        context: {
          id: subcategory.id,
          name: subcategory.name,
          slug: subcategory.slug,
          parentSlug: category.slug,
        },
      });
    });

    // Create pages for posts within the category
    category.posts?.nodes?.forEach(post => {
      createPage({
        path: `/post/${post.slug}/`,
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
