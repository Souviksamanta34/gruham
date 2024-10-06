import React from "react"; 
import "./Header.css";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthentication = () => {
    if (user) {
      auth.signOut().then(() => {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }).catch((error) => {
        console.error("Error during sign out: ", error);
      });
    }
  };

  return (
    <div className="header">
      <div className="header__left">
        <Link to="/orders">
          <div className="header__option">
            <span className="header__optionLineTwo">Orders</span>
          </div>
        </Link>

        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon sx={{ fontSize: 40 }} /> 
            <span className="header__optionLineTwo header__basketCount">{basket?.length}</span>
          </div>
        </Link>
      </div>

      <Link to="/">
        <img className="header__logo" src="https://i.ibb.co/QYW747Z/logo.png" alt="Logo" />
      </Link>

      <div className="header__right">
        <Link to={!user && "/login"}>
          <div onClick={handleAuthentication} className="header__option">
            <span className="header__optionLineTwo">Hello {!user ? "," : user.firstName }</span>
            <span className="header__optionLineTwo">{user ? "Sign Out" : "Sign In"}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
