import React, { useState, useEffect } from 'react';

const Onboarding = ({ onDismiss }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (hasSeenOnboarding) {
      setVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setVisible(false);
    if (onDismiss) onDismiss();
  };

  if (!visible) return null;

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-modal">
        <h2>Welcome to Movie Nominations!</h2>
        <div className="onboarding-steps">
          <div className="onboarding-step">
            <span className="step-number">1</span>
            <p>Search for your favorite movies using the search box above</p>
          </div>
          <div className="onboarding-step">
            <span className="step-number">2</span>
            <p>Click the "Nominate" button to add movies to your nominations list</p>
          </div>
          <div className="onboarding-step">
            <span className="step-number">3</span>
            <p>You can nominate up to 5 movies for the Shoppies award</p>
          </div>
          <div className="onboarding-step">
            <span className="step-number">4</span>
            <p>Remove nominations by clicking the remove button</p>
          </div>
        </div>
        <button className="onboarding-btn" onClick={handleDismiss}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
