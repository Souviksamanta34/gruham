// About.js
import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about">
      <div className="about__container">
        <h1>About Gruham</h1>
        <p>
          Welcome to <strong>Gruham</strong>, your number one source for high-quality, sustainable, and stylish products. 
          We're dedicated to providing you with the best shopping experience, with a focus on dependability, customer service, 
          and uniqueness.
        </p>
        <p>
          Founded in 2024, Gruham has come a long way from its beginnings as a small business.
          Our passion for eco-friendly, yet trendy products drove us to start our own brand, and we're thrilled that 
          we’re able to turn our passion into reality.
        </p>
        <p>
          We now serve customers all over the world and are excited to be a part of the eco-friendly wing of the e-commerce 
          industry.
        </p>
        <p>
          We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, 
          please don't hesitate to <a href="/contact">contact us</a>.
        </p>
        <h3>Our Mission</h3>
        <p>
          To inspire a sustainable lifestyle through innovative, high-quality products that serve as everyday essentials. 
          We believe in creating a positive impact on the planet with every product we offer.
        </p>
      </div>
    </div>
  );
}

export default About;
