import React, { useState } from 'react';

const steps = [
	{
		title: 'Welcome to Movie Nominations',
		description:
			'Discover movies, build your top 5 nominations list, and manage your personal todos — all in one place.',
		visual: '🎬',
	},
	{
		title: 'Search for Movies',
		description:
			'Use the search bar to find movies by title. Results are fetched in real-time from a massive movie database so you can explore thousands of titles.',
		visual: '🔍',
	},
	{
		title: 'Nominate Your Favorites',
		description:
			'Found a movie you love? Click the "Nominate" button to add it to your nominations list. You can nominate up to 5 movies — choose wisely!',
		visual: '⭐',
	},
	{
		title: 'Manage Your Todos',
		description:
			'Switch to the Todos tab to keep track of movies to watch, tasks to complete, or anything else on your mind. Mark them done as you go.',
		visual: '✅',
	},
	{
		title: "You're All Set!",
		description:
			"That's everything you need to know. Start searching for movies and build your nominations list. Enjoy the app!",
		visual: '🚀',
	},
];

const Onboarding = ({ onComplete }) => {
	const [currentStep, setCurrentStep] = useState(0);
	const [direction, setDirection] = useState('next');

	const isLastStep = currentStep === steps.length - 1;
	const isFirstStep = currentStep === 0;

	const goNext = () => {
		if (isLastStep) {
			onComplete();
			return;
		}
		setDirection('next');
		setCurrentStep((prev) => prev + 1);
	};

	const goBack = () => {
		if (isFirstStep) return;
		setDirection('back');
		setCurrentStep((prev) => prev - 1);
	};

	const skip = () => {
		onComplete();
	};

	const step = steps[currentStep];

	return (
		<div className='onboarding-overlay'>
			<div className='onboarding-card' key={currentStep}>
				<button className='onboarding-skip' onClick={skip}>
					Skip
				</button>

				<div className='onboarding-visual'>{step.visual}</div>

				<h2 className='onboarding-title'>{step.title}</h2>

				<p className='onboarding-description'>{step.description}</p>

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

				<div className='onboarding-actions'>
					{!isFirstStep && (
						<button className='onboarding-btn onboarding-btn-back' onClick={goBack}>
							Back
						</button>
					)}
					<button className='onboarding-btn onboarding-btn-next' onClick={goNext}>
						{isLastStep ? 'Get Started' : 'Next'}
					</button>
				</div>

				<div className='onboarding-step-count'>
					{currentStep + 1} of {steps.length}
				</div>
			</div>
		</div>
	);
};

export default Onboarding;
