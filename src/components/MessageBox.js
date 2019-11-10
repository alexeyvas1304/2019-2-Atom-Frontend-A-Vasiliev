/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-destructuring */
import React from 'react';
import './MessageBox.css';

export default function MessageBox(props, key) {
	const state = props.state;
	const currentTitle = props.currentTitle;
	const chats = props.chats;
	const currentId = props.currentId;
	const message = props.message;
	const uniqueKey = key;

	return (
		<li key={uniqueKey} className="libox">
			<div className="MessageBox">
				<div className="contentMessageBox">{message[0]}</div>
				<div className="time">{message[1]}</div>
			</div>
		</li>
	);
}
