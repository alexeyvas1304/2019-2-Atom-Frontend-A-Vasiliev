/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */

import React from 'react';
import MessageBox from './MessageBox';
import './MessageList.css';

export default function MessageList(props) {
	const state = props.state.onChatList;
	const currentTitle = props.state.currentTitle;
	const chats = props.state.chats;
	const currentId = props.state.currentId;
	const switcher = props.switcher;

	const messages = JSON.parse(localStorage.getItem(currentId));

	return (
		<ul className="ulMessage">
			{messages.map((item) => (
				<MessageBox
					{...item}
					key={item[0] + item[1]}
					state={state}
					currentTitle={currentTitle}
					chats={chats}
					currentId={currentId}
					switcher={switcher}
					message={item}
				/>
			))}
		</ul>
	);
}
