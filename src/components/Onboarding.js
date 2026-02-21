import React, { useState } from 'react';
import '../styles/Onboarding.css';

const Onboarding = ({ onComplete, onSkip }) => {
	const [currentStep, setCurrentStep] = useState(0);

	const steps = [
		{
			title: 'Welcome to Movie Nominations! 🎬',
			description: 'Discover and nominate your favorite movies using the OMDB database.',
			icon: '🎥'
		},
		{
			title: 'Search for Movies',
			description: 'Use the search box to find any movie you like. Search results will appear instantly as you type.',
			icon: '🔍'
		},
		{
			title: 'Nominate Your Favorites',
			description: 'Click the "Nominate" button to add movies to your nomination list. You can nominate up to 5 movies.',
			icon: '⭐'
		},
		{
			title: 'Manage Nominations',
			description: 'View your nominated movies below the search results. You can remove nominations at any time.',
			icon: '📝'
		},
		{
			title: 'Track Your Tasks',
			description: 'Switch to the "Todos" tab to manage your to-do list and stay organized.',
			icon: '✅'
		}
	];

	const handleNext = () => {
		if (currentStep < steps.length - 1) {
			setCurrentStep(currentStep + 1);
		} else {
			onComplete();
		}
	};

	const handlePrevious = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleSkip = () => {
		onSkip();
	};

	const currentStepData = steps[currentStep];
	const isLastStep = currentStep === steps.length - 1;

	return (
		<div className="onboarding-overlay">
			<div className="onboarding-modal">
				<button className="onboarding-skip" onClick={handleSkip}>
					Skip
				</button>
				
				<div className="onboarding-content">
					<div className="onboarding-icon">{currentStepData.icon}</div>
					<h2 className="onboarding-title">{currentStepData.title}</h2>
					<p className="onboarding-description">{currentStepData.description}</p>
					
					<div className="onboarding-dots">
						{steps.map((_, index) => (
							<span
								key={index}
								className={`dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
								onClick={() => setCurrentStep(index)}
							/>
						))}
					</div>
				</div>

				<div className="onboarding-footer">
					<button
						className="onboarding-btn onboarding-btn-secondary"
						onClick={handlePrevious}
						disabled={currentStep === 0}
					>
						Previous
					</button>
					<span className="onboarding-step-counter">
						{currentStep + 1} / {steps.length}
					</span>
					<button
						className="onboarding-btn onboarding-btn-primary"
						onClick={handleNext}
					>
						{isLastStep ? 'Get Started' : 'Next'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Onboarding;
