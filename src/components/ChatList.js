/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import ChatBox from './ChatBox';
import '../styles/ChatList.css';

export default function ChatList(props) {
	const { state, switcher } = props;
	const { numOfChats } = state;
	const [chats, setChats] = useState([]);
	// const [numOfChat, setNumOfChat] = useState(null);

	function createChat() {
		const newTopic = prompt('Введите название нового чата', 'новый чат');
		if (newTopic !== null) {
			if (newTopic.trim().length === 0) {
				alert('Введите нормальное название диалога');
			} else {
				let firstMessage = prompt('Введите первое сообщение', 'Привет');
				if (firstMessage !== null) {
					if (firstMessage.trim().length === 0) {
						firstMessage = 'Начните диалог';
					}

					const data = new FormData();
					data.append('topic', newTopic);
					data.append('first_message', firstMessage);
					data.append('type_of_message', 'text');

					fetch('http://127.0.0.1:8000/chats/create_chat/', {
						method: 'POST',
						body: data,
						mode: 'cors',
						credentials: 'include',
					}).then(() => console.log('norm'));

					const t = +numOfChats + 1;
					localStorage.setItem('numOfChats', t);
					switcher('chat', t, newTopic, t, false);
				}
			}
		}
	}

	useEffect(() => {
		const id = setInterval(() => {
			fetch('http://127.0.0.1:8000/users/chats/', {
				method: 'GET',
				mode: 'cors',
				credentials: 'include',
			})
				.then((resp) => resp.json())
				.then((json) => {
					const tmp = json.response;
					const tmp2 = tmp.map((item) => [
						item.id,
						item.topic,
						[item.content, item.type_of_message],
						item.added_at,
					]);
					setChats(tmp2);
				});
		}, 1000);
		return () => clearInterval(id);
	}, []);

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
			<Link to={`/${chats.length + 1}`}>
				<img
					className="newChat"
					alt="кнопка нового чата"
					src="https://icon-library.net/images/plus-button-icon/plus-button-icon-27.jpg"
					onClick={createChat}
				/>
			</Link>
		</div>
	);
}
