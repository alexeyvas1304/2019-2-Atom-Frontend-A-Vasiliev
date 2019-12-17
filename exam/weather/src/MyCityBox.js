import React, {useEffect, useState} from 'react';

export default function MyCityBox(props, key) {
	const {} = props;
	const [coord, setCoord] = useState([]);





		function fetching() {
		fetch(`https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=b41984b8b5135f1695c5faac30990138`, {
		})
			.then((resp) => resp.json())
			.then((data) => {
				console.log('k', data.name);
				console.log(data.weather);
			})
		}



	const requesting = (event) => {
		const options = {
			enableHighAccuracy: true,
			timeout: 3000,
			maximumAge: 0,
		};

		function success(pos) {
			const crd = pos.coords;
			console.log(pos.coords);
			fetching(pos.coord[0],pos.coord[1]);
		}

		function error(err) {
			console.warn(`ERROR(${err.code}): ${err.message}`);
		}
		navigator.geolocation.getCurrentPosition(success, error, options);
	};








	return (
			<div >
				<div className="cityBox">
					{'sdfsdfsdf'}
					{fetching()}
				</div>
			</div>
	);
}
