import React, { useState } from 'react';

const Onboarding = ({ onComplete }) => {
	const [currentStep, setCurrentStep] = useState(0);

	const steps = [
		{
			title: 'Welcome to Movie & Todo App',
			description: 'This app helps you discover and nominate your favorite movies, as well as manage your daily tasks.',
			icon: '🎬'
		},
		{
			title: 'Discover Movies',
			description: 'Search for movies using the search bar. You can nominate up to 5 movies that you love.',
			icon: '🔍'
		},
		{
			title: 'Manage Nominations',
			description: 'Your nominations are saved locally. You can add or remove movies from your nomination list anytime.',
			icon: '⭐'
		},
		{
			title: 'Track Your Todos',
			description: 'Switch to the Todos page to create, edit, and manage your daily tasks efficiently.',
			icon: '✓'
		},
		{
			title: 'Get Started',
			description: 'You\'re all set! Start exploring movies or managing your todos.',
			icon: '🚀'
		}
	];

	const handleNext = () => {
		if (currentStep < steps.length - 1) {
			setCurrentStep(currentStep + 1);
		} else {
			onComplete();
		}
	};

	const handleSkip = () => {
		onComplete();
	};

	const handlePrevious = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const step = steps[currentStep];

	return (
		<div className="onboarding-overlay">
			<div className="onboarding-container">
				<div className="onboarding-content">
					<div className="onboarding-icon">{step.icon}</div>
					<h2 className="onboarding-title">{step.title}</h2>
					<p className="onboarding-description">{step.description}</p>

					<div className="onboarding-progress">
						{steps.map((_, index) => (
							<span
								key={index}
								className={`progress-dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
							/>
						))}
					</div>

					<div className="onboarding-buttons">
						{currentStep > 0 && (
							<button className="onboarding-btn secondary" onClick={handlePrevious}>
								Previous
							</button>
						)}
						<button className="onboarding-btn secondary" onClick={handleSkip}>
							Skip
						</button>
						<button className="onboarding-btn primary" onClick={handleNext}>
							{currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Onboarding;
