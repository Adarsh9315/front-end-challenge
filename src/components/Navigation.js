import React from 'react';

const Navigation = ({ activeTab, setActiveTab }) => {
	return (
		<div className='navigation-tabs'>
			<button
				className={`nav-tab ${activeTab === 'movies' ? 'active' : ''}`}
				onClick={() => setActiveTab('movies')}
			>
				Movies
			</button>
			<button
				className={`nav-tab ${activeTab === 'notes' ? 'active' : ''}`}
				onClick={() => setActiveTab('notes')}
			>
				Notes
			</button>
		</div>
	);
};

export default Navigation;
