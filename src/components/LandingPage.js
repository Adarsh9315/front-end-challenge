import React from 'react';
import './LandingPage.css';

const LandingPage = ({ onEnterApp }) => {
  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <div className="logo">
          <span className="logo-icon">🎬</span>
          <span className="logo-text">MovieNom</span>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Discover & Nominate
            <span className="highlight"> Your Favorite Movies</span>
          </h1>
          <p className="hero-subtitle">
            Search through thousands of movies, discover hidden gems, and nominate 
            your top 5 picks for the ultimate movie awards.
          </p>
          <button className="cta-button" onClick={onEnterApp}>
            Start Nominating
            <span className="arrow">→</span>
          </button>
        </div>
        <div className="hero-visual">
          <div className="floating-cards">
            <div className="movie-card card-1">
              <div className="card-poster"></div>
              <div className="card-info">
                <div className="card-title"></div>
                <div className="card-year"></div>
              </div>
            </div>
            <div className="movie-card card-2">
              <div className="card-poster"></div>
              <div className="card-info">
                <div className="card-title"></div>
                <div className="card-year"></div>
              </div>
            </div>
            <div className="movie-card card-3">
              <div className="card-poster"></div>
              <div className="card-info">
                <div className="card-title"></div>
                <div className="card-year"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">How It Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Search Movies</h3>
            <p>Browse through the extensive OMDB database with our powerful search feature.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Nominate Favorites</h3>
            <p>Select up to 5 movies you believe deserve recognition and awards.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Manage List</h3>
            <p>Easily add or remove movies from your nomination list anytime.</p>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stat-item">
          <span className="stat-number">1M+</span>
          <span className="stat-label">Movies Available</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">5</span>
          <span className="stat-label">Nominations Per User</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">100%</span>
          <span className="stat-label">Free to Use</span>
        </div>
      </section>

      <footer className="landing-footer">
        <p>Powered by OMDB API | Built with React</p>
      </footer>
    </div>
  );
};

export default LandingPage;
