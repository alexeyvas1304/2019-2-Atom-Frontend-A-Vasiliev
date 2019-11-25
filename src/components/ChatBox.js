/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */

import React from 'react';
import '../styles/ChatBox.css';
import { Link } from 'react-router-dom';

export default function ChatBox(props, key) {
	const { state, switcher, chat } = props;
	const { chats } = state;
	const uniqueKey = key;

	const id = chat[0];
	let title = chat[1];
	if (title.length > 30) {
		title = `${title.slice(0, 30)}...`;
	}
	let lastMessage = chat[2][0];
	if (lastMessage.startsWith('blob:http://')) {
		lastMessage = 'изображение';
	}
	if (lastMessage.length > 30) {
		lastMessage = `${lastMessage.slice(0, 30)}...`;
	}

	const time = chat[3];

	function handleClick() {
		switcher('chat', chats, title, id);
	}

	return (
		<Link to={`/${id}`}>
			<div key={uniqueKey}>
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
						<div className="time">{time.slice(11, 19)}</div>
						<img
							className="sign"
							alt="галочка"
							src="https://icon-library.net/images/green-check-mark-icon-png/green-check-mark-icon-png-20.jpg"
						/>
					</div>
				</div>
			</div>
		</Link>
	);
}
