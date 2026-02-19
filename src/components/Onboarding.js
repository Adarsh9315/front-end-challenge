import React, { useState } from 'react';

const Onboarding = ({ onComplete }) => {
	const [currentStep, setCurrentStep] = useState(0);

	const steps = [
		{
			title: 'Welcome to Movie App!',
			description: 'Discover and nominate your favorite movies. Let\'s get you started with a quick tour.',
			target: null
		},
		{
			title: 'Search for Movies',
			description: 'Use the search box to find movies from our vast database. Type any movie name to begin.',
			target: 'search'
		},
		{
			title: 'Add Nominations',
			description: 'Found a movie you love? Click the "+" button to add it to your nominations list. You can nominate up to 5 movies.',
			target: 'movies'
		},
		{
			title: 'Manage Your Nominations',
			description: 'View and remove your nominations below. Click the "X" button to remove any movie from your list.',
			target: 'nominations'
		},
		{
			title: 'Track Your Todos',
			description: 'Switch to the Todos tab to manage your tasks and stay organized.',
			target: 'todos'
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

	const currentStepData = steps[currentStep];

	return (
		<div className='onboarding-overlay'>
			<div className='onboarding-modal'>
				<div className='onboarding-header'>
					<h2>{currentStepData.title}</h2>
					<button className='onboarding-close' onClick={handleSkip}>
						×
					</button>
				</div>
				<div className='onboarding-body'>
					<p>{currentStepData.description}</p>
					<div className='onboarding-progress'>
						{steps.map((_, index) => (
							<div
								key={index}
								className={`progress-dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
							/>
						))}
					</div>
				</div>
				<div className='onboarding-footer'>
					<button
						className='onboarding-btn secondary'
						onClick={handleSkip}
					>
						Skip Tour
					</button>
					<div className='onboarding-navigation'>
						{currentStep > 0 && (
							<button
								className='onboarding-btn secondary'
								onClick={handlePrevious}
							>
								Previous
							</button>
						)}
						<button
							className='onboarding-btn primary'
							onClick={handleNext}
						>
							{currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Onboarding;
