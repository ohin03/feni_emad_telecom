import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './Register.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [answer, setAnswer] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // ক্যালকুলেট করছি কতটুকু ফর্ম পূরণ হয়েছে (Visual Progress)
    const calculateProgress = () => {
        const fields = [name, email, password, phone, address, answer];
        const filledFields = fields.filter(f => f !== '').length;
        return (filledFields / fields.length) * 100;
    };

    // ✅ Validation function
    const validateForm = () => {
        // Name validation
        if (!name.trim() || name.trim().length < 3) {
            toast.error('Full Name must be at least 3 characters');
            return false;
        }

        // Email validation (simple regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Enter a valid email address');
            return false;
        }

        // Password validation
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return false;
        }

        // Phone validation (10-14 digits)
        const phoneRegex = /^\d{10,14}$/;
        if (!phoneRegex.test(phone)) {
            toast.error('Phone number must be 10-14 digits');
            return false;
        }

        // Address validation
        if (!address.trim() || address.trim().length < 5) {
            toast.error('Address must be at least 5 characters');
            return false;
        }

        // Security Answer validation
        if (!answer.trim() || answer.trim().length < 2) {
            toast.error('Security answer must be at least 2 characters');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ Check validation before API call
        if (!validateForm()) return;

        try {
            const res = await axios.post('/api/v1/auth/register', {
                name, email, password, phone, address, answer,
            });
            if (res?.data?.success) {
                toast.success(res.data.message);
                navigate('/login');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration error');
        }
    };

    return (
        <Layout title="Create Account - Emad Telecom">
            <div className="register-elite-wrapper">
                <div className="auth-container">
                    {/* Left Side: Visual Branding (Pro Look) */}
                    <div className="auth-visual-side d-none d-lg-flex">
                        <div className="visual-content">
                            <div className="pulse-circle"></div>
                            <h2>Create your new account</h2>
                            <p>Create your account for buying our products and stay with us</p>
                            <div className="feature-tags">
                                <span>⚡ Fast</span>
                                <span>🔒 Secure</span>
                                <span>📊 Analytics</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="auth-form-side">
                        <div className="form-inner">
                            <div className="form-header">
                                <h1>Get Started</h1>
                                <p>Fill in your details to create an account</p>
                                <div className="progress-container">
                                    <div className="progress-bar-fill" style={{ width: `${calculateProgress()}%` }}></div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="elite-form">
                                <div className="input-row">
                                    <div className="custom-field">
                                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder=" " />
                                        <label>Full Name</label>
                                        <span className="focus-border"></span>
                                    </div>
                                    <div className="custom-field">
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder=" " />
                                        <label>Email Address</label>
                                        <span className="focus-border"></span>
                                    </div>
                                </div>

                                <div className="input-row">
                                    <div className="custom-field password-group">
                                        <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder=" " />
                                        <label>Password</label>
                                        <span className="focus-border"></span>
                                        <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? "🙈" : "👁️"}
                                        </button>
                                    </div>
                                    <div className="custom-field">
                                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder=" " />
                                        <label>Phone Number</label>
                                        <span className="focus-border"></span>
                                    </div>
                                </div>

                                <div className="custom-field">
                                    <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} required placeholder=" " />
                                    <label>Security Answer (Favorite Sport?)</label>
                                    <span className="focus-border"></span>
                                </div>

                                <div className="custom-field">
                                    <textarea value={address} onChange={(e) => setAddress(e.target.value)} required placeholder=" " rows="1"></textarea>
                                    <label>Home Address</label>
                                    <span className="focus-border"></span>
                                </div>

                                <button type="submit" className="elite-submit-btn">
                                    <span>Create Account</span>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
                                </button>
                            </form>
                            <p className="footer-text">Already a member? <span onClick={() => navigate('/login')}>Login</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Register;