import { useState } from 'react';
import { Link } from 'react-router-dom';
import doctorImage from '../assets/doc.jpg';
import './Auth.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic here
  };

  return (
    <div className="auth-container" style={{'--auth-bg-image': `url(${doctorImage})`}}>
      <div className="auth-card">
        <Link to="/" className="auth-logo">HIMS</Link>
        <h2>Reset Password</h2>
        <p className="auth-subtitle">Enter your email to receive password reset code</p>
        
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
          
          <button type="submit" className="auth-submit">
            Send Reset Code
          </button>
        </form>
        
        <p className="auth-switch">
          Remember your password? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword; 