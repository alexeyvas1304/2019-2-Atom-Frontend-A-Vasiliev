/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-destructuring */

import React from 'react';
import './ChatBox.css';

export default function ChatBox(props, key) {
	const chats = props.chats;
	const switcher = props.switcher;
	const chat = props.chat;
	const uniqueKey = key;

	const id = chat[0];
	const title = chat[1];
	let lastMessage = chat[2];
	if (lastMessage.length > 120) {
		lastMessage = `${lastMessage.slice(0, 200)}...`;
	}
	const time = chat[3];

	function handleClick() {
		switcher(false, chats, title, id);
	}

	return (
		<li key={uniqueKey}>
			<div className="chatBox" onClick={handleClick}>
				<div className="first">
					<img
						className="avatar"
						alt="аватарка"
						src="https://www.ivi.ru/titr/uploads/2016/12/13/f5fd6d0d2ba83f18fd7b104ed805f16e.jpg/1400x0"
					/>
				</div>
				<div className="second">
					<div className="chatName">{title}</div>
					<div className="content">{lastMessage}</div>
				</div>
				<div className="third">
					<div className="time">{time}</div>
					<img
						className="sign"
						alt="галочка"
						src="https://icon-library.net/images/green-check-mark-icon-png/green-check-mark-icon-png-20.jpg"
					/>
				</div>
			</div>
		</li>
	);
}
