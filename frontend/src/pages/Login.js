import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', formData);
      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea, #764ba2)', // soft muted blue-purple
        backdropFilter: 'blur(6px)',
      }}
    >
      <div className="col-md-6 col-lg-5">
        <div
          className="card border-0 shadow"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.12)', // more subtle transparent white
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            borderRadius: '1rem',
            color: '#f1f1f1', // soft off-white text
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)', // softer shadow
          }}
        >
          <div className="card-body p-4">
            <h3 className="text-center mb-4" style={{ color: '#f1f1f1' }}>
              🔐 Login to{' '}
              <span style={{ color: '#fff', fontWeight: '700' }}>
                TaskMate
              </span>
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" style={{ color: '#ddd' }}>
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="you@example.com"
                  required
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: '#eee',
                    border: 'none',
                  }}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label" style={{ color: '#ddd' }}>
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  required
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: '#eee',
                    border: 'none',
                  }}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <div className="d-grid mb-3">
                <button
                  type="submit"
                  className="btn btn-light text-primary fw-bold"
                  style={{ backgroundColor: '#a3a1ff' }}
                >
                  Login
                </button>
              </div>
              <p className="text-center mb-0" style={{ color: '#bbb' }}>
                Don’t have an account?{' '}
                <a
                  href="/register"
                  style={{
                    color: '#fff',
                    textDecoration: 'underline',
                    fontWeight: '600',
                  }}
                >
                  Register here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
