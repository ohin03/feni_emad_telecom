import React from 'react';
import Layout from '../components/Layout/Layout';
import useCategory from '../hooks/useCategory';
import { Link } from 'react-router-dom';
import { IoGridOutline, IoChevronForward, IoFlashOutline } from "react-icons/io5";
import './Categories.css';

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title="Browse Categories | Premium Store">
      <div className="categories-wrapper">
        <div className="container py-5">
          
          {/* Section Header */}
          <div className="cat-page-header text-center mb-5">
            <span className="premium-tag">
              <IoFlashOutline /> Curated Collections
            </span>
            <h1 className="main-cat-title">Shop by Category</h1>
            <p className="sub-cat-text">Find exactly what you're looking for within our specialized departments.</p>
          </div>

          {/* Luxury Grid */}
          <div className="row g-3 g-md-4">
            {categories.map((c) => (
              <div className="col-6 col-md-4 col-lg-3" key={c._id}>
                <Link to={`/category/${c.slug}`} className="luxury-cat-card">
                  <div className="cat-icon-box">
                    <IoGridOutline size={24} />
                  </div>
                  <div className="cat-content-bottom">
                    <h5 className="cat-name-pro">{c.name}</h5>
                    <span className="explore-btn-mini">
                      Explore <IoChevronForward />
                    </span>
                  </div>
                  {/* Decorative Background Element */}
                  <div className="card-bg-glow"></div>
                </Link>
              </div>
            ))}
          </div>

          {categories.length === 0 && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;