import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import SnackbarProvider from 'react-simple-snackbar';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<SnackbarProvider>
			<App />
		</SnackbarProvider>
	</React.StrictMode>
);
