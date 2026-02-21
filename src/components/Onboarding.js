import React, { useState } from 'react';

const steps = [
	{
		title: 'Welcome to Movie Nominations',
		description:
			'Discover great films, build your nomination list, and keep track of what to watch. Let us show you around!',
		emoji: '🎬',
	},
	{
		title: 'Search for Movies',
		description:
			'Use the search bar to find movies from a massive database. Just start typing a title and results will appear instantly.',
		emoji: '🔍',
	},
	{
		title: 'Nominate Your Favorites',
		description:
			'Found a movie you love? Click "Add Nomination" to add it to your list. You can nominate up to 5 movies — choose wisely!',
		emoji: '⭐',
	},
	{
		title: 'Track Your Todos',
		description:
			'Switch to the Todos tab to manage your personal watchlist and tasks. Add items, mark them complete, and stay organized.',
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
					className='onboarding-skip-btn'
					onClick={handleSkip}
					title='Skip onboarding'
				>
					Skip
				</button>

				<div
					className={`onboarding-step-content ${
						animating
							? direction === 'next'
								? 'onboarding-fade-out-left'
								: 'onboarding-fade-out-right'
							: 'onboarding-fade-in'
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
							} ${index < currentStep ? 'onboarding-dot-completed' : ''}`}
						/>
					))}
				</div>

				<div className='onboarding-actions'>
					{!isFirstStep && (
						<button className='onboarding-back-btn' onClick={handleBack}>
							Back
						</button>
					)}
					<button className='onboarding-next-btn' onClick={handleNext}>
						{isLastStep ? 'Get Started' : 'Next'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Onboarding;
