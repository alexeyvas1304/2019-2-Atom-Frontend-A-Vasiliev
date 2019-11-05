import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import logo from '../assets/logo.svg';
import './header.css';

const year = '2k18';

const rotate360 = keyframes`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(90deg);
	}
`;

const TopBar = styled.div`
	background-color: #222;
	height: 150px;
	padding: 20px;
	color: #fff;

	.redux-logo {
		animation: ${rotate360} infinite 20s linear;
		height: 80px;
	}
`;

function Header() {
	return (
		<TopBar>
			<img src={logo} className="redux-logo" alt="logo" />
			<h2>Atom Mail.Ru, {year}</h2>
		</TopBar>
	);
}

export default Header;
