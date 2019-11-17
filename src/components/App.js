/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */

import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import '../styles/App.css';
import Header from './Header';
import ChatList from './ChatList';
import MessageList from './MessageList';
import FormInput from './FormInput';
import UserProfile from './UserProfile';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			where: 'chatlist',
			chats: JSON.parse(localStorage.getItem('chatInfo')) || [],
			currentTitle: 'Список чатов',
			currentId: null,
		};
		this.switcher = this.switcher.bind(this);
	}

	switcher(newPlace, newChats, newCurrentTitle, newCurrentId) {
		this.setState({
			where: newPlace,
			chats: newChats,
			currentTitle: newCurrentTitle,
			currentId: newCurrentId,
		});
	}

	render() {
		return (
			<div className="allWindow">
				<Router>
					<Header state={this.state} switcher={this.switcher} />
					<Switch>
						<Route path="/profile">
							<UserProfile state={this.state} switcher={this.switcher} />
						</Route>
						<Route path={`/${this.state.currentId}`}>
							<div className="messageListWrapper">
								<MessageList state={this.state} switcher={this.switcher} />
							</div>
							<div className="footer">
								<FormInput state={this.state} switcher={this.switcher} />
							</div>
						</Route>
						<Route path="/">
							<ChatList state={this.state} switcher={this.switcher} />
						</Route>
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
