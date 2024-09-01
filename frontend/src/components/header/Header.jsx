import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from './Header.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { logout } from '../../redux/features/auth/authSlice';
import ShowOnLogin, { ShowOnLogout } from '../hiddenLink/hiddenLink';
//import ShowOnLogin from '../hiddenLink/hiddenLink';

const Logo = () => (
  <div className={styles.logo}>
    <Link to="/">
      <h2 className='allh2'>
        All in One 
        <br /> <span className='allh2'>Market</span>
      </h2>
    </Link>
  </div>
);

const activeLink = ({ isActive }) => (isActive ? styles.active : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrollPage, setScrollPage] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fixNavbar = () => {
    if (window.scrollY > 50) {
      setScrollPage(true);
    } else {
      setScrollPage(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", fixNavbar);
    return () => window.removeEventListener("scroll", fixNavbar);
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = async () => {
    await dispatch(logout());
    await dispatch(RESET_AUTH());
    navigate("/login");
  };

  const cart = (
    <span className={styles.cart}>
      <Link to="/cart">
        Cart
        <FaShoppingCart size={20} />
        <p>0</p>
      </Link>
    </span>
  );

  return (
    <header className={scrollPage ? styles.fixed : ""}>
      <div className={styles.header}>
        <Logo />
        <nav className={showMenu ? styles["show-nav"] : styles["hide-nav"]}>
          <div className={styles["nav-wrapper"]} onClick={hideMenu}></div>
          <ul>
            <li>
              <NavLink to="/shop" className={activeLink} onClick={hideMenu}>
                Shop
              </NavLink>
            </li>
            {/* Add more nav items here */}
          </ul>
          <div className={styles["header-right"]}>
            {cart}
            <span className={styles.links}>
              <ShowOnLogout>
              <NavLink to="/login" className={activeLink} onClick={hideMenu}>
                Login
              </NavLink>
              </ShowOnLogout>
              <ShowOnLogout>
              <NavLink to="/register" className={activeLink} onClick={hideMenu}>
                Register
              </NavLink>
              </ShowOnLogout>
              <ShowOnLogin>
              <NavLink to="/order-history" className={activeLink} onClick={hideMenu}>
                My Order
              </NavLink>
              </ShowOnLogin>
              <ShowOnLogin>
              <Link to="/" onClick={logoutUser}>
                Logout
              </Link>
              </ShowOnLogin>
            </span>
          </div>
        </nav>
        <div className={styles["menu-icon"]}>
          {cart}
          <HiOutlineMenuAlt2 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
