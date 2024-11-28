import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <style>
        {`
          .footer {
            background-color: #333;
            color: #fff;
            padding: 20px 0;
            text-align: center;
          }
          .footer a {
            color: #1e90ff;
            text-decoration: none;
          }
          .footer a:hover {
            text-decoration: underline;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 15px;
          }
        `}
      </style>
      <div className="container">
        <p>&copy; {new Date().getFullYear()} TheAfrican. All Rights Reserved.</p>
        <p>Follow us on <a href="#social">Social Media</a>.</p>
      </div>
    </footer>
  );
};

export default Footer;
