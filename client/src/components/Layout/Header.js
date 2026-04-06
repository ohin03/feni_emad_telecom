import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaShopify } from "react-icons/fa";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [mobileUserOpen, setMobileUserOpen] = useState(false);
  const categories = useCategory();
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  

    const closeOffcanvas = () => {
    const offcanvasEl = document.getElementById("mobileOffcanvas");
    if (offcanvasEl && window.bootstrap) {
      const bsOffcanvas =
        window.bootstrap.Offcanvas.getInstance(offcanvasEl) ||
        new window.bootstrap.Offcanvas(offcanvasEl);
      bsOffcanvas.hide();
    }
  };




  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout successfully");
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary px-3 custom-navbar">
        <div className="container-fluid align-items-center">

          {/* BRAND */}
          <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
            <FaShopify size={22} /> Emad Telecom
          </Link>

          {/* CENTER SEARCH – DESKTOP ONLY */}
         

          {/* TOGGLER */}
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileOffcanvas"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* ================= DESKTOP MENU ================= */}
          <ul className="navbar-nav ms-auto d-none d-lg-flex align-items-center gap-3">
             <div
            className="mx-auto d-none d-lg-flex align-items-center search-wrapper"
          >
            <SearchInput />
          </div>
            <li className="nav-item">
              <NavLink to="/" className="nav-link">Home</NavLink>
            </li>

         <li className="nav-item dropdown">
  <Link
    className="nav-link dropdown-toggle"
    to="/categories"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    Categories
  </Link>

  <ul className="dropdown-menu">
    {/* All Categories */}
    <li>
      <Link className="dropdown-item" to="/categories">
        All Categories
      </Link>
    </li>

    <li><hr className="dropdown-divider" /></li>

    {/* Dynamic Categories */}
    {categories?.map((c) => (
      <li key={c._id}>
        <Link
          className="dropdown-item"
          to={`/category/${c.slug}`}
        >
          {c.name}
        </Link>
      </li>
    ))}
  </ul>
</li>



            {!auth?.user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">Register</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">Login</NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  {auth.user.name}
                </a>

                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <NavLink
                      to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                      className="dropdown-item"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/login"
                      onClick={handleLogout}
                      className="dropdown-item"
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </li>
            )}

            <li className="nav-item">
                <Badge count={cart?.length} showZero>
                  <NavLink to="/cart" className="nav-link">Cart</NavLink>
              </Badge>
            </li>
          </ul>
        </div>
      </nav>

      {/* ================= MOBILE OFFCANVAS ================= */}
      <div
        className="offcanvas offcanvas-end d-lg-none custom-offcanvas"
        id="mobileOffcanvas"
      >

        {/* MOBILE SEARCH */}
        <div className="p-3 border-bottom">
          <SearchInput />
        </div>

        <div className="offcanvas-header">
          <h5 className="offcanvas-title text-primary">Menu</h5>
          <button
            type="button"
            className="btn-close "
            data-bs-dismiss="offcanvas"
          ></button>
        </div>

        <div className="offcanvas-body">
          <ul className="navbar-nav gap-2">

            <NavLink to="/" className="nav-link" onClick={closeOffcanvas}>Home</NavLink>
        
     <li className="nav-item">
  <div className="nav-link d-flex justify-content-between align-items-center">
    <span>Categories</span>

    <span
      style={{ cursor: "pointer" }}
      onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
    >
      {mobileCategoryOpen ? "▲" : "▼"}
    </span>
  </div>

  {mobileCategoryOpen && (
    <ul className="ps-3 mt-2">

      {/* All Categories */}
      <li>
        <NavLink
          to="/categories"
          className="nav-link"
          onClick={closeOffcanvas}
        >
          All Categories
        </NavLink>
      </li>

      {/* Dynamic Categories */}
      {categories?.map((c) => (
        <li key={c._id}>
          <NavLink
            to={`/category/${c.slug}`}
            className="nav-link"
            onClick={closeOffcanvas}
          >
            {c.name}
          </NavLink>
        </li>
      ))}
    </ul>
  )}
</li>




            {!auth?.user ? (
              <>
                <NavLink to="/register" className="nav-link" onClick={closeOffcanvas}>Register</NavLink>
                <NavLink to="/login" className="nav-link" onClick={closeOffcanvas}>Login</NavLink>
              </>
            ) : (
              <li className="nav-item">
                <span
                  className="nav-link d-flex justify-content-between align-items-center"
                  onClick={() => setMobileUserOpen(!mobileUserOpen)}
                  style={{ cursor: "pointer" }}
                >
                  {auth.user.name}
                  <span>{mobileUserOpen ? "▲" : "▼"}</span>
                </span>

                {mobileUserOpen && (
                  <ul className="ps-3 mt-2">
                    <li>
                      <NavLink
                        to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                        className="nav-link"
                        onClick={closeOffcanvas}
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/login"
                        onClick={() => {
                          handleLogout();
                          closeOffcanvas();
                        }}
                        className="nav-link"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
            )}
            <Badge count={cart?.length} showZero>
            <NavLink to="/cart" className="nav-link" onClick={closeOffcanvas}>Cart</NavLink>
            </Badge>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
