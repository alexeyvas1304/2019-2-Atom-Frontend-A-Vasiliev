import React, { useEffect, useState } from 'react';
import './CityBox.css';
import { Link } from 'react-router-dom';

export default function CityBox(props, key) {
	const { boxId, cities, switcher } = props;
	const [boxes, setBoxes] = useState([]);

	const findArrow = (deg) => {
		if (deg >= 45 && deg <= 135) return 'east';
		if (deg >= 135 && deg <= 225) return 'south';
		if (deg >= 225 && deg <= 315) return 'west';
		return 'north';
	};

	useEffect(() => {
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?id=${boxId}&appid=b41984b8b5135f1695c5faac30990138`,
		)
			.then((res) => res.json())
			.then((data) => {
				// console.log(typeof data);
				const info = {
					id: data.id,
					geo: data.name + ', ' + data.sys.country,
					icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
					temperature: Math.round(data.main.temp - 273.15) + '℃',
					additionalWeather:
						'Humidity ' +
						data.main.humidity +
						'% | ' +
						findArrow(data.wind.deg) +
						' | ' +
						data.wind.speed +
						' m/s',
					tempDiapazon:
						Math.round(data.main.temp_max - 273.15) +
						'/' +
						Math.round(data.main.temp_min - 273.15) +
						'℃',
				};
				setBoxes(info);
			});
	}, [boxId]);

	const handleClick = () => {
		console.log('нажал', boxes.geo);
		switcher(cities, boxes.geo);
	};

	const wrapper = (
		<Link to={`/location/${boxes.geo}`}>
			<div className="wrapper" onClick={handleClick}>
				<div className="upper">
					<div className="geo">{boxes.geo}</div>
					<div className="commonWeather">
						<div className="imageWrapper">
							<img className="weatherIcon" alt="weathericon" src={boxes.icon} />
						</div>
						{boxes.temperature}
					</div>
				</div>
				<div className="lower">
					<div className="additionalWeather">{boxes.additionalWeather}</div>
					<div className="diapazon">{boxes.tempDiapazon}</div>
				</div>
			</div>
		</Link>
	);

	return <div>{wrapper}</div>;
}
