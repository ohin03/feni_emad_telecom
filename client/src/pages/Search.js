import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Search = () => {
  const [values] = useSearch();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  return (
    <Layout title={"Search results"}>
      <div className="search-page-container">
        <div className="search-page-header">
          <h1 className="search-page-title">Search Result</h1>
          <h6 className="search-page-count">
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length} products`}
          </h6>
        </div>

        <div className="search-card-wrapper">
          {values?.results.map((p) => (
            <div className="search-product-card" key={p._id}>
              <div className="search-product-img-box">
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                  className="search-product-img"
                />
              </div>

              <div className="search-product-body">
                <h5 className="search-product-name">{p.name}</h5>
                <p className="search-product-desc">
                  {p.description.substring(0, 60)}...
                </p>
                <p className="search-product-price">৳ {p.price}</p>

                <div className="search-btn-group">
                  <button
                    className="search-btn-details"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    Details
                  </button>

                  <button
                    className="search-btn-cart"
                    onClick={() => {
                      const item = { ...p, quantity: 1 };
                      setCart([...cart, item]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, item])
                      );
                      toast.success("Item Added to Cart");
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}

          {values?.results.length === 0 && (
            <h5 className="search-no-product">No products found</h5>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
