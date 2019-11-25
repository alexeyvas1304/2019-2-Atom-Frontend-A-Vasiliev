/* eslint-disable react/prop-types */
import React from 'react';
import MessageBox from './MessageBox';
import '../styles/MessageList.css';

export default function MessageList(props) {
	const { state, switcher } = props;
	const { currentId } = state;

	const messages = JSON.parse(localStorage.getItem(currentId));

	return (
		<div className="divMessage">
			{messages.map((item) => (
				<MessageBox
					key={item[0] + item[1]}
					state={state}
					switcher={switcher}
					message={item}
				/>
			))}
		</div>
	);
}