import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebookF, FaWhatsapp, FaTelegramPlane, FaYoutube,
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaShieldAlt, FaCheckCircle 
} from 'react-icons/fa';
import { HiOutlineArrowRight } from 'react-icons/hi';
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="ultra-footer">
      {/* Premium Wave Top */}
      <div className="footer-wave-container">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="wave-path"></path>
        </svg>
      </div>

      <div className="container footer-main-content">
        <div className="row gy-5">
          
          {/* Brand & Trust Badges */}
          <div className="col-lg-4 col-md-12 text-center text-lg-start">
            <h2 className="footer-logo">EMAD <span>TELECOM</span></h2>
            <p className="footer-moto">Providing 100% Genuine Smartphones & Expert Repairing Solutions in Feni.</p>
            
            {/* Trust Badges - Clients will love this */}
            <div className="trust-badges d-flex justify-content-center justify-content-lg-start gap-3 mb-4">
               <div className="t-badge"><FaShieldAlt /> <span>Original Products</span></div>
               <div className="t-badge"><FaCheckCircle /> <span>Verified Shop</span></div>
            </div>

            <div className="premium-socials">
              <a href="https://facebook.com/nur.foisal.ohin" className="ps-link"><FaFacebookF /></a>
              <a href="https://wa.me/8801971676314" className="ps-link"><FaWhatsapp /></a>
              <a href="#" className="ps-link"><FaTelegramPlane /></a>
              <a href="#" className="ps-link"><FaYoutube /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-6 ps-lg-5">
            <h5 className="footer-head">Quick links</h5>
            <ul className="footer-nav">
              <li><Link to="/"><HiOutlineArrowRight /> Home</Link></li>
              <li><Link to="/about"><HiOutlineArrowRight /> About Us</Link></li>
              <li><Link to="/contact"><HiOutlineArrowRight /> Contact</Link></li>
              <li><Link to="/categories"><HiOutlineArrowRight /> Shop Now</Link></li>
            </ul>
          </div>

          {/* Policy Links */}
          <div className="col-lg-2 col-6">
            <h5 className="footer-head">Support</h5>
            <ul className="footer-nav">
              <li><Link to="/policy"><HiOutlineArrowRight /> Privacy</Link></li>
             
            </ul>
          </div>

          {/* Contact - Clean 1 Line Style */}
          <div className="col-lg-4 col-md-12">
            <h5 className="footer-head text-center text-lg-start">Get In Touch</h5>
            <div className="contact-info-list">
              <div className="ci-item">
                <div className="ci-icon"><FaMapMarkerAlt /></div>
                <div className="ci-text">Hazari Road, Mohipal, Feni, BD</div>
              </div>
              <div className="ci-item">
                <div className="ci-icon"><FaPhoneAlt /></div>
                <div className="ci-text">+880 1971 676314</div>
              </div>
              <div className="ci-item">
                <div className="ci-icon"><FaEnvelope /></div>
                <div className="ci-text">ohinnurfoisal@gmail.com</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bottom-bar">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <p className="mb-0 text-muted">© {currentYear} <span className="text-white">EMAD TELECOM</span>. All Rights Reserved.</p>
          <div className="payment-icons">
             <img src="https://i.ibb.co/9vXW3zX/bkash-logo.png" alt="bkash" className="img-fluid" />
             <img src="https://i.ibb.co/Qf98XyH/nagad-logo.png" alt="nagad" className="img-fluid" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;