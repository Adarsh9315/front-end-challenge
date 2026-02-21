import React, { useState, useEffect } from 'react';

const Onboarding = ({ onComplete }) => {
	const [currentStep, setCurrentStep] = useState(0);

	const steps = [
		{
			title: 'Welcome to Movie & Todo App!',
			description: 'This quick tour will show you around. Let\'s get started!',
			target: null,
			position: 'center'
		},
		{
			title: 'Navigation',
			description: 'Switch between Movies and Todos pages using these navigation buttons.',
			target: '.navigation-bar',
			position: 'bottom'
		},
		{
			title: 'Search Movies',
			description: 'Use the search box to find movies from the OMDB database.',
			target: '.search-box-container',
			position: 'bottom',
			page: 'movies'
		},
		{
			title: 'Nominate Movies',
			description: 'Click the + button on any movie to add it to your nominations (max 5).',
			target: '.movie-container',
			position: 'top',
			page: 'movies'
		},
		{
			title: 'Manage Todos',
			description: 'Switch to the Todos page to create and manage your task list.',
			target: '.nav-btn',
			position: 'bottom',
			page: 'todos'
		}
	];

	const currentStepData = steps[currentStep];

	useEffect(() => {
		if (currentStepData.target) {
			const element = document.querySelector(currentStepData.target);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth', block: 'center' });
			}
		}
	}, [currentStep, currentStepData.target]);

	const handleNext = () => {
		if (currentStep < steps.length - 1) {
			setCurrentStep(currentStep + 1);
		} else {
			handleComplete();
		}
	};

	const handlePrev = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleSkip = () => {
		handleComplete();
	};

	const handleComplete = () => {
		localStorage.setItem('onboardingCompleted', 'true');
		onComplete();
	};

	const getTooltipPosition = () => {
		if (!currentStepData.target || currentStepData.position === 'center') {
			return {
				position: 'fixed',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				zIndex: 10002
			};
		}

		const element = document.querySelector(currentStepData.target);
		if (!element) {
			return {
				position: 'fixed',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				zIndex: 10002
			};
		}

		const rect = element.getBoundingClientRect();
		let style = {
			position: 'fixed',
			zIndex: 10002
		};

		if (currentStepData.position === 'bottom') {
			style.top = rect.bottom + 20 + 'px';
			style.left = rect.left + rect.width / 2 + 'px';
			style.transform = 'translateX(-50%)';
		} else if (currentStepData.position === 'top') {
			style.bottom = window.innerHeight - rect.top + 20 + 'px';
			style.left = rect.left + rect.width / 2 + 'px';
			style.transform = 'translateX(-50%)';
		}

		return style;
	};

	const getHighlightStyle = () => {
		if (!currentStepData.target) return null;

		const element = document.querySelector(currentStepData.target);
		if (!element) return null;

		const rect = element.getBoundingClientRect();
		return {
			position: 'fixed',
			top: rect.top - 5 + 'px',
			left: rect.left - 5 + 'px',
			width: rect.width + 10 + 'px',
			height: rect.height + 10 + 'px',
			border: '3px solid #007bff',
			borderRadius: '8px',
			pointerEvents: 'none',
			zIndex: 10001,
			boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.7)'
		};
	};

	return (
		<div>
			<div className="onboarding-overlay" onClick={handleSkip} />

			{currentStepData.target && (
				<div className="onboarding-highlight" style={getHighlightStyle()} />
			)}

			<div className="onboarding-tooltip" style={getTooltipPosition()}>
				<div className="onboarding-header">
					<h3>{currentStepData.title}</h3>
					<button className="onboarding-close" onClick={handleSkip}>×</button>
				</div>
				<p>{currentStepData.description}</p>
				<div className="onboarding-progress">
					{steps.map((_, index) => (
						<div
							key={index}
							className={`progress-dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
						/>
					))}
				</div>
				<div className="onboarding-actions">
					{currentStep > 0 && (
						<button className="onboarding-btn onboarding-btn-secondary" onClick={handlePrev}>
							Previous
						</button>
					)}
					<button className="onboarding-btn onboarding-btn-primary" onClick={handleNext}>
						{currentStep < steps.length - 1 ? 'Next' : 'Get Started'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Onboarding;
