// Footer.js
import React from 'react';
import './Footer.css';  
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__section">
          <h3><Link to="/about">About Us</Link></h3>
        </div>
        <div className="footer__section">
          <h3><Link to="/orders">Returns & Orders</Link></h3>
        </div>
        <div className="footer__section">
          <h3><Link to="/contact">Contact Us</Link></h3>
        </div>
        <div className="footer__section">
          <h3><a href="https://www.facebook.com" target="_blank" rel="noreferrer">Follow Us</a></h3>
        </div>
      </div>
      <div className="footer__copyright">
        <p>&copy; 2024 GruhamStore. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
