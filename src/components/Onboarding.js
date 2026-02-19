import React, { useState } from 'react';

const steps = [
	{
		title: 'Welcome to Movie Nominations',
		description:
			'Discover movies, nominate your favorites, and manage your personal todo list — all in one place. Let us show you around!',
		emoji: '🎬',
	},
	{
		title: 'Search for Movies',
		description:
			'Use the search bar at the top of the Movies page to find any movie. Results are fetched live from the Open Movie Database as you type.',
		emoji: '🔍',
	},
	{
		title: 'Nominate Your Favorites',
		description:
			'Found a movie you love? Click "Add Nomination" to add it to your nominations list. You can nominate up to 5 movies. Remove any nomination at any time.',
		emoji: '⭐',
	},
	{
		title: 'Todos & Navigation',
		description:
			'Switch between the Movies and Todos pages using the navigation bar at the top. The Todos page lets you create, complete, and manage a personal task list.',
		emoji: '📝',
	},
];

const Onboarding = ({ onComplete }) => {
	const [currentStep, setCurrentStep] = useState(0);
	const [exiting, setExiting] = useState(false);

	const isLastStep = currentStep === steps.length - 1;
	const isFirstStep = currentStep === 0;

	const handleNext = () => {
		if (isLastStep) {
			setExiting(true);
			setTimeout(() => {
				localStorage.setItem('onboardingComplete', 'true');
				onComplete();
			}, 300);
		} else {
			setCurrentStep((prev) => prev + 1);
		}
	};

	const handleBack = () => {
		if (!isFirstStep) {
			setCurrentStep((prev) => prev - 1);
		}
	};

	const handleSkip = () => {
		setExiting(true);
		setTimeout(() => {
			localStorage.setItem('onboardingComplete', 'true');
			onComplete();
		}, 300);
	};

	const step = steps[currentStep];

	return (
		<div className={`onboarding-overlay ${exiting ? 'onboarding-exit' : ''}`}>
			<div className='onboarding-modal'>
				<button className='onboarding-skip' onClick={handleSkip}>
					Skip
				</button>

				<div className='onboarding-emoji'>{step.emoji}</div>
				<h2 className='onboarding-title'>{step.title}</h2>
				<p className='onboarding-description'>{step.description}</p>

				<div className='onboarding-dots'>
					{steps.map((_, index) => (
						<span
							key={index}
							className={`onboarding-dot ${index === currentStep ? 'active' : ''}`}
						/>
					))}
				</div>

				<div className='onboarding-actions'>
					{!isFirstStep && (
						<button className='onboarding-btn onboarding-btn-back' onClick={handleBack}>
							Back
						</button>
					)}
					<button className='onboarding-btn onboarding-btn-next' onClick={handleNext}>
						{isLastStep ? 'Get Started' : 'Next'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Onboarding;
