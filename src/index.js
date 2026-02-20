import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SnackbarProvider from 'react-simple-snackbar'
import { ThemeProvider } from './ThemeContext';

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider>
			<SnackbarProvider>
				<App />
			</SnackbarProvider>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
