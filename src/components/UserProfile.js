import React from 'react';
import '../styles/UserProfile.css';

export default function UserProfile(props) {
	return (
		<div className="UserProfile">
			<div className="photoField">
				<img
					alt="ава"
					className="mainAvatar"
					src="https://www.ivi.ru/titr/uploads/2016/12/13/f5fd6d0d2ba83f18fd7b104ed805f16e.jpg/1400x0"
				/>
			</div>
			<div className="fullNameField">
				<h3> Имя:</h3>
				<div className="fullNameWrapper">
					<textarea
						className="inputTextFullName"
						defaultValue="Алексей Васильев"
					/>
				</div>
			</div>
			<div className="userNameField">
				<h3> Ник:</h3>
				<div className="userNameWrapper">
					<textarea className="inputTextUserName" defaultValue="VamosAtleti" />
				</div>
			</div>
			<div className="bioField">
				<h3> Информация о себе:</h3>
				<div className="bioWrapper">
					<textarea
						className="inputTextBio"
						defaultValue="Ребята не стоит вскрывать эту тему.
					Вы молодые, шутливые, вам все легко. Это не то.
					Это не Чикатило и даже не архивы спецслужб. Сюда лучше не лезть.
						Серьезно, любой из вас будет жалеть. Лучше закройте тему и забудьте что тут писалось.
						Я вполне понимаю что данным сообщением вызову дополнительный интерес, но хочу сразу предостеречь пытливых - стоп. Остальные просто не найдут."
					/>
				</div>
			</div>
		</div>
	);
}
