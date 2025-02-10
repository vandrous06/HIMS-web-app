import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import ForgotPassword from './components/ForgotPassword'
import Dashboard from './components/Dashboard'
import Sidebar from './components/Sidebar'
import logo from './assets/logo.png'
import avatar from './assets/avatar.png'
import doctorImage from './assets/doc.jpg'
import './App.css'
import { useState, useEffect } from 'react'

function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="landing-container">
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-brand">
          <div className="brand-logo">
            <img src={logo} alt="HIMS Logo" className="nav-logo" />
          </div>
          <div className="brand-text">
            <h1 className="system-name">Hospital Inventory Management System</h1>
          </div>
        </div>
        
        <div className="nav-right">
          <div className="developer-section">
            <img src={avatar} alt="Developer" className="developer-avatar" />
            <span className="developer-text">About the Developer</span>
          </div>
        </div>
      </nav>

      <main className="hero-section" style={{'--bg-image': `url(${doctorImage})`}}>
        <div className="hero-content">
          <h1 className="main-title">
            <span className="static-text">Manage Your</span>{' '}
            <span className="gradient-text">Hospital Inventory</span>
          </h1>
          
          <h2 className="subtitle">
            Streamline Your Medical Supply Chain
          </h2>

          <p className="description">
            Experience the next generation of healthcare inventory management with our AI-powered platform designed for modern medical facilities.
          </p>

          <Link to="/login" className="get-started-btn">
            Get Started
            <span className="arrow">→</span>
          </Link>
        </div>
      </main>

      <section className="features-section" id="features">
        <h2 className="features-title">Why Choose HIMS?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3 className="feature-title">Real-time Analytics</h3>
            <p className="feature-description">
              Track inventory levels, usage patterns, and stock movements with powerful analytics tools.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3 className="feature-title">AI-Powered Predictions</h3>
            <p className="feature-description">
              Predict stock requirements and optimize inventory levels using machine learning.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3 className="feature-title">Automated Ordering</h3>
            <p className="feature-description">
              Automate purchase orders and streamline your supply chain management.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3 className="feature-title">Mobile Access</h3>
            <p className="feature-description">
              Access your inventory system anywhere, anytime with our mobile-friendly platform.
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section company-info">
            <div className="footer-logo">HIMS</div>
            <p className="footer-description">
              Advanced hospital inventory management system powered by AI to streamline your medical supply chain.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
            </div>
          </div>

          <div className="footer-section quick-links">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section contact-info">
            <h3 className="footer-title">Contact Us</h3>
            <ul className="footer-links contact-details">
              <li>
                <i className="fas fa-envelope"></i>
                <a href="mailto:info@hims.com">iconbiztechnologies@gmail.com</a>
              </li>
              <li>
                <i className="fas fa-phone"></i>
                <a href="tel:+256 705 900828">+256 705900828</a>
              </li>
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <span>Plot 61, Kireka Rd<br />Mbuya, Kampala</span>
              </li>
            </ul>
          </div>

          <div className="footer-section map-section">
            <h3 className="footer-title">Find Us</h3>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7915414693275!2d32.570048973984505!3d0.20992176418121478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177d97003dc778b7%3A0xcb0f6c37c50c5ce0!2sICONBIZ%20Technologies!5e0!3m2!1sen!2sug!4v1730706181173!5m2!1sen!2sug" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 ICONBIZ Technologies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <Dashboard />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
      </Routes>
    </Router>
  )
}

export default App
