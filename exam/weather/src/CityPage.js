import React, { useEffect, useState } from 'react';
import CityBox from './CityBox';
import './CityPage.css';
import { Link } from 'react-router-dom';

export default function CityPage(props) {
	const { cities, currentCity, switcher } = props;
	const [weatherInfo, setWeatherInfo] = useState([]);

	useEffect(() => {
		fetch(
			`https://api.openweathermap.org/data/2.5/forecast?q=${
				currentCity.split(',')[0]
			}&cnt=17&appid=b41984b8b5135f1695c5faac30990138`,
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				const info = {
					tempNow: Math.round(data.list[0].main.temp - 273.15) + '℃',
					iconNow: `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`,
					descriptionNow: data.list[0].weather[0].description,
					tempDiapazonNow:
						Math.round(data.list[0].main.temp_max - 273.15) +
						'/' +
						Math.round(data.list[0].main.temp_min - 273.15) +
						'℃',
					tempToday: Math.round(data.list[1].main.temp - 273.15) + '℃',
					iconToday: `http://openweathermap.org/img/wn/${data.list[1].weather[0].icon}@2x.png`,
					descriptionToday: data.list[1].weather[0].description,
					tempDiapazonToday:
						Math.round(data.list[1].main.temp_max - 273.15) +
						'/' +
						Math.round(data.list[1].main.temp_min - 273.15) +
						'℃',
					tempTomorrow: Math.round(data.list[8].main.temp - 273.15) + '℃',
					iconTomorrow: `http://openweathermap.org/img/wn/${data.list[8].weather[0].icon}@2x.png`,
					descriptionTomorrow: data.list[8].weather[0].description,
					tempDiapazonTomorrow:
						Math.round(data.list[8].main.temp_max - 273.15) +
						'/' +
						Math.round(data.list[8].main.temp_min - 273.15) +
						'℃',
					tempAfterTomorrow: Math.round(data.list[16].main.temp - 273.15) + '℃',
					iconAfterTomorrow: `http://openweathermap.org/img/wn/${data.list[16].weather[0].icon}@2x.png`,
					descriptionAfterTomorrow: data.list[16].weather[0].description,
					tempDiapazonAfterTomorrow:
						Math.round(data.list[16].main.temp_max - 273.15) +
						'/' +
						Math.round(data.list[16].main.temp_min - 273.15) +
						'℃',
				};
				console.log(info);
				setWeatherInfo(info);
			});
	}, [currentCity]);

	const backToList = () => {
		switcher(cities, 'Manage cities');
	};

	const leftButton = (
		<Link to="/">
			<img
				className="backButton"
				alt="button back"
				src="https://image.flaticon.com/icons/png/512/12/12104.png"
				onClick={backToList}
			/>
		</Link>
	);

	const rightButton = (
		<img
			className="threePointsButton"
			alt="three points icon"
			src="https://image.flaticon.com/icons/png/512/64/64576.png"
		/>
	);

	const weekDays = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];

	return (
		<div className="allPage">
			<div className="secondHeader">
				{leftButton}
				<div className="title">{currentCity}</div>
				{rightButton}
			</div>
			<div className="allForecast">
				<div className="mainPart">
					<div className="imageWrapper">
						<img
							className="weatherIcon"
							alt="weathericon"
							src={weatherInfo.iconNow}
						/>
					</div>
					{weatherInfo.tempNow}
				</div>
				<div className="forecastList">
					<div className="forecastToday">
						<div className="leftPart">
							<div className="imageWrapper">
								<img
									className="weatherIcon"
									alt="weathericon"
									src={weatherInfo.iconToday}
								/>
							</div>
							<div className="textWrapper">
								{'Today: ' + weatherInfo.descriptionToday}
							</div>
						</div>
						<div className="rightPart">{weatherInfo.tempDiapazonToday}</div>
					</div>
					<div className="forecastTomorrow">
						<div className="leftPart">
							<div className="imageWrapper">
								<img
									className="weatherIcon"
									alt="weathericon"
									src={weatherInfo.iconTomorrow}
								/>
							</div>
							<div className="textWrapper">
								{'Tomorrow: ' + weatherInfo.descriptionTomorrow}
							</div>
						</div>
						<div className="rightPart">{weatherInfo.tempDiapazonTomorrow}</div>
					</div>
					<div className="forecastAfterTomorrow">
						<div className="leftPart">
							<div className="imageWrapper">
								<img
									className="weatherIcon"
									alt="weathericon"
									src={weatherInfo.iconAfterTomorrow}
								/>
							</div>
							<div className="textWrapper">
								{weekDays[(new Date().getDay() + 2) % 7] +
									': ' +
									weatherInfo.descriptionAfterTomorrow}
							</div>
						</div>
						<div className="rightPart">
							{weatherInfo.tempDiapazonAfterTomorrow}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
