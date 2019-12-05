/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */

import React, { useRef } from 'react';
import '../styles/FormInput.css';

export default function FormInput(props) {
	const { state, switcher } = props;
	const { numOfChats, currentTitle, currentId, isRecording } = state;
	const chunks = useRef([]);

	function fetching(res, typeOfMessage) {
		const data = new FormData();
		data.append('chat_id', currentId);
		data.append('content', res);
		data.append('type_of_message', typeOfMessage);
		fetch('http://127.0.0.1:8000/message/send_message/', {
			method: 'POST',
			body: data,
			mode: 'cors',
			credentials: 'include',
		})
			.then(() => {
				console.log('все ок!');
			})
			.catch(console.log);
	}

	const addMessage = (event) => {
		if (event.key === 'Enter' && event.target.value.trim() !== '') {
			fetching(event.target.value, 'text');
			event.target.value = ''; // это нормально так делать ?
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
			fetching(res, 'href');
		}

		function error(err) {
			console.warn(`ERROR(${err.code}): ${err.message}`);
		}
		navigator.geolocation.getCurrentPosition(success, error, options);
	};

	const attachPhoto = (event) => {
		for (let i = 0; i < event.target.files.length; i += 1) {
			const res = window.URL.createObjectURL(event.target.files[i]);
			fetching(res, 'img');
		}
	};

	const attachPhotoDrop = (event) => {
		event.preventDefault();
		event.stopPropagation();
		for (let i = 0; i < event.dataTransfer.files.length; i += 1) {
			const res = window.URL.createObjectURL(event.dataTransfer.files[i]);
			fetching(res, 'img');
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
				switcher('chat', numOfChats, currentTitle, currentId, mediaRecorder);
				mediaRecorder.start(1000);

				// eslint-disable-next-line no-shadow
				mediaRecorder.ondataavailable = (event) => {
					chunks.current.push(event.data);
				};
			} else {
				isRecording.stop();
				const blob = new Blob(chunks.current, {
					type: isRecording.mimeType,
				});

				const res = window.URL.createObjectURL(blob);
				fetching(res, 'audio');
				switcher('chat', numOfChats, currentTitle, currentId, false);
				chunks.current = [];
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
					src="https://image.flaticon.com/icons/png/512/124/124506.png"
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
