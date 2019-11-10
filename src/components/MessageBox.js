/* eslint-disable react/prop-types */
import React from 'react';
import '../styles/MessageBox.css';

export default function MessageBox(props, key) {
	const { message } = props;
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
