/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import '../styles/FormInput.css';

export default function FormInput(props) {
	const { state, switcher } = props;
	const { chats, currentTitle, currentId, isRecording } = state;

	const [value, setValue] = useState('');

	const [chunks, setChunks] = useState([]);

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
			switcher('chat', chats, currentTitle, currentId, false);
			localStorage.setItem('chatInfo', JSON.stringify(chats));
		}
	};

	const getCoord = (event) => {
		const options = {
			enableHighAccuracy: true,
			timeout: 3000,
			maximumAge: 0,
		};

		function success(pos) {
			const crd = pos.coords;

			const res = `https://www.openstreetmap.org/#map=18/${crd.latitude}/${crd.longitude}`;
			const date = new Date();
			const hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
			date.setHours(hoursDiff);
			const messages = JSON.parse(localStorage.getItem(currentId));
			messages.push([[res, 'href'], date]);
			localStorage.setItem(currentId, JSON.stringify(messages));
			chats[currentId - 1][2] = [res, 'href'];
			chats[currentId - 1][3] = date;
			switcher('chat', chats, currentTitle, currentId, false);
			localStorage.setItem('chatInfo', JSON.stringify(chats));
		}

		function error(err) {
			console.warn(`ERROR(${err.code}): ${err.message}`);
		}
		navigator.geolocation.getCurrentPosition(success, error, options);
	};

	const attachPhoto = (event) => {
		for (let i = 0; i < event.target.files.length; i += 1) {
			const data = new FormData();
			data.append('image', event.target.files[i]);
			fetch('https://tt-front.now.sh/upload', {
				method: 'POST',
				body: data,
				mode: 'no-cors',
			})
				.then(() => {
					console.log('все ок!');
				})
				.catch(console.log);

			const res = window.URL.createObjectURL(event.target.files[i]);
			const date = new Date();
			const hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
			date.setHours(hoursDiff);
			const messages = JSON.parse(localStorage.getItem(currentId));
			messages.push([[res, 'img'], date]);
			localStorage.setItem(currentId, JSON.stringify(messages));
			chats[currentId - 1][2] = [res, 'img'];
			chats[currentId - 1][3] = date;
			switcher('chat', chats, currentTitle, currentId, false);
			localStorage.setItem('chatInfo', JSON.stringify(chats));
		}
	};

	const attachPhotoDrop = (event) => {
		event.preventDefault();
		event.stopPropagation();
		for (let i = 0; i < event.dataTransfer.files.length; i += 1) {
			const data = new FormData();
			data.append('image', event.dataTransfer.files[i]);
			fetch('https://tt-front.now.sh/upload', {
				method: 'POST',
				body: data,
				mode: 'no-cors',
			})
				.then(() => {
					console.log('все ок!');
				})
				.catch(console.log);

			const res = window.URL.createObjectURL(event.dataTransfer.files[i]);
			const date = new Date();
			const hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
			date.setHours(hoursDiff);
			const messages = JSON.parse(localStorage.getItem(currentId));
			messages.push([[res, 'img'], date]);
			localStorage.setItem(currentId, JSON.stringify(messages));
			chats[currentId - 1][2] = [res, 'img'];
			chats[currentId - 1][3] = date;
			switcher('chat', chats, currentTitle, currentId, false);
			localStorage.setItem('chatInfo', JSON.stringify(chats));
		}
	};

	const preventAndStop = (event) => {
		event.stopPropagation();
		event.preventDefault();
	};

	const getRecord = (event) => {
		const constraints = { audio: true };
		navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
			if (!isRecording) {
				const mediaRecorder = new MediaRecorder(stream);
				switcher('chat', chats, currentTitle, currentId, mediaRecorder);
				mediaRecorder.start(1000);

				// eslint-disable-next-line no-shadow
				mediaRecorder.ondataavailable = (event) => {
					chunks.push(event.data);
				};
			} else {
				isRecording.stop();
				const blob = new Blob(chunks, {
					type: isRecording.mimeType,
				});

				const data = new FormData();
				data.append('audio', blob);
				fetch('https://tt-front.now.sh/upload', {
					method: 'POST',
					body: data,
					mode: 'no-cors',
				})
					.then(() => {
						console.log('все ок!');
					})
					.catch(console.log);

				const res = window.URL.createObjectURL(blob);
				const date = new Date();
				const hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
				date.setHours(hoursDiff);
				const messages = JSON.parse(localStorage.getItem(currentId));
				messages.push([[res, 'audio'], date]);
				localStorage.setItem(currentId, JSON.stringify(messages));
				chats[currentId - 1][2] = [res, 'audio'];
				chats[currentId - 1][3] = date;
				switcher('chat', chats, currentTitle, currentId, false);
				localStorage.setItem('chatInfo', JSON.stringify(chats));
				setChunks([]);
			}
		});
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
					src="https://cdn.icon-icons.com/icons2/1514/PNG/512/attachmentpaperclipsymbolofinterface_104983.png"
				/>
			</label>
			<input
				type="file"
				style={{ display: 'none' }}
				onChange={attachPhoto}
				multiple
				accept="image/*"
				id="attach"
			/>
			{!isRecording && (
				<img
					className="recordButton"
					alt="запись звука"
					src="https://cdn2.iconfinder.com/data/icons/social-messaging-productivity-black-2/1/32-512.png"
					onClick={getRecord}
				/>
			)}
			{isRecording && (
				<img
					className="pauseButton"
					alt="пауза"
					src="https://img.icons8.com/material-sharp/452/circled-pause.png"
					onClick={getRecord}
				/>
			)}
		</div>
	);
}
