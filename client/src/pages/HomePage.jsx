import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio, Drawer, Tag } from "antd";
import { Prices } from "../components/Prices";
import "./HomePage.css";
import SearchInput from "../components/Form/SearchInput";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AiOutlineShoppingCart, AiOutlineEye, AiOutlineFilter, AiOutlineReload } from "react-icons/ai";
import { HiOutlineSparkles, HiOutlineSearchCircle } from "react-icons/hi";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);

  // Load Total Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) { console.log(error); }
  };

  // Initial Load
  const loadProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setProducts(data.products || []);
      setLoading(false);
    } catch (error) { setLoading(false); }
  };

  // Load More
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page + 1}`);
      setProducts([...products, ...data?.products]);
      setPage(page + 1);
      setLoading(false);
    } catch (error) { setLoading(false); }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
    loadProducts();
  }, []);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) setCategories(data.category);
    } catch (error) { console.log(error); }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) all.push(id);
    else all = all.filter((c) => c !== id);
    setChecked(all);
  };

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
    else if (page === 1) loadProducts();
  }, [checked, radio]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", { checked, radio });
      setProducts(data?.products);
    } catch (error) { console.log(error); }
  };

  return (
    <Layout title={"Emad Telecom | Home page"}>
      <div className="main-wrapper">
        
        {/* --- 1. PRO HERO BANNER --- */}
        <div className="hero-section-pro">
  {/* ব্যাকগ্রাউন্ডে এনিমেটেড শেপ বা গ্লো */}
  <div className="hero-bg-glow"></div>
  
  <div className="hero-content-overlay">
    <div className="hero-badge">Verified Gadget Shop</div>
    <h1 className="hero-main-title">
      Emad Telecom <HiOutlineSparkles className="spark-icon" />
    </h1>
    <p className="hero-sub-text">
      Exclusive deals on latest smartphones and accessories
    </p>
    <div className="hero-btn-group">
      <button className="btn-glass" onClick={() => window.location.href='/contact'}>Contact</button>
      <button className="btn-outline-custom">Repair Service</button>
    </div>
  </div>
</div>

        {/* --- 2. MOBILE FILTER FAB --- */}
        <button className="mobile-filter-btn d-md-none" onClick={() => setOpen(true)}>
          <AiOutlineFilter /> <span>Filters</span>
        </button>

        <div className="container-fluid px-md-5">
          <div className="row">
            
            {/* --- 3. DESKTOP SIDEBAR --- */}
            <div className="col-md-3 d-none d-md-block pt-5">
              <div className="sticky-sidebar-card shadow-sm p-4">
                <h6 className="sidebar-heading">BY CATEGORY</h6>
                <div className="filter-options mb-4">
                  {categories?.map((c) => (
                    <div key={c._id} className="custom-check mb-2">
                      <Checkbox onChange={(e) => handleFilter(e.target.checked, c._id)}>
                        {c.name}
                      </Checkbox>
                    </div>
                  ))}
                </div>

                <h6 className="sidebar-heading">BY BUDGET</h6>
                <Radio.Group onChange={(e) => setRadio(e.target.value)} value={radio}>
                  {Prices?.map((p) => (
                    <div key={p._id} className="mb-2">
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>

                <button className="pro-reset-btn w-100 mt-4" onClick={() => window.location.reload()}>
                  <AiOutlineReload /> RESET ALL
                </button>
              </div>
            </div>

            {/* --- 4. MAIN CONTENT AREA --- */}
            <div className="col-md-9 main-content-top-spacing ">
              
              {/* --- WORKABLE FLOATING SEARCH BOX --- */}
              <div className="floating-search-wrapper mb-5">
                <div className="search-glass-card shadow-lg ">
                  <div className="search-prefix d-none d-md-flex ">
                    <HiOutlineSearchCircle className="search-icon-big " />
                    <span>Search Products</span>
                  </div>
                  <div className="search-input-flex">
                    <SearchInput />
                  </div>
                </div>
              </div>

              {/* Grid Header */}
              <div className="d-flex justify-content-between align-items-center mb-4 px-2">
                <h2 className="section-title-modern">Latest Arrivals</h2>
                <Tag color="blue" className="rounded-pill px-3 py-1">{products?.length} Items</Tag>
              </div>

              {/* Product Grid */}
              <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
                {products?.map((p) => (
                  <div className="col product-animate" key={p._id}>
                    <div className="pro-ultra-card">
                      <div className="pro-img-holder" onClick={() => navigate(`/product/${p.slug}`)}>
                        <img src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                        <div className="hover-overlay-text">VIEW DETAILS</div>
                      </div>
                      <div className="pro-info-holder">
                        <span className="pro-category-tag">Genuine Product</span>
                        <h6 className="pro-name-text">{p.name}</h6>
                        <h5 className="pro-price-text">TK {p.price.toLocaleString()}</h5>
                        <div className="pro-button-group">
                          <button className="details-btn-modern" onClick={() => navigate(`/product/${p.slug}`)}>
                            <AiOutlineEye /> Details
                          </button>
                         <button
  className="cart-btn-modern"
  onClick={() => {
    let updatedCart = [...cart];

    // product already exists কিনা check
    const existingProductIndex = updatedCart.findIndex(item => item._id === p._id);

    if (existingProductIndex !== -1) {
      // already in cart → qty +1
      updatedCart[existingProductIndex].cartQuantity += 1;
      toast.success("Quantity increased 🛒");
    } else {
      // new product → DEFAULT QTY = 1  ⭐⭐⭐
      updatedCart.push({
        ...p,
        cartQuantity: 1,
      });
      toast.success("Added to cart 🛒");
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }}
>
  <AiOutlineShoppingCart />
</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {products.length < total && (
                <div className="text-center my-5 pb-5">
                  <button className="btn btn-danger" onClick={loadMore} disabled={loading}>
                    {loading ? "Loading..." : "Explore MORE"}
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* --- 5. MOBILE DRAWER --- */}
        <Drawer
          title="Filter Products"
          placement="bottom"
          onClose={() => setOpen(false)}
          open={open}
          height="70%"
          className="pro-drawer"
        >
          <div className="drawer-body p-2">
            <h6 className="drawer-label">Categories</h6>
            <div className="d-flex flex-wrap gap-2 mb-4">
              {categories?.map((c) => (
                <div 
                  key={c._id} 
                  className={`mobile-chip ${checked.includes(c._id) ? "active" : ""}`}
                  onClick={() => handleFilter(!checked.includes(c._id), c._id)}
                >
                  {c.name}
                </div>
              ))}
            </div>
            <h6 className="drawer-label">Budget Range</h6>
            <Radio.Group onChange={(e) => setRadio(e.target.value)} value={radio} className="d-flex flex-column gap-2">
              {Prices?.map((p) => (
                <Radio key={p._id} value={p.array}>{p.name}</Radio>
              ))}
            </Radio.Group>
            <button className="btn btn-dark w-100 mt-4 py-3 rounded-4" onClick={() => setOpen(false)}>APPLY FILTERS</button>
          </div>
        </Drawer>

      </div>
    </Layout>
  );
}

export default HomePage;