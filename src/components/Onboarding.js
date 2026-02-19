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
			'Switch between the Movies and Todos pages using the navigation bar. The Todos page lets you create, complete, and delete personal tasks. All your data is saved automatically.',
		emoji: '📝',
	},
];

const Onboarding = ({ onComplete }) => {
	const [currentStep, setCurrentStep] = useState(0);
	const [animating, setAnimating] = useState(false);
	const [direction, setDirection] = useState('next');

	const isLastStep = currentStep === steps.length - 1;
	const isFirstStep = currentStep === 0;

	const animateTransition = (newStep, dir) => {
		setDirection(dir);
		setAnimating(true);
		setTimeout(() => {
			setCurrentStep(newStep);
			setAnimating(false);
		}, 250);
	};

	const handleNext = () => {
		if (isLastStep) {
			onComplete();
		} else {
			animateTransition(currentStep + 1, 'next');
		}
	};

	const handleBack = () => {
		if (!isFirstStep) {
			animateTransition(currentStep - 1, 'back');
		}
	};

	const handleSkip = () => {
		onComplete();
	};

	const step = steps[currentStep];

	return (
		<div className='onboarding-overlay'>
			<div className='onboarding-card'>
				<button
					className='onboarding-skip'
					onClick={handleSkip}
					title='Skip onboarding'
				>
					Skip
				</button>

				<div
					className={`onboarding-step-content ${
						animating
							? direction === 'next'
								? 'onboarding-slide-out-left'
								: 'onboarding-slide-out-right'
							: 'onboarding-slide-in'
					}`}
				>
					<div className='onboarding-emoji'>{step.emoji}</div>
					<h2 className='onboarding-title'>{step.title}</h2>
					<p className='onboarding-description'>{step.description}</p>
				</div>

				<div className='onboarding-progress'>
					{steps.map((_, index) => (
						<span
							key={index}
							className={`onboarding-dot ${
								index === currentStep ? 'onboarding-dot-active' : ''
							}`}
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
