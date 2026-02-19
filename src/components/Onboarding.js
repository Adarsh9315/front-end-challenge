import React, { useState } from 'react';

const Onboarding = ({ onComplete }) => {
	const [currentStep, setCurrentStep] = useState(0);

	const steps = [
		{
			title: 'Welcome to Movie & Todo App!',
			description: 'This app helps you search for movies, create nominations, and manage your tasks.',
			icon: '🎬'
		},
		{
			title: 'Search & Nominate Movies',
			description: 'Use the Movies tab to search for your favorite films and nominate up to 5 movies. Your nominations are saved locally.',
			icon: '🍿'
		},
		{
			title: 'Manage Your Todos',
			description: 'Switch to the Todos tab to create, edit, and track your daily tasks. Stay organized and productive!',
			icon: '✓'
		},
		{
			title: 'Ready to Get Started?',
			description: 'You\'re all set! Explore the app and enjoy managing your movies and tasks.',
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
			<div className="onboarding-modal">
				<div className="onboarding-icon">{step.icon}</div>
				<h2 className="onboarding-title">{step.title}</h2>
				<p className="onboarding-description">{step.description}</p>

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
						<button className="onboarding-btn secondary" onClick={handlePrevious}>
							Previous
						</button>
					)}
					<button className="onboarding-btn skip" onClick={handleSkip}>
						Skip
					</button>
					<button className="onboarding-btn primary" onClick={handleNext}>
						{currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Onboarding;
