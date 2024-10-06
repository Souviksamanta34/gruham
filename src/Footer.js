// Footer.js
import React from 'react';
import './Footer.css';  // We will style the footer in a separate CSS file

function Footer() {
  return (
    <div className="footer">
      <div className="footer__container">
        {/* Section 1: About the Company */}
        <div className="footer__section">
          <h3>About Us</h3>
        </div>

        {/* Section 2: Customer Service Links */}
        <div className="footer__section">
          <h3><a href="/orders">Returns & Orders</a></h3>
        </div>

        <div className="footer__section">
          <h3><a href="/contact">Contact Us</a></h3>
        </div>


        {/* Section 4: Social Media Icons */}
        <div className="footer__section">
          <h3><a href="https://www.facebook.com" target="_blank" rel="noreferrer">Follow Us</a></h3>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer__copyright">
        <p>&copy; 2024 GruhamStore. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
