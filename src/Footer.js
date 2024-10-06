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
          <ul>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer__section">
          <h3><a href="/orders">Returns & Orders</a></h3>
          <ul>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>


        {/* Section 4: Social Media Icons */}
        <div className="footer__section">
          <h3>Follow Us</h3>
          <div className="footer__social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">Facebook</a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://www.twitter.com" target="_blank" rel="noreferrer">Twitter</a>
          </div>
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
