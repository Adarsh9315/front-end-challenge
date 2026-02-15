import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import SnackbarProvider from 'react-simple-snackbar'

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<SnackbarProvider>
				<App />
			</SnackbarProvider>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);
