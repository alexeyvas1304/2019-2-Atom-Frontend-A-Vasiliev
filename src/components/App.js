/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */

import React, { Component } from 'react';
import './App.css';
import Header from './Head';
import ChatList from './ChatList';
import MessageList from './MessageList';
import FormInput from './FormInput';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			onChatList: true,
			chats: JSON.parse(localStorage.getItem('chatInfo')) || [],
			currentTitle: 'Список чатов',
			currentId: null,
		};
		this.switcher = this.switcher.bind(this);
	}

	switcher(newPlace, newChats, newCurrentTitle, newCurrentId) {
		this.setState({
			onChatList: newPlace,
			chats: newChats,
			currentTitle: newCurrentTitle,
			currentId: newCurrentId,
		});
	}

	render() {
		return (
			<div className="allWindow">
				<div className="header">
					<Header state={this.state} switcher={this.switcher} />
				</div>
				<div className="mainPart">
					{this.state.onChatList && (
						<ChatList state={this.state} switcher={this.switcher} />
					)}
					{!this.state.onChatList && (
						<div className="innerWrapper">
							<MessageList state={this.state} switcher={this.switcher} />
						</div>
					)}
				</div>
				<div className="footer">
					{!this.state.onChatList && (
						<FormInput state={this.state} switcher={this.switcher} />
					)}
				</div>
			</div>
		);
	}
}

export default App;
