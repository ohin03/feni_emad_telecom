import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { 
  IoCartOutline, IoEyeOutline, IoArrowBack, 
  IoStar, IoHeartOutline, IoFlameOutline 
} from "react-icons/io5";
import "./CategoryProduct.css";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.slug) getProductByCat();
  }, [params?.slug]);

  const getProductByCat = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-category/${params.slug}`);
      setProducts(Array.isArray(data?.products) ? data.products : []);
      setCategory(data?.category || {});
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout title={`${category?.name} | Premium Collection`}>
      <div className="category-ultra-wrapper">
        <div className="container py-4">
          
          {/* Real Feel Header */}
          <div className="pro-header-section mb-5">
            <button className="back-minimal-btn" onClick={() => navigate(-1)}>
              <IoArrowBack /> Back
            </button>
            <div className="category-info-text">
              <span className="trending-pill"><IoFlameOutline /> Trending Now</span>
              <h1 className="category-title-text">{category?.name}</h1>
              <p className="result-count">{products?.length} Items curated for you</p>
            </div>
          </div>

          <div className="row g-3 g-md-4">
            {products?.map((p) => (
              <div className="col-6 col-md-4 col-lg-3" key={p._id}>
                <div className="real-pro-card">
                  {/* Image & Badges */}
                  <div className="image-wrapper" onClick={() => navigate(`/product/${p.slug}`)}>
                    <div className="wishlist-overlay"><IoHeartOutline /></div>
                    <div className="discount-tag">Sale</div>
                    <img
                      src={p?.photo ? `/api/v1/product/product-photo/${p._id}` : "/images/placeholder.png"}
                      alt={p.name}
                      className="product-main-img"
                    />
                    <div className="hover-action-btn">
                      <IoEyeOutline /> Quick View
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="product-info-wrapper">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="stock-status">In Stock</span>
                      <div className="rating-star">
                         <IoStar /> <span>4.5</span>
                      </div>
                    </div>
                    
                    <h5 className="product-title" title={p.name}>{p.name}</h5>
                    
                    <div className="price-tag-row">
                      <span className="price-new">৳ {p.price.toLocaleString()}</span>
                      <span className="price-old">৳ {(p.price + 500).toLocaleString()}</span>
                    </div>

                    <button 
                      className="ultra-cart-btn" 
                      onClick={() => {
                        const item = { ...p, quantity: 1 };
                        setCart([...cart, item]);
                        localStorage.setItem('cart', JSON.stringify([...cart, item]));
                        toast.success('Added to your bag!');
                      }}
                    >
                      <IoCartOutline /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {products.length === 0 && !loading && (
            <div className="empty-category text-center py-5">
               <h2>No Products in {category?.name}</h2>
               <button className="btn btn-dark mt-3 px-5 rounded-pill" onClick={() => navigate("/")}>Go Home</button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;