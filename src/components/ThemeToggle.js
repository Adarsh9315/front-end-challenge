import React from 'react';
import { useTheme } from '../ThemeContext';

const ThemeToggle = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			className='theme-toggle-btn'
			onClick={toggleTheme}
			aria-label='Toggle theme'
			title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
		>
			<span className='theme-toggle-icon'>
				{theme === 'dark' ? '☀️' : '🌙'}
			</span>
			<span className='theme-toggle-label'>
				{theme === 'dark' ? 'Light' : 'Dark'}
			</span>
		</button>
	);
};

export default ThemeToggle;
