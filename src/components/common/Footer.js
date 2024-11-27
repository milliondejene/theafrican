import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} TheAfrican. All Rights Reserved.</p>
        <p>Follow us on <a href="#social">Social Media</a>.</p>
      </div>
    </footer>
  );
};

export default Footer;
