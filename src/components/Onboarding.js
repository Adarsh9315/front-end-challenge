import React, { useState } from 'react';
import './Onboarding.css';

const Onboarding = ({ onComplete }) => {
	const [currentStep, setCurrentStep] = useState(0);

	const steps = [
		{
			title: 'Welcome to Movie App!',
			content: 'This app helps you search for movies and create your own nomination list. Let\'s get started!',
			icon: '🎬'
		},
		{
			title: 'Search for Movies',
			content: 'Use the search box at the top to find movies. Just type the movie name and results will appear automatically.',
			icon: '🔍'
		},
		{
			title: 'Nominate Movies',
			content: 'Click the "Nominate" button on any movie to add it to your nominations list. You can nominate up to 5 movies!',
			icon: '⭐'
		},
		{
			title: 'Manage Nominations',
			content: 'View your nominated movies at the bottom. You can remove nominations by clicking the "Remove" button.',
			icon: '📋'
		},
		{
			title: 'Navigate Pages',
			content: 'Use the navigation bar at the top to switch between Movies and Todos pages.',
			icon: '🧭'
		},
		{
			title: 'You\'re All Set!',
			content: 'Start exploring and building your movie nomination list. Have fun!',
			icon: '🎉'
		}
	];

	const handleNext = () => {
		if (currentStep < steps.length - 1) {
			setCurrentStep(currentStep + 1);
		} else {
			handleComplete();
		}
	};

	const handlePrevious = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleSkip = () => {
		handleComplete();
	};

	const handleComplete = () => {
		localStorage.setItem('onboardingCompleted', 'true');
		onComplete();
	};

	return (
		<div className="onboarding-overlay">
			<div className="onboarding-modal">
				<div className="onboarding-header">
					<span className="onboarding-step-indicator">
						Step {currentStep + 1} of {steps.length}
					</span>
					<button className="onboarding-skip-btn" onClick={handleSkip}>
						Skip
					</button>
				</div>
				
				<div className="onboarding-content">
					<div className="onboarding-icon">{steps[currentStep].icon}</div>
					<h2 className="onboarding-title">{steps[currentStep].title}</h2>
					<p className="onboarding-text">{steps[currentStep].content}</p>
				</div>

				<div className="onboarding-progress">
					{steps.map((_, index) => (
						<div
							key={index}
							className={`progress-dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
						/>
					))}
				</div>

				<div className="onboarding-actions">
					{currentStep > 0 && (
						<button className="onboarding-btn onboarding-btn-secondary" onClick={handlePrevious}>
							Previous
						</button>
					)}
					<button className="onboarding-btn onboarding-btn-primary" onClick={handleNext}>
						{currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Onboarding;
