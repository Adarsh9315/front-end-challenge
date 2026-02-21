import React, { useState, useEffect } from 'react';
import './Onboarding.css';

const Onboarding = ({ onComplete }) => {
	const [currentStep, setCurrentStep] = useState(0);

	const steps = [
		{
			title: 'Welcome to Movie App!',
			content: 'This app helps you search for movies and nominate your top 5 favorites. Let\'s get started!',
			position: 'center'
		},
		{
			title: 'Search for Movies',
			content: 'Use the search box at the top to find movies. Type any movie title and results will appear below.',
			position: 'top',
			target: 'search-box'
		},
		{
			title: 'Nominate Movies',
			content: 'Click the "Nominate" button on any movie to add it to your nominations. You can nominate up to 5 movies.',
			position: 'center'
		},
		{
			title: 'View Your Nominations',
			content: 'Your nominated movies appear in the "Nominations" section below. You can remove them by clicking "Remove".',
			position: 'center'
		},
		{
			title: 'Navigate Between Pages',
			content: 'Use the navigation bar at the top to switch between "Movies" and "Todos" pages.',
			position: 'top',
			target: 'navigation-bar'
		},
		{
			title: "You're All Set!",
			content: 'Start searching for movies and building your nomination list. Have fun!',
			position: 'center'
		}
	];

	const handleNext = () => {
		if (currentStep < steps.length - 1) {
			setCurrentStep(currentStep + 1);
		} else {
			handleComplete();
		}
	};

	const handleSkip = () => {
		handleComplete();
	};

	const handleComplete = () => {
		localStorage.setItem('onboardingCompleted', 'true');
		onComplete();
	};

	const currentStepData = steps[currentStep];
	const isLastStep = currentStep === steps.length - 1;

	return (
		<div className="onboarding-overlay">
			<div className="onboarding-backdrop" onClick={handleSkip}></div>
			<div className={`onboarding-modal onboarding-${currentStepData.position}`}>
				<div className="onboarding-content">
					<div className="onboarding-header">
						<h2>{currentStepData.title}</h2>
						<button className="onboarding-close" onClick={handleSkip}>
							×
						</button>
					</div>
					<div className="onboarding-body">
						<p>{currentStepData.content}</p>
						<div className="onboarding-progress">
							{steps.map((_, index) => (
								<div
									key={index}
									className={`progress-dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
								/>
							))}
						</div>
					</div>
					<div className="onboarding-footer">
						<button className="onboarding-btn skip-btn" onClick={handleSkip}>
							Skip
						</button>
						<button className="onboarding-btn next-btn" onClick={handleNext}>
							{isLastStep ? 'Get Started' : 'Next'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Onboarding;
