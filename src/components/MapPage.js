import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix default marker icon issue with webpack/CRA
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
	iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
	shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const filmingLocations = [
	{
		position: [-41.2865, 174.7762],
		title: 'The Lord of the Rings',
		year: '2001–2003',
		location: 'Wellington, New Zealand',
	},
	{
		position: [40.7128, -74.006],
		title: 'The Avengers',
		year: '2012',
		location: 'New York City, USA',
	},
	{
		position: [34.0522, -118.2437],
		title: 'La La Land',
		year: '2016',
		location: 'Los Angeles, USA',
	},
	{
		position: [51.5074, -0.1278],
		title: 'Harry Potter',
		year: '2001–2011',
		location: 'London, United Kingdom',
	},
	{
		position: [48.8566, 2.3522],
		title: 'Inception',
		year: '2010',
		location: 'Paris, France',
	},
	{
		position: [35.6762, 139.6503],
		title: 'Lost in Translation',
		year: '2003',
		location: 'Tokyo, Japan',
	},
	{
		position: [28.6139, 77.209],
		title: 'Slumdog Millionaire',
		year: '2008',
		location: 'Mumbai / Delhi, India',
	},
	{
		position: [41.9028, 12.4964],
		title: 'The Italian Job',
		year: '2003',
		location: 'Rome, Italy',
	},
	{
		position: [55.7558, 37.6173],
		title: 'Mission: Impossible – Ghost Protocol',
		year: '2011',
		location: 'Moscow, Russia',
	},
	{
		position: [-33.8688, 151.2093],
		title: 'The Matrix',
		year: '1999',
		location: 'Sydney, Australia',
	},
];

const MapPage = () => {
	return (
		<div className='map-page'>
			<div className='map-header'>
				<h2>Filming Locations Around the World</h2>
				<p>Explore famous movie filming locations on the map</p>
			</div>
			<div className='map-wrapper'>
				<MapContainer
					center={[20, 0]}
					zoom={2}
					scrollWheelZoom={true}
					style={{ height: '100%', width: '100%' }}
				>
					<TileLayer
						attribution='&copy; <a href="https://carto.com/">CARTO</a>'
						url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
					/>
					{filmingLocations.map((loc, index) => (
						<Marker key={index} position={loc.position}>
							<Popup>
								<div style={{ color: '#141414', minWidth: '160px' }}>
									<strong style={{ fontSize: '14px' }}>{loc.title}</strong>
									<br />
									<span style={{ fontSize: '12px', color: '#555' }}>
										{loc.year}
									</span>
									<br />
									<span style={{ fontSize: '12px' }}>{loc.location}</span>
								</div>
							</Popup>
						</Marker>
					))}
				</MapContainer>
			</div>
		</div>
	);
};

export default MapPage;
