import React from "react";
import {Link} from "gatsby"
const Footer = () => {
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

      <div className="branding">        
      <Link 
  to="/" 
  className="brand-link" 
  style={{
    textDecoration: 'none', // Removes the underline
    fontSize: '1.2rem', // Adjust the font size for the brand
    fontWeight: 'bold', // Make the brand name bold
    color: '#333', // Set the brand color to dark grey
    letterSpacing: '1px', // Optional: Adjust letter spacing for a clean look
    textTransform: 'uppercase', // Optional: Make the brand name uppercase
    transition: 'color 0.3s ease', // Smooth transition for hover color change
  }}
>
  TheAfrican
</Link></div>

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
