import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/register', formData);
      alert('Registration successful. You can now login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className="col-md-6 col-lg-5">
        <div
          className="card border-0 shadow-lg"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            color: '#fff',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          }}
        >
          <div className="card-body p-4">
            <h3 className="text-center mb-4">📝 Register to <span style={{ color: '#ffe082' }}>TaskMate</span></h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter username"
                  required
                  style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', border: 'none' }}
                  onChange={e => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="you@example.com"
                  required
                  style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', border: 'none' }}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  required
                  style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', border: 'none' }}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
              <div className="d-grid mb-3">
                <button type="submit" className="btn btn-light text-primary fw-bold">Register</button>
              </div>
              <p className="text-center mb-0 text-white-50">
                Already have an account? <a href="/login" className="text-warning text-decoration-none">Login here</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
