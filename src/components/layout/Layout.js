import React from "react";
import PropTypes from "prop-types";
import Header from "../common/Header";
import Footer from "../common/Footer";
import "../styles/global.css"; // Import global styles

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
