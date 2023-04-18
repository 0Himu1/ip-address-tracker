import { useEffect, useState } from 'react';
import Map from './Map';

const apiKey: string = import.meta.env.VITE_API_KEY;

export default function App() {
	const [data, setData] = useState<{ name: string; value: string }[]>([]);
	const [mapData, setMapData] = useState<[number, number] | null>(null);
	const [userIpAddress, setUserIpAddress] = useState('');
	const [ipAddress, setIpAddress] = useState('');

	const fetchIpAddress = async () => {
		const res = await fetch('https://api.ipify.org?format=json');
		const json = await res.json();
		setUserIpAddress(json.ip);
	};

	console.log(import.meta.env.VITE_API_KEY);
	const fetchData = async () => {
		const res = await fetch(
			`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${apiKey}&ipAddress=${userIpAddress}`
		);
		const json = await res.json();
		setData([
			{ name: 'Ip Address', value: json.ip },
			{
				name: 'Location',
				value: `${json.location.city}, ${json.location.region}`,
			},
			{ name: 'Time Zone', value: `UTC  ${json.location.timezone}` },
			{ name: 'ISP', value: json.isp },
		]);
		setMapData([json.location.lat, json.location.lng]);
	};

	useEffect(() => {
		if (ipAddress) {
			setMapData(null);
			fetchData();
		} else {
			setMapData(null);
			fetchIpAddress();
			fetchData();
		}
	}, [userIpAddress]);

	const isValidIpAddress = (inputValue: string) => {
		// Regular expression pattern to check IP address format
		const ipAddressPattern =
			/^([01]?\d?\d|2[0-4]\d|25[0-5])(\.([01]?\d?\d|2[0-4]\d|25[0-5])){3}$/;
		return ipAddressPattern.test(inputValue);
	};

	return (
		<main className="flex flex-col h-screen w-screen overflow-hidden">
			<div className="top-part p-8 pb-24 md:pb-12 bg-image text-white relative">
				<h1 className="font-bold text-3xl text-center mb-5">
					IP Address Tracker
				</h1>
				<div className="flex justify-center items-center w-full mb-5">
					<input
						type="text"
						className="bg-white p-3 rounded-l-md outline-none w-full text-gray-900"
						value={ipAddress}
						onChange={e => {
							setIpAddress(e.target.value);
						}}
					/>
					<button
						className="p-3 bg-black font-bold rounded-r-md"
						onClick={() => {
							if (isValidIpAddress(ipAddress)) {
								setUserIpAddress(ipAddress);
							}
						}}
					>
						GO
					</button>
				</div>

				<div className="md:flex justify-around items-center p-5 bg-white rounded-lg text-black text-center absolute left-8 right-8 z-10 ">
					{data.map((data, i) => (
						<div className="mb-5 md:text-left" key={i + 1}>
							<p className="text-xs uppercase font-bold text-gray-500 mb-2">
								{data.name}
							</p>
							<h2 className="text-xl font-bold text-[hsl(0, 0%, 17%)] ">
								{data.value}
							</h2>
						</div>
					))}
				</div>
			</div>
			<Map mapData={mapData} className="flex-1 w-full h-full z-0" />
		</main>
	);
}
