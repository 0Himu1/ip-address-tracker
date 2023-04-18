import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

type mapProps = {
	className: string;
	mapData: [number, number] | null;
};

export default function Map({ className, mapData }: mapProps) {


	return (
		<div className={`map z-0 ${className}`}>
			{mapData && (
				<MapContainer center={mapData} zoom={13} scrollWheelZoom={true}>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<Marker position={mapData}>
						<Popup>Got You!!</Popup>
					</Marker>
				</MapContainer>
			)}
		</div>
	);
}
