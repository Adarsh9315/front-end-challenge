import React, { useState } from 'react';
import '../Onboarding.css';

const Onboarding = ({ onComplete }) => {
	const [currentStep, setCurrentStep] = useState(0);

	const steps = [
		{
			title: 'Welcome to Movie Nominator & Todo App! 🎬',
			description: 'This app helps you discover and nominate your favorite movies, while also managing your daily tasks.',
			icon: '🎉'
		},
		{
			title: 'Search & Nominate Movies',
			description: 'Use the search box to find movies from our database. Click on any movie to add it to your nominations. You can nominate up to 5 movies!',
			icon: '🔍'
		},
		{
			title: 'Manage Your Nominations',
			description: 'View all your nominated movies in the "Nominations" section. Click on any nomination to remove it if you change your mind.',
			icon: '⭐'
		},
		{
			title: 'Track Your Todos',
			description: 'Switch to the "Todos" tab to create and manage your daily tasks. Stay organized while enjoying your favorite movies!',
			icon: '✓'
		},
		{
			title: 'Ready to Start!',
			description: 'You\'re all set! Start by searching for your favorite movies or managing your todos. Have fun!',
			icon: '🚀'
		}
	];

	const handleNext = () => {
		if (currentStep < steps.length - 1) {
			setCurrentStep(currentStep + 1);
		} else {
			handleFinish();
		}
	};

	const handlePrevious = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleSkip = () => {
		handleFinish();
	};

	const handleFinish = () => {
		localStorage.setItem('onboardingCompleted', 'true');
		onComplete();
	};

	const currentStepData = steps[currentStep];

	return (
		<div className='onboarding-overlay'>
			<div className='onboarding-modal'>
				<div className='onboarding-content'>
					<div className='onboarding-icon'>{currentStepData.icon}</div>
					<h2 className='onboarding-title'>{currentStepData.title}</h2>
					<p className='onboarding-description'>{currentStepData.description}</p>
					
					<div className='onboarding-progress'>
						{steps.map((_, index) => (
							<div
								key={index}
								className={`progress-dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
								onClick={() => setCurrentStep(index)}
							/>
						))}
					</div>

					<div className='onboarding-step-counter'>
						Step {currentStep + 1} of {steps.length}
					</div>
				</div>

				<div className='onboarding-actions'>
					<button className='onboarding-btn onboarding-btn-secondary' onClick={handleSkip}>
						Skip
					</button>
					<div className='onboarding-nav-buttons'>
						{currentStep > 0 && (
							<button className='onboarding-btn onboarding-btn-secondary' onClick={handlePrevious}>
								Previous
							</button>
						)}
						<button className='onboarding-btn onboarding-btn-primary' onClick={handleNext}>
							{currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Onboarding;
