import React from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://i.ibb.co/1q5fNkQ/banner.png"
          alt="Gruham Image Loading..."
        />

        <div className="home__row">
          <Product
            id="12321341"
            title="High-quality, Reusable Bags For A Sustainable Lifestyle - Gruham Bag."
            price={3.96}
            rating={5}
            image="https://i.ibb.co/8j03xsW/bag-removebg-preview.png"
          />
          <Product
            id="49538094"
            title="Shop In Style, Wear Your Brand - Gruham T-shirt."
            price={39.0}
            rating={4}
            image="https://i.ibb.co/hYQKs8H/t-shirt-2-removebg-preview.png"
          />
        </div>

        <div className="home__row">
          <Product
            id="4903850"
            title="Gruham: Your Go-to For Everyday Essentials."
            price={99.99}
            rating={3}
            image="https://i.ibb.co/f2dc0PV/t-shirt-removebg-preview.png"
          />
          <Product
            id="23445930"
            title="High-quality Notebook And Pen Set - Stylish And Functional, Perfect For Students And Professionals - Gruham Notebook."
            price={28.99}
            rating={5}
            image="https://i.ibb.co/64nV42Q/notebook-removebg-preview.png"
          />
          <Product
            id="3254354345"
            title="Premium Mug And Water Bottle Set - Perfect For Coffee And Tea Lovers - Gruham Mug And Bottle."
            price={38.99}
            rating={4}
            image="https://i.ibb.co/J5ZHr16/bottle-removebg-preview.png"
          />
        </div>

        <div className="home__row">
          <Product
            id="90829332"
            title="High-quality laptop and earbuds set - Perfect for work and play - Gruham Laptop and Earbuds."
            price={1094.98}
            rating={4}
            image="https://i.ibb.co/zsdDhDF/sticker-removebg-preview.png"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;