/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */

import React, { Component } from 'react';
import '../styles/App.css';
import Header from './Header';
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
				<Header state={this.state} switcher={this.switcher} />

				{this.state.onChatList && (
					<ChatList state={this.state} switcher={this.switcher} />
				)}
				{!this.state.onChatList && (
					<div className="messageListWrapper">
						<MessageList state={this.state} switcher={this.switcher} />
					</div>
				)}

				{!this.state.onChatList && (
					<div className="footer">
						<FormInput state={this.state} switcher={this.switcher} />
					</div>
				)}
			</div>
		);
	}
}

export default App;
