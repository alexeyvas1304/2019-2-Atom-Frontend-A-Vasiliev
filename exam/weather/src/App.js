import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Header from "./Header";
import MyCityBox from "./MyCityBox";
import CityList from "./CityList";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}





		render() {
			return (
				<div className="allWindow">
						<Header state={this.state} />
						<MyCityBox state={this.state}/>
						{/*<CityList state={this.state}/>*/}
				</div>
			);
		}
	}

	export default App;

