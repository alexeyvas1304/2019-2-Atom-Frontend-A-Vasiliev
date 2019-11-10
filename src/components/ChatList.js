/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */

import React from 'react';
import ChatBox from './ChatBox';
import './ChatList.css';

export default function ChatList(props) {
	const state = props.state.onChatList;
	const currentTitle = props.state.currentTitle;
	const chats = props.state.chats;
	const currentId = props.state.currentId;
	const switcher = props.switcher;

	function getDate() {
		const nowDate = new Date();
		let Hour = nowDate.getHours();
		if (String(Hour).length === 1) {
			Hour = `0${Hour}`;
		}
		let Minutes = nowDate.getMinutes();
		if (String(Minutes).length === 1) {
			Minutes = `0${Minutes}`;
		}
		let Seconds = nowDate.getSeconds();
		if (String(Seconds).length === 1) {
			Seconds = `0${Seconds}`;
		}
		const time = `${Hour}:${Minutes}:${Seconds}`;
		return time;
	}

	function createChat() {
		const newTopic = prompt('Введите название нового чата', 'новый чат');
		if (newTopic !== null) {
			if (newTopic.length === 0) {
				alert('Введите нормальное название диалога');
			} else {
				const firstMessage = prompt('Введите первое сообщение', 'Привет');
				const currentDate = getDate();

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
	return (
		<div>
			<ul className="ulChat">
				{chats.map((item) => (
					<ChatBox
						key={item[0]}
						state={state}
						currentTitle={currentTitle}
						chats={chats}
						currentId={currentId}
						switcher={switcher}
						chat={item}
					/>
				))}
			</ul>
			<img
				className="newChat"
				alt="кнопка нового чата"
				src="https://icon-library.net/images/plus-button-icon/plus-button-icon-27.jpg"
				onClick={createChat}
			/>
		</div>
	);
}
