/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */

import React from 'react';
import ChatBox from './ChatBox';
import '../styles/ChatList.css';

export default function ChatList(props) {
	const { state, switcher } = props;
	const { chats } = state;

	function createChat() {
		const newTopic = prompt('Введите название нового чата', 'новый чат');
		if (newTopic !== null) {
			if (newTopic.trim().length === 0) {
				alert('Введите нормальное название диалога');
			} else {
				let firstMessage = prompt('Введите первое сообщение', 'Привет');
				if (firstMessage.trim().length === 0) {
					firstMessage = 'Начните диалог';
				}
				const currentDate = new Date();

				chats.push([chats.length + 1, newTopic, firstMessage, currentDate]);
				localStorage.setItem('chatInfo', JSON.stringify(chats));
				localStorage.setItem(
					chats.length,
					JSON.stringify([[firstMessage, currentDate]]),
				);
				switcher(false, chats, newTopic, chats.length);
			}
		}
	}

	function compareDates(a, b) {
		if (a[3] < b[3]) return 1;
		if (a[3] > b[3]) return -1;
		return 0;
	}

	return (
		<div>
			<div className="divChat">
				{chats
					.slice()
					.sort(compareDates)
					.map((item) => (
						<ChatBox
							key={item[0]}
							state={state}
							switcher={switcher}
							chat={item}
						/>
					))}
			</div>
			<img
				className="newChat"
				alt="кнопка нового чата"
				src="https://icon-library.net/images/plus-button-icon/plus-button-icon-27.jpg"
				onClick={createChat}
			/>
		</div>
	);
}
