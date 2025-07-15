import React from 'react';
import { Link } from 'react-router-dom';
import TaskList from '../components/TaskList';

const Home = () => {
  console.log('Home component rendered'); // Debug log to confirm rendering

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        paddingTop: '2rem',
        paddingBottom: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <div className="col-lg-8" style={{ maxWidth: '720px', width: '100%' }}>
        <div
          className="card shadow-sm border-0 mb-4"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.85)', // slightly transparent white for contrast
            borderRadius: '0.5rem',
          }}
        >
          <div className="card-body">
            <h3 className="card-title text-center text-primary mb-3">
              📝 TaskMate - Smart Task Organizer
            </h3>
            <p className="card-text text-muted text-center">
              Easily manage your daily tasks, track progress, and stay productive.
            </p>
            <hr />

            {/* Your existing TaskList component */}
            <TaskList />

            {/* Enable 2FA button */}
            <div className="text-center mt-4">
              <Link to="/enable-2fa" className="btn btn-primary">
                Enable 2FA
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
