import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaShopify } from "react-icons/fa";
import { AiOutlineShoppingCart, AiOutlineUser, AiOutlineMenu } from "react-icons/ai";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import "./Header.css"
const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [mobileUserOpen, setMobileUserOpen] = useState(false);
  const categories = useCategory();
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);

  // ✅ Updated Offcanvas Close Function (Mobile Freeze Fix)
  const closeOffcanvas = () => {
    const offcanvasEl = document.getElementById("mobileOffcanvas");
    if (!offcanvasEl) return;

    const bsOffcanvas =
      window.bootstrap.Offcanvas.getInstance(offcanvasEl) ||
      new window.bootstrap.Offcanvas(offcanvasEl);

    bsOffcanvas.hide();

    // Scroll unlock fix
    document.body.style.overflow = "auto";
    document.body.classList.remove("offcanvas-backdrop");
  };

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout successfully");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white sticky-top custom-navbar shadow-sm">
        <div className="container-fluid px-md-4">

          {/* LOGO */}
          <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
            <FaShopify className="brand-icon" />
            <span className="fw-bold text-dark" style={{letterSpacing:'-1px', fontSize:'22px'}}>
              EMAD <span className="text-primary">TELECOM</span>
            </span>
          </Link>

          {/* MOBILE ICONS */}
          <div className="d-flex align-items-center gap-3 d-lg-none ms-auto me-3">
            <Badge count={cart?.length} showZero offset={[5, 0]}>
              <NavLink to="/cart" className="mobile-action-link">
                <AiOutlineShoppingCart size={26} />
              </NavLink>
            </Badge>

            {auth?.user && (
              <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="mobile-action-link">
                <AiOutlineUser size={24} />
              </NavLink>
            )}
          </div>

          {/* MENU TOGGLER */}
          <button
            className="navbar-toggler border-0 shadow-none p-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileOffcanvas"
          >
            <AiOutlineMenu size={28} className="text-dark" />
          </button>

          {/* DESKTOP NAV */}
          <div className="collapse navbar-collapse">
            <div className="mx-auto d-none d-lg-block desktop-search">
              <SearchInput />
            </div>

            <ul className="navbar-nav ms-auto align-items-center gap-2">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">Home</NavLink>
              </li>

              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="/categories" data-bs-toggle="dropdown">
                  Categories
                </Link>
                <ul className="dropdown-menu border-0 shadow-lg">
                  <li><Link className="dropdown-item" to="/categories">All Categories</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  {categories?.map((c) => (
                    <li key={c._id}>
                      <Link className="dropdown-item" to={`/category/${c.slug}`}>{c.name}</Link>
                    </li>
                  ))}
                </ul>
              </li>

              {!auth?.user ? (
                <>
                  <li className="nav-item"><NavLink to="/register" className="nav-link">Register</NavLink></li>
                  <li className="nav-item"><NavLink to="/login" className="nav-link login-btn-nav">Login</NavLink></li>
                </>
              ) : (
                <li className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle user-name-nav" data-bs-toggle="dropdown" style={{cursor:'pointer'}}>
                    {auth?.user?.name}
                  </span>
                  <ul className="dropdown-menu dropdown-menu-end border-0 shadow-lg">
                    <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item">Dashboard</NavLink></li>
                    <li><NavLink to="/login" onClick={handleLogout} className="dropdown-item text-danger">Logout</NavLink></li>
                  </ul>
                </li>
              )}

              <li className="nav-item ms-lg-3 d-none d-lg-block">
                <Badge count={cart?.length} showZero offset={[8, 0]}>
                  <NavLink to="/cart" className="cart-icon-wrapper">
                    <AiOutlineShoppingCart size={24} />
                    <span className="ms-1 fw-bold">Cart</span>
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE OFFCANVAS ================= */}
   {/* ================= MOBILE OFFCANVAS ================= */}
<div className="offcanvas offcanvas-start d-lg-none" id="mobileOffcanvas" style={{width:'280px', top:'70px'}}>
  
  <div className="offcanvas-header border-bottom position-relative" style={{paddingTop:'0'}}>
    <h5 className="offcanvas-title fw-bold text-success">Menu</h5>

    {/* Stylish X Button */}
    <button
      onClick={closeOffcanvas}
      data-bs-dismiss="offcanvas"
      className="btn btn-light rounded-circle shadow-sm d-flex align-items-center justify-content-center offcanvas-close-btn"
    >
      ✕
    </button>
  </div>

  <div className="offcanvas-body p-0 mt-2">
    <div className="p-3 bg-light">
      <SearchInput />
    </div>

    <div className="mobile-nav-links p-3">
      <NavLink to="/" className="mobile-link" onClick={closeOffcanvas}>Home</NavLink>

      <div className="mobile-accordion">
        <div className="d-flex justify-content-between align-items-center mobile-link"
             onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}>
          <span>Categories</span>
          <span className={`arrow-icon ${mobileCategoryOpen ? 'rotate' : ''}`}>▼</span>
        </div>

        {mobileCategoryOpen && (
          <div className="ps-3 mb-2 animate-fadeIn">
            <Link to="/categories" className="mobile-sublink" onClick={closeOffcanvas}>All Categories</Link>
            {categories?.map((c) => (
              <Link key={c._id} to={`/category/${c.slug}`} className="mobile-sublink" onClick={closeOffcanvas}>{c.name}</Link>
            ))}
          </div>
        )}
      </div>

      {!auth?.user ? (
        <div className="mt-4 d-grid gap-2">
          <NavLink to="/login" className="btn btn-primary rounded-3" onClick={closeOffcanvas}>Login</NavLink>
          <NavLink to="/register" className="btn btn-outline-primary rounded-3" onClick={closeOffcanvas}>Register</NavLink>
        </div>
      ) : (
        <div className="mt-3 pt-3 border-top">
          <div className="fw-bold mb-2 text-muted px-2">Account</div>
          <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="mobile-link" onClick={closeOffcanvas}>Dashboard</NavLink>
          <span className="mobile-link text-danger" onClick={() => {handleLogout(); closeOffcanvas();}}>Logout</span>
        </div>
      )}
    </div>
  </div>
</div>
    </>
  );
};

export default Header;