import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { IoBagAddOutline, IoFlashOutline, IoArrowBackOutline } from "react-icons/io5";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();

  const getProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/get-product/${slug}`);
      if (data?.success) setProduct(data.product);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getRelatedProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
      if (data?.success) setRelatedProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (slug) getProduct();
  }, [slug]);

  useEffect(() => {
    if (product?._id && product?.category?._id) {
      getRelatedProducts(product._id, product.category._id);
    }
  }, [product]);

  if (loading) return (
    <Layout><div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-grow text-primary"></div>
    </div></Layout>
  );

  return (
    <Layout title={`${product?.name} - Buy Now`}>
      <div className="product-details-page">
        <div className="container py-4">
          {/* Back Button */}
          <button className="btn mb-4 border-0 text-muted fw-bold d-flex align-items-center gap-2" onClick={() => navigate(-1)}>
            <IoArrowBackOutline /> Back
          </button>

          <div className="row">
            {/* Left: Image */}
            <div className="col-lg-6">
              <div className="product-main-img-container text-center">
                <img
                  src={`/api/v1/product/product-photo/${product._id}`}
                  alt={product.name}
                  className="main-product-img"
                />
              </div>
            </div>

            {/* Right: Content */}
            <div className="col-lg-6">
              <div className="info-wrapper">
                <span className="badge-category">{product.category?.name}</span>
                <h1 className="product-title">{product.name}</h1>
                
                <div className="price-tag mt-3">
                  ৳ {product.price.toLocaleString()}
                  <span>৳ {(product.price + 500).toLocaleString()}</span>
                </div>

                <div className="desc-text">
                  {product.description}
                </div>

                <div className="stock-info d-flex gap-4 mb-4">
                  <div><strong>Availability:</strong> <span className="text-success">{product.quantity > 0 ? "In Stock" : "Out of Stock"}</span></div>
                  <div><strong>Quantity:</strong> {product.quantity} units</div>
                </div>

                <hr className="opacity-10" />

                <div className="action-group">
                  <button
                    className="btn-add-cart"
                    onClick={() => {
                      const updatedCart = [...cart, { ...product, quantity: 1 }];
                      setCart(updatedCart);
                      localStorage.setItem("cart", JSON.stringify(updatedCart));
                      toast.success("Added to Bag! 🛍️");
                    }}
                  >
                    <IoBagAddOutline size={22} /> Add to card
                  </button>
                  <button className="btn btn-primary" onClick={() => navigate("/cart")}>
                    Checkout Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Section */}
          <div className="related-section mt-5 pt-5">
            <h3 className="text-center similar-title">Similar Products</h3>
            <div className="row mt-4">
              {relatedProducts.length < 1 && <p className="text-center text-muted">No similar products found.</p>}
              {relatedProducts.map((p) => (
                <div key={p._id} className="col-6 col-md-4 col-lg-3 mb-4">
                  <div className="pro-card-modern" onClick={() => { navigate(`/product/${p.slug}`); window.scrollTo(0,0); }}>
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      className="pro-card-img"
                    />
                    <div className="mt-3">
                      <h6 className="fw-bold mb-1 text-truncate">{p.name}</h6>
                      <p className="text-primary fw-bold mb-2">৳ {p.price}</p>
                      <button className="btn btn-sm btn-outline-dark w-100 rounded-pill">Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;