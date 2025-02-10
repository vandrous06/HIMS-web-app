import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import doctorImage from '../assets/doc.jpg';
import './Auth.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
    
    // Later you can add actual authentication logic here
  };

  return (
    <div className="auth-container" style={{'--auth-bg-image': `url(${doctorImage})`}}>
      <div className="auth-circle-1"></div>
      <div className="auth-circle-2"></div>
      
      <div className="auth-card">
        <Link to="/" className="auth-logo">HIMS</Link>
        <h2>Welcome Back !</h2>
        <p className="auth-subtitle">Enter your credentials to access your HIMS account</p>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <div className="form-footer">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
          </div>
          
          <button type="submit" className="auth-submit">
            Sign In
          </button>
        </form>
        
        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage; 