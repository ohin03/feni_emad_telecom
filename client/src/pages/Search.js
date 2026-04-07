import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { 
  IoCartOutline, IoArrowBack, IoStar, 
  IoHeartOutline, IoSparklesOutline 
} from "react-icons/io5";
import "./Search.css";

const Search = () => {
  const [values] = useSearch();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  return (
    <Layout title={"Search Results | Premium Store"}>
      <div className="search-premium-bg">
        <div className="container py-4">
          
          {/* Header Action Bar */}
          <div className="row align-items-center mb-5 g-3">
            <div className="col-6 col-md-4">
              <button className="pro-back-link" onClick={() => navigate("/")}>
                <IoArrowBack /> <span>Return Home</span>
              </button>
            </div>
            <div className="col-12 col-md-4 text-center order-3 order-md-2">
              <div className="search-status-pill">
                <IoSparklesOutline className="sparkle" />
                <span>Found {values?.results.length} Matches</span>
              </div>
            </div>
            <div className="col-6 col-md-4 text-end order-2 order-md-3">
               <div className="wishlist-icon-top"><IoHeartOutline size={24}/></div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="row g-3 g-md-4">
            {values?.results.map((p) => (
              <div className="col-6 col-md-4 col-lg-3" key={p._id}>
                <div className="ultimate-card">
                  {/* Discount Badge - Pro Touch */}
                  <div className="badge-promo">Sale</div>
                  
                  <div className="card-media" onClick={() => navigate(`/product/${p.slug}`)}>
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      className="img-fluid main-product-img"
                    />
                    <div className="card-overlay-btn">View Details</div>
                  </div>

                  <div className="card-details">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="stock-tag">In Stock</span>
                      <div className="rating-mini">
                        <IoStar /> <span>4.5</span>
                      </div>
                    </div>

                    <h5 className="product-name-link" onClick={() => navigate(`/product/${p.slug}`)}>
                      {p.name}
                    </h5>
                    
                    <div className="price-container">
                      <span className="new-price">৳ {p.price.toLocaleString()}</span>
                      <span className="old-price">৳ {(p.price + 300).toLocaleString()}</span>
                    </div>

                    <button
                      className="add-to-bag-btn"
                      onClick={() => {
                        const item = { ...p, quantity: 1 };
                        setCart([...cart, item]);
                        localStorage.setItem("cart", JSON.stringify([...cart, item]));
                        toast.success(`${p.name.substring(0,15)}... added!`);
                      }}
                    >
                      <IoCartOutline size={18} /> <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Result Logic */}
          {values?.results.length === 0 && (
            <div className="empty-state-pro text-center">
              <div className="empty-icon-box">🔍</div>
              <h2>No Results Found</h2>
              <p>We couldn't find anything matching your search. Try different keywords.</p>
              <button className="btn-modern-dark" onClick={() => navigate("/")}>Browse All Products</button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Search;