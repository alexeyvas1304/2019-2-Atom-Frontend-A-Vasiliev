/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import '../styles/FormInput.css';

export default function FormInput(props) {
	const { state, switcher } = props;
	const { chats, currentTitle, currentId } = state;

	const [value, setValue] = useState('');

	const addMessage = (event) => {
		if (event.key === 'Enter' && event.target.value.trim() !== '') {
			setValue('');
			const date = new Date();
			const messages = JSON.parse(localStorage.getItem(currentId));
			messages.push([event.target.value, date]);
			event.target.value = '';
			localStorage.setItem(currentId, JSON.stringify(messages));
			chats[currentId - 1][2] = value;
			chats[currentId - 1][3] = date;
			switcher(false, chats, currentTitle, currentId);
			localStorage.setItem('chatInfo', JSON.stringify(chats));
		}
	};
	return (
		<input
			type="text"
			placeholder="Введите сообщение"
			onChange={(event) => setValue(event.target.value)}
			onKeyPress={addMessage}
		/>
	);
}
