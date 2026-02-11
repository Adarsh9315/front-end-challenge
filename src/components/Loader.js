import React from 'react';
import './Loader.css';

const Loader = ({ message = 'Loading...' }) => {
	return (
		<div className="loader-container">
			<div className="loader-spinner">
				<div className="spinner-ring"></div>
				<div className="spinner-ring"></div>
				<div className="spinner-ring"></div>
				<div className="film-icon">🎬</div>
			</div>
			<p className="loader-message">{message}</p>
		</div>
	);
};

export default Loader;
