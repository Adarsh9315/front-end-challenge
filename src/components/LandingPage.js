import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page text-center" style={{ padding: '50px', color: 'white' }}>
      <h1>Welcome to The Shoppies</h1>
      <p className="lead">Nominate your favorite movies!</p>
      <Link to="/app" className="btn btn-primary btn-lg mt-3">
        Enter App
      </Link>
    </div>
  );
};

export default LandingPage;
