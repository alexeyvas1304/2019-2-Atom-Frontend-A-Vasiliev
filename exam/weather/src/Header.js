import React from 'react';
import './Header.css'

export default function Header(props) {
	const {} = props;


	const leftButton = (
		<img
			className="leftButton"
			alt="left"
			src="https://image.flaticon.com/icons/png/512/93/93634.png"
		/>
	);

	const rightButton = (
		<img
			className="rightButton"
			alt="bild"
			src="https://cdn0.iconfinder.com/data/icons/thin-gui-elements-1/24/thin-0154_ok_successful_check-512.png"
		/>
	);


	const head = (
		<div className="allHeader">
			{leftButton}
			<div className="title">Manage cities</div>
			{rightButton}
		</div>
	);

	return head;

}
