/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import '../styles/Header.css';

export default function Header(props) {
	const { state, switcher } = props;
	const { onChatList, chats, currentTitle, currentId } = state;

	function backToChats() {
		chats[currentId - 1][1] = currentTitle;
		const lastSection = JSON.parse(localStorage.getItem(currentId));
		chats[currentId - 1][2] = lastSection[lastSection.length - 1][0];
		chats[currentId - 1][3] = lastSection[lastSection.length - 1][1];
		switcher(true, chats, 'список чатов', null);
	}

	const inChatListButton = (
		<img
			className="burger"
			alt="burger icon"
			src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png"
		/>
	);
	const inDialogButton = (
		<img
			className="buttonback"
			alt="button back"
			src="https://image.flaticon.com/icons/png/512/12/12104.png"
			onClick={backToChats}
		/>
	);

	const leftButton = onChatList ? inChatListButton : inDialogButton;

	const head = (
		<div className="allHeader">
			{leftButton}
			<div className="title">{currentTitle}</div>
			<img
				className="search"
				alt="search icon"
				src="https://elize.ru/img/icons/zoom.png"
			/>
		</div>
	);

	return head;
}
