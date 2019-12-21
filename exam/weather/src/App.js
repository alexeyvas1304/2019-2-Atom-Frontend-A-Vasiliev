import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
// 18514e29c1fd6d28343916892ace92a2
import CityList from './CityList';
import CityPage from './CityPage';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cities: JSON.parse(localStorage.getItem('cities')) || [
				707860,
				519188,
				1283378,
				529334,
			],
			currentCity: 'Manage cities',
		};
		this.switcher = this.switcher.bind(this);
	}

	switcher(newCities, newCurrentCity) {
		this.setState({
			cities: newCities,
			currentCity: newCurrentCity,
		});
	}

	render() {
		return (
			<Router>
				<Switch>
					<Route path={`/location/${this.state.currentCity}`}>
						{/*<CityList cities={this.state.cities} currentCity={this.state.currentCity} switcher={this.switcher} />*/}
						<CityPage
							cities={this.state.cities}
							currentCity={this.state.currentCity}
							switcher={this.switcher}
						/>
					</Route>
					<Route path="/">
						<CityList
							cities={this.state.cities}
							currentCity={this.state.currentCity}
							switcher={this.switcher}
						/>
					</Route>
				</Switch>
			</Router>
		);
	}
}

export default App;
