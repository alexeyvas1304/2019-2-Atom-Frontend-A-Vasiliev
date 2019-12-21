import React, { useEffect } from 'react';
import CityBox from './CityBox';
import './CityList.css';

export default function CityList(props) {
	const { cities, currentCity, switcher } = props;

	useEffect(() => {
		let options = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0,
		};

		function success(pos) {
			let crd = pos.coords;
			fetch(
				`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=b41984b8b5135f1695c5faac30990138`,
			)
				.then((res) => res.json())
				.then((data) => {
					const myCityId = data.id;
					if (data.id !== cities[0]) {
						cities.unshift(myCityId);
					}
					switcher(cities, currentCity);
				});
		}

		function error(err) {
			console.warn(`ERROR(${err.code}): ${err.message}`);
		}

		navigator.geolocation.getCurrentPosition(success, error, options);
	}, [cities, switcher, currentCity]);

	function createBox() {
		const newCity = prompt('Введите название города', '');
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=b41984b8b5135f1695c5faac30990138`,
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.cod !== 200) {
					alert('Города с таким названием не существует');
				} else if (cities.includes(data.id)) {
					alert('Город уже в списке');
				} else {
					cities.push(data.id);
					// cities.shift();
					console.log('ll', cities);
					localStorage.setItem('cities', JSON.stringify(cities.slice(1)));
					switcher(cities, currentCity);
				}
			});
	}

	const leftButton = (
		<img
			className="burgerButton"
			alt="left"
			src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png"
		/>
	);

	const rightButton = (
		<img
			className="threePointsButton"
			alt="right"
			src="https://image.flaticon.com/icons/png/512/64/64576.png"
		/>
	);

	return (
		<div>
			<div className="firstHeader">
				{leftButton}
				<div className="title">{currentCity}</div>
				{rightButton}
			</div>
			<div>
				{cities.map((item) => (
					<CityBox
						key={item}
						switcher={switcher}
						cities={cities}
						boxId={item}
					/>
				))}
			</div>
			<img
				className="newButton"
				alt="кнопка нового города"
				src="https://icon-library.net/images/plus-button-icon/plus-button-icon-27.jpg"
				onClick={createBox}
			/>
		</div>
	);
}
