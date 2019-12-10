/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import MessageBox from './MessageBox';
import '../styles/MessageList.css';

export default function MessageList(props) {
	const { state, switcher } = props;
	const { currentId } = state;
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		const id = setInterval(() => {
			fetch(`http://127.0.0.1:8000/chats/get_messages/${currentId}/`, {
				method: 'GET',
				mode: 'cors',
				credentials: 'include',
			})
				.then((resp) => resp.json())
				.then((json) => {
					const tmp = json.response;
					const tmp2 = tmp.map((item) => [
						[item.content, item.type_of_message],
						item.added_at,
					]);
					setMessages(tmp2);
				});
		}, 1000);
		return () => clearInterval(id);
	}, [currentId]);

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
