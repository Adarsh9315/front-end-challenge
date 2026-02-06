import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SnackbarProvider from 'react-simple-snackbar'

import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<SnackbarProvider>
				<App />
			</SnackbarProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
