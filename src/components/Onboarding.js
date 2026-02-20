import React, { useState } from 'react';

const steps = [
	{
		title: 'Welcome to Movie Nominations!',
		description:
			'Discover and nominate your favorite movies. This app lets you search through thousands of movies and build your personal nomination list.',
		emoji: '🎬',
		bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
	},
	{
		title: 'Search for Movies',
		description:
			'Use the search bar to find movies by title. Results appear instantly as you type — powered by the OMDB database.',
		emoji: '🔍',
		bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
	},
	{
		title: 'Nominate Your Favorites',
		description:
			'Found a movie you love? Click the "Nominate" button to add it to your nominations list. You can nominate up to 5 movies.',
		emoji: '⭐',
		bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
	},
	{
		title: 'Manage Your Todos',
		description:
			'Switch to the Todos tab to keep track of movies you want to watch or tasks you need to complete. Stay organized!',
		emoji: '📝',
		bg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
	},
	{
		title: "You're All Set!",
		description:
			"That's everything you need to know. Start exploring movies and building your nomination list. Enjoy!",
		emoji: '🚀',
		bg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
	},
];

const Onboarding = ({ onComplete }) => {
	const [currentStep, setCurrentStep] = useState(0);
	const [animating, setAnimating] = useState(false);
	const [direction, setDirection] = useState('next');

	const step = steps[currentStep];
	const isLast = currentStep === steps.length - 1;
	const isFirst = currentStep === 0;

	const animateTransition = (newStep, dir) => {
		setDirection(dir);
		setAnimating(true);
		setTimeout(() => {
			setCurrentStep(newStep);
			setAnimating(false);
		}, 300);
	};

	const handleNext = () => {
		if (isLast) {
			onComplete();
		} else {
			animateTransition(currentStep + 1, 'next');
		}
	};

	const handleBack = () => {
		if (!isFirst) {
			animateTransition(currentStep - 1, 'back');
		}
	};

	const handleSkip = () => {
		onComplete();
	};

	return (
		<div className='onboarding-overlay'>
			<div className='onboarding-modal'>
				{/* Skip button */}
				{!isLast && (
					<button className='onboarding-skip' onClick={handleSkip}>
						Skip
					</button>
				)}

				{/* Step content */}
				<div
					className={`onboarding-content ${
						animating
							? direction === 'next'
								? 'slide-out-left'
								: 'slide-out-right'
							: 'slide-in'
					}`}
				>
					<div className='onboarding-icon-wrapper' style={{ background: step.bg }}>
						<span className='onboarding-emoji'>{step.emoji}</span>
					</div>
					<h2 className='onboarding-title'>{step.title}</h2>
					<p className='onboarding-description'>{step.description}</p>
				</div>

				{/* Progress dots */}
				<div className='onboarding-dots'>
					{steps.map((_, index) => (
						<span
							key={index}
							className={`onboarding-dot ${
								index === currentStep ? 'active' : ''
							} ${index < currentStep ? 'completed' : ''}`}
						/>
					))}
				</div>

				{/* Navigation buttons */}
				<div className='onboarding-nav'>
					{!isFirst ? (
						<button className='onboarding-btn onboarding-btn-back' onClick={handleBack}>
							Back
						</button>
					) : (
						<div />
					)}
					<button className='onboarding-btn onboarding-btn-next' onClick={handleNext}>
						{isLast ? "Get Started" : 'Next'}
					</button>
				</div>

				{/* Step counter */}
				<div className='onboarding-counter'>
					{currentStep + 1} of {steps.length}
				</div>
			</div>
		</div>
	);
};

export default Onboarding;
