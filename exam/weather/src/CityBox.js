import React, {useState} from 'react';

export default function MessageBox(props) {
	const {city} = props;
	const [cities, setCities] = useState([]);

	function fetching() {
		fetch(`http://api.openweathermap.org/data/2.5/weather?id=${city.id}&APPID=b41984b8b5135f1695c5faac30990138`, {
		})
			.then((resp) => resp.json())
			.then((data) => {
				console.log(data.name);
			})
	}

	return (
		<div  className="divbox">
			{city["id"]}
			{fetching()}
		</div>
	);
}
