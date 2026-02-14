import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import SnackbarProvider from 'react-simple-snackbar'

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
