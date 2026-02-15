import React from 'react';

const Map = () => {
	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<div className='col'>
					<h1>Map Page</h1>
				</div>
			</div>
			<div className='row'>
				<div className='col'>
					<div style={{ 
						width: '100%', 
						height: '600px', 
						backgroundColor: '#f0f0f0',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						border: '2px solid #ddd',
						borderRadius: '8px'
					}}>
						<div style={{ textAlign: 'center' }}>
							<h2>Interactive Map</h2>
							<p>Map content will be displayed here</p>
							<p style={{ color: '#666', fontSize: '14px' }}>
								You can integrate Google Maps, Leaflet, or any other mapping library
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Map;
