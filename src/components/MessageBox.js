/* eslint-disable react/prop-types */
import React from 'react';
import '../styles/MessageBox.css';

export default function MessageBox(props, key) {
	const { message } = props;
	const uniqueKey = key;

	return (
		<div key={uniqueKey} className="divbox">
			<div className="MessageBox">
				{message[0][1] === 'text' && (
					<div className="contentMessageBox">{message[0][0]}</div>
				)}
				{message[0][1] === 'href' && (
					<a className="hrefInBox" href={message[0]}>
						{message[0][0]}
					</a>
				)}
				{message[0][1] === 'img' && (
					<img
						className="imageInBox"
						alt="картинка"
						src={message[0][0]}
						onLoad={() => {
							window.URL.revokeObjectURL(message[0][0]);
						}}
					/>
				)}
				<div className="time">{message[1].slice(11, 19)}</div>
			</div>
		</div>
	);
}
