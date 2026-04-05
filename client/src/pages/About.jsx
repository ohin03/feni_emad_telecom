import React from 'react';
import Layout from '../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import { 
  FaFingerprint, FaMicrochip, FaShieldVirus, FaRocket, 
  FaCheckCircle, FaAward, FaUserShield, FaHeadset 
} from "react-icons/fa";
import { 
  HiOutlineArrowNarrowRight, HiOutlineLocationMarker, 
  HiOutlineExternalLink, HiBadgeCheck 
} from "react-icons/hi";
import "./About.css";

function About() {
  const navigate = useNavigate();
  const googleMapsUrl = "https://www.google.com/maps/search/Hajari+Road+Mohipal+Feni";

  return (
    <Layout title="About Emad Telecom | Feni's Most Trusted Tech Store">
      <div className="about-dark-edition">
        
        {/* --- 1. HERO SECTION --- */}
        <section className="neon-hero">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <div className="glitch-wrapper">
                  <div className="verified-badge">
                    <HiBadgeCheck className="text-info" /> VERIFIED BUSINESS SINCE 2018
                  </div>
                  <h1 className="hero-headline">
                    The Gold Standard <br/>
                    <span className="accent-text">Of Tech In Feni.</span>
                  </h1>
                  <p className="hero-para">
                    Emad Telecom is not just a retail shop; it's a legacy of authenticity. 
                    Serving **Mohipal, Hajari Road** for over 7 years, we provide 
                    original smartphones, premium accessories, and surgical-grade repairs.
                  </p>
                  <div className="hero-actions">
                    <button className="btn-neon" onClick={() => navigate('/categories')}>
                      Shop Collection <HiOutlineArrowNarrowRight />
                    </button>
                    <div className="live-stat">
                      <span className="dot"></span> 15,000+ Verified Sales
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 2. TRUST PARTNERS (New Section) --- */}
        <section className="partner-strip py-4">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-4 opacity-50 filter-grayscale">
                <span className="fw-bold">APPLE</span>
                <span className="fw-bold">SAMSUNG</span>
                <span className="fw-bold">XIAOMI</span>
                <span className="fw-bold">REALME</span>
                <span className="fw-bold">ONEPLUS</span>
                <span className="fw-bold">VIVO</span>
            </div>
          </div>
        </section>

        {/* --- 3. CORE DNA (DNA CARDS) --- */}
        <section className="dna-section py-100">
          <div className="container">
            <div className="section-title text-center mb-5">
                <h2 className="fw-bold">Why Feni Chooses Us?</h2>
                <p className="text-muted">Built on the foundation of 100% honesty.</p>
            </div>
            <div className="grid-dna">
              <div className="dna-card">
                <FaMicrochip className="dna-icon" />
                <h4>Advanced Repair Lab</h4>
                <p>Equipped with thermal imaging and microscope-level soldering for dead-mobile recovery.</p>
              </div>
              <div className="dna-card active">
                <FaAward className="dna-icon" />
                <h4>Official Warranty</h4>
                <p>We only deal with official and verified global units with valid brand warranties.</p>
              </div>
              <div className="dna-card">
                <FaUserShield className="dna-icon" />
                <h4>Secure Payments</h4>
                <p>Safe and encrypted transactions for both online and offline purchases.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- 4. BENTO TRUST BOXES --- */}
        <section className="bento-section py-5">
          <div className="container">
            <div className="bento-grid">
              <div className="bento-item item-large">
                <div className="bento-content">
                  <h3 className="fw-bold text-info">Our 7-Year Promise</h3>
                  <p>From the first day in Mohipal, we promised never to sell a "Master Copy" or "Refurbished" phone as new. Today, that promise makes us the #1 shop on Hajari Road.</p>
                  <ul className="list-unstyled mt-3">
                    <li><FaCheckCircle className="text-info me-2"/> 7 Days Replacement Guarantee</li>
                    <li><FaCheckCircle className="text-info me-2"/> Lifetime Software Support</li>
                    <li><FaCheckCircle className="text-info me-2"/> Original Box & Accessories Only</li>
                  </ul>
                  <FaRocket className="bento-bg-icon" />
                </div>
              </div>
              <div className="bento-item item-small bg-blue">
                <FaHeadset className="mb-3 fs-1" />
                <h4>Expert Consultation</h4>
                <p>Confused? Talk to our gadget experts before buying.</p>
              </div>
              <div className="bento-item item-small bg-dark border-blue text-center">
                 <h2 className="display-4 fw-bold">4.9/5</h2>
                 <p className="small text-info">Google Customer Rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- 5. LOCATION & FLAGSHIP HUB (FIXED IMAGE) --- */}
        <section className="location-dark py-100">
          <div className="container">
            <div className="glass-location-card">
              <div className="row g-0 align-items-stretch">
                <div className="col-md-6">
                  <div className="loc-text p-5">
                    <HiOutlineLocationMarker className="loc-pin" />
                    <h2 className="fw-bold mb-3">Visit the Hub</h2>
                    <h4 className="text-info mb-1">Hajari Road, Poshim Matha</h4>
                    <p className="opacity-75">Mohipal, Feni Sadar, Feni - 3900, Bangladesh.</p>
                    <p className="small text-muted mt-2">Open: 10:00 AM - 10:00 PM (Everyday)</p>
                    
                    <hr className="my-4 opacity-10" />
                    
                    <a 
                      href={googleMapsUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-map-action"
                    >
                      Get Directions <HiOutlineExternalLink />
                    </a>
                  </div>
                </div>
                <div className="col-md-6 d-none d-md-block">
                  <div className="loc-img-container">
                    <img 
                      src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1000" 
                      alt="Emad Telecom Store" 
                      className="loc-img" 
                    />
                    <div className="img-overlay-dark"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}

export default About;