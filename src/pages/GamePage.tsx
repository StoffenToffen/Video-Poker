import Card from "../components/Card";

import "./GamePage.css";

const Game = () => {
	return (
		<div className="cards">
			{new Array(5).fill(null).map((_, i) => (
				<Card key={i} />
			))}
		</div>
	);
};

export default Game;
