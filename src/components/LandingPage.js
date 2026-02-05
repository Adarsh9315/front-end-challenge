import React from 'react';

const LandingPage = ({ onEnter }) => {
  return (
    <div className="landing-page">
      <div className="landing-hero">
        <div className="landing-content">
          <h1 className="landing-title">
            <span className="title-icon">🎬</span>
            The Shoppies
          </h1>
          <p className="landing-subtitle">
            Movie Awards for Entrepreneurs
          </p>
          <p className="landing-description">
            Discover and nominate your favorite movies. Search through thousands of films 
            and choose up to 5 nominees for the prestigious Shoppies Award.
          </p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Search Movies</h3>
              <p>Browse through the OMDB database with thousands of movies at your fingertips</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3>Nominate Favorites</h3>
              <p>Select up to 5 movies you believe deserve recognition and awards</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💾</div>
              <h3>Save Progress</h3>
              <p>Your nominations are automatically saved so you can continue anytime</p>
            </div>
          </div>

          <button className="cta-button" onClick={onEnter}>
            Start Nominating
            <span className="cta-arrow">→</span>
          </button>
        </div>
      </div>
      
      <div className="landing-footer">
        <p>Powered by OMDB API</p>
      </div>
    </div>
  );
};

export default LandingPage;
