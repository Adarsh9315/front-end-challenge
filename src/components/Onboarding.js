import React from 'react';

const onboardingSteps = [
	{
		title: 'Search for movies',
		description: 'Use the search bar to explore titles from the OMDB catalogue.'
	},
	{
		title: 'Nominate favorites',
		description: 'Save up to five nominations so you can track your picks.'
	},
	{
		title: 'Plan with todos',
		description: 'Switch to the Todos tab to jot down tasks while you browse.'
	}
];

const Onboarding = ({ onClose, onNavigate }) => {
	return (
		<div className='onboarding-overlay'>
			<div className='onboarding-card'>
				<div className='onboarding-header'>Welcome to Movie Nominations</div>
				<p className='onboarding-subtitle'>
					Here is a quick tour to help you get started.
				</p>
				<div className='onboarding-steps'>
					{onboardingSteps.map((step) => (
						<div key={step.title} className='onboarding-step'>
							<h4>{step.title}</h4>
							<p>{step.description}</p>
						</div>
					))}
				</div>
				<div className='onboarding-actions'>
					<button
						type='button'
						className='btn btn-primary'
						onClick={() => {
							onNavigate('movies');
							onClose();
						}}
					>
						Start with Movies
					</button>
					<button
						type='button'
						className='btn btn-outline-light'
						onClick={() => {
							onNavigate('todos');
							onClose();
						}}
					>
						Try Todos
					</button>
					<button
						type='button'
						className='btn btn-link onboarding-skip'
						onClick={onClose}
					>
						Skip for now
					</button>
				</div>
			</div>
		</div>
	);
};

export default Onboarding;
