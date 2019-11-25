/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
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
			const hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
			date.setHours(hoursDiff);
			const messages = JSON.parse(localStorage.getItem(currentId));
			messages.push([[event.target.value, 'text'], date]);
			event.target.value = '';
			localStorage.setItem(currentId, JSON.stringify(messages));
			chats[currentId - 1][2] = [value, 'text'];
			chats[currentId - 1][3] = date;
			switcher('chat', chats, currentTitle, currentId);
			localStorage.setItem('chatInfo', JSON.stringify(chats));
		}
	};

	const getCoord = (event) => {
		const options = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0,
		};

		function success(pos) {
			const crd = pos.coords;

			// console.log('Ваше текущее метоположение:');
			// console.log(`Широта: ${crd.latitude}`);
			// console.log(`Долгота: ${crd.longitude}`);
			// console.log(`Плюс-минус ${crd.accuracy} метров.`);
			const res = `https://www.openstreetmap.org/#map=18/${crd.latitude}/${crd.longitude}`;
			const date = new Date();
			const hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
			date.setHours(hoursDiff);
			const messages = JSON.parse(localStorage.getItem(currentId));
			messages.push([[res, 'href'], date]);
			localStorage.setItem(currentId, JSON.stringify(messages));
			chats[currentId - 1][2] = [res, 'href'];
			chats[currentId - 1][3] = date;
			switcher('chat', chats, currentTitle, currentId);
			localStorage.setItem('chatInfo', JSON.stringify(chats));
		}

		function error(err) {
			console.warn(`ERROR(${err.code}): ${err.message}`);
		}
		console.log(
			navigator.geolocation.getCurrentPosition(success, error, options),
		);
	};

	const attachPhoto = (event) => {
		for (let i = 0; i < event.target.files.length; i += 1) {
			const res = window.URL.createObjectURL(event.target.files[i]);
			const date = new Date();
			const hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
			date.setHours(hoursDiff);
			const messages = JSON.parse(localStorage.getItem(currentId));
			messages.push([[res, 'img'], date]);
			localStorage.setItem(currentId, JSON.stringify(messages));
			chats[currentId - 1][2] = [res, 'img'];
			chats[currentId - 1][3] = date;
			switcher('chat', chats, currentTitle, currentId);
			localStorage.setItem('chatInfo', JSON.stringify(chats));
		}
	};

	const attachPhotoDrop = (event) => {
		event.preventDefault();
		event.stopPropagation();
		for (let i = 0; i < event.dataTransfer.files.length; i += 1) {
			const res = window.URL.createObjectURL(event.dataTransfer.files[i]);
			const date = new Date();
			const hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
			date.setHours(hoursDiff);
			const messages = JSON.parse(localStorage.getItem(currentId));
			messages.push([[res, 'img'], date]);
			localStorage.setItem(currentId, JSON.stringify(messages));
			chats[currentId - 1][2] = [res, 'img'];
			chats[currentId - 1][3] = date;
			switcher('chat', chats, currentTitle, currentId);
			localStorage.setItem('chatInfo', JSON.stringify(chats));
		}
	};

	const preventAndStop = (event) => {
		event.stopPropagation();
		event.preventDefault();
	};

	return (
		<div
			className="inputWrapper"
			onDrop={attachPhotoDrop}
			onDragEnter={preventAndStop}
			onDragOver={preventAndStop}
		>
			<input
				type="text"
				placeholder="Введите сообщение"
				onChange={(event) => setValue(event.target.value)}
				onKeyPress={addMessage}
			/>
			<img
				className="placeButton"
				alt="местоположение"
				src="https://image.flaticon.com/icons/png/512/14/14768.png"
				onClick={getCoord}
			/>

			<label htmlFor="attach" className="attachButton">
				<img
					className="attachButton"
					alt="kkk"
					src="https://icon-icons.com/icons2/935/PNG/72/attach-interface-symbol-of-rotated-paperclip_icon-icons.com_73316.png"
				/>
			</label>
			<input
				type="file"
				style={{ display: 'none' }}
				onChange={attachPhoto}
				multiple
				id="attach"
			/>
		</div>
	);
}
