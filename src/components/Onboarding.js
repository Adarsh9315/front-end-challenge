import React, { useState } from 'react';

const Onboarding = ({ onComplete }) => {
	const [currentStep, setCurrentStep] = useState(0);

	const steps = [
		{
			title: 'Welcome to Movie App!',
			description: 'This app helps you search for movies and nominate your favorites using the OMDB API.',
			icon: '🎬'
		},
		{
			title: 'Search Movies',
			description: 'Use the search box to find any movie you want. Results will appear instantly as you type.',
			icon: '🔍'
		},
		{
			title: 'Nominate Your Favorites',
			description: 'Click the "Nominate" button on any movie to add it to your nominations list. You can nominate up to 5 movies.',
			icon: '⭐'
		},
		{
			title: 'Manage Your Todos',
			description: 'Switch to the Todos tab to create and manage your personal todo list.',
			icon: '✅'
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

	const handleComplete = () => {
		localStorage.setItem('onboarding_completed', 'true');
		onComplete();
	};

	const handleSkip = () => {
		handleComplete();
	};

	return (
		<div className='onboarding-overlay'>
			<div className='onboarding-modal'>
				<div className='onboarding-header'>
					<div className='step-indicator'>
						Step {currentStep + 1} of {steps.length}
					</div>
					<button className='skip-btn' onClick={handleSkip}>
						Skip
					</button>
				</div>

				<div className='onboarding-content'>
					<div className='onboarding-icon'>{steps[currentStep].icon}</div>
					<h2 className='onboarding-title'>{steps[currentStep].title}</h2>
					<p className='onboarding-description'>{steps[currentStep].description}</p>
				</div>

				<div className='onboarding-progress'>
					{steps.map((_, index) => (
						<div
							key={index}
							className={`progress-dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
						/>
					))}
				</div>

				<div className='onboarding-buttons'>
					<button
						className='onboarding-btn secondary'
						onClick={handlePrevious}
						disabled={currentStep === 0}
						style={{ visibility: currentStep === 0 ? 'hidden' : 'visible' }}
					>
						Previous
					</button>
					<button className='onboarding-btn primary' onClick={handleNext}>
						{currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Onboarding;
