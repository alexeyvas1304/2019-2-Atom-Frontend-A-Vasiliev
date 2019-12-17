import React, {} from 'react';
// import './cities'
import CityBox from "./CityBox";


export default function CityList(props) {
	const {} = props;

	const  cities = [
		{
			"id": 707860,
			"name": "Hurzuf",
			"country": "UA",
			"coord": {
				"lon": 34.283333,
				"lat": 44.549999
			}
		},
		{
			"id": 519188,
			"name": "Novinki",
			"country": "RU",
			"coord": {
				"lon": 37.666668,
				"lat": 55.683334
			}
		},
		{
			"id": 1283378,
			"name": "Gorkhā",
			"country": "NP",
			"coord": {
				"lon": 84.633331,
				"lat": 28
			}
		},
		{
			"id": 1270260,
			"name": "State of Haryāna",
			"country": "IN",
			"coord": {
				"lon": 76,
				"lat": 29
			}
		},
		{
			"id": 708546,
			"name": "Holubynka",
			"country": "UA",
			"coord": {
				"lon": 33.900002,
				"lat": 44.599998
			}
		},
	];


	function createCity() {
	}







	return (
		<div>
			<div className="">
				{cities
					.map((item) => (
						< CityBox
							key={item.id}
							city={item}
						/>
					))}
			</div>
				{/*<img*/}
				{/*	className="newChat"*/}
				{/*	alt="кнопка добавления"*/}
				{/*	src="https://icon-library.net/images/plus-button-icon/plus-button-icon-27.jpg"*/}
				{/*	onClick={createChat}*/}
				{/*/>*/}
		</div>
	);
}
