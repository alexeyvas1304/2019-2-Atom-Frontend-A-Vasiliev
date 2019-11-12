/* eslint-disable react/prop-types */
import React from 'react';
import '../styles/MessageBox.css';

export default function MessageBox(props, key) {
	const { message } = props;
	const uniqueKey = key;

	return (
		<div key={uniqueKey} className="divbox">
			<div className="MessageBox">
				<div className="contentMessageBox">{message[0]}</div>
				<div className="time">{message[1].slice(11, 19)}</div>
			</div>
		</div>
	);
}
