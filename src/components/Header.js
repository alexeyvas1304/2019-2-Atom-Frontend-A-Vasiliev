/* eslint-disable indent */
/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom';

export default function Header(props) {
	const { state, switcher } = props;
	const { where, chats, currentTitle, currentId } = state;

	function backToChats() {
		if (currentId) {
			chats[currentId - 1][1] = currentTitle;
			const lastSection = JSON.parse(localStorage.getItem(currentId));
			chats[currentId - 1][2] = lastSection[lastSection.length - 1][0];
			chats[currentId - 1][3] = lastSection[lastSection.length - 1][1];
		}
		switcher('chatlist', chats, 'список чатов', null, false);
	}

	function toUserProfile() {
		switcher('profile', chats, 'Редактировать профиль', null, false);
	}

	const burgerButton = (
		<Link to="/profile">
			<img
				className="burgerButton"
				alt="burger icon"
				src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png"
				onClick={toUserProfile}
			/>
		</Link>
	);

	const backButton = (
		<Link to="/">
			<img
				className="backButton"
				alt="button back"
				src="https://image.flaticon.com/icons/png/512/12/12104.png"
				onClick={backToChats}
			/>
		</Link>
	);

	const threePointsButton = (
		<img
			className="threePointsButton"
			alt="three points icon"
			src="https://image.flaticon.com/icons/png/512/64/64576.png"
		/>
	);

	const bildButton = (
		<img
			className="bildButton"
			alt="bild"
			src="https://cdn0.iconfinder.com/data/icons/thin-gui-elements-1/24/thin-0154_ok_successful_check-512.png"
		/>
	);

	const leftButton = where === 'chatlist' ? burgerButton : backButton;
	const rightButton = where === 'profile' ? bildButton : threePointsButton;

	const head = (
		<div className="allHeader">
			{leftButton}
			<div className="title">{currentTitle}</div>
			{rightButton}
		</div>
	);

	return head;
}
