import React, { useState, useEffect } from "react";
import { Link } from "gatsby";

const Footer = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your WordPress REST API endpoint
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://your-wordpress-site.com/wp-json/wp/v2/categories');
        const data = await response.json();
        setCategories(data);  // Store fetched categories in state
        setLoading(false);  // Update loading state
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);  // Update loading state even if there's an error
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <p>Loading categories...</p>;
  }

  return (
    <footer className="footer">
      <style>
        {`
          .footer {
            background-color: #fff;
            color: #000;
            padding: 2rem 1rem;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            flex-wrap: wrap;
            text-align: left;
          }

          .branding {
            font-size: 2rem;
            font-weight: bold;
            margin-bottom: 1rem;
            flex: 1;
          }

          .footer-bottom {
            width: 100%;
            text-align: left;
            margin-top: 1rem;
            font-size: 0.8rem;
            color: #555;
          }

          .footer-bottom a {
            color: #555;
            text-decoration: none;
          }

          .footer-bottom a:hover {
            color: red;
          }

          .footer-bottom .copyright {
            margin-top: 1rem;
          }

          .footer-bottom .external-links {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
          }
        `}
      </style>

      <div className="branding">TheAfrican</div>

      <div className="menu-section">
        <ul>
          {/* Dynamically fetched categories */}
          {categories.map((category) => (
            <li key={category.id}>
              <Link to={`/${category.slug}`}>{category.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="footer-bottom">
        <div className="copyright">
          <p>Copyright 2024 TheAfrican. All rights reserved.</p>
        </div>

        <div className="external-links">
          <a href="/terms">Terms of Use</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/cookies">Cookies</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
