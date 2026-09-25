import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Controls from "../components/Controls";
import CurrentBet from "../components/CurrentBet";
import HandRank from "../components/HandRank";
import Nav from "../components/Nav";
import TotalCoins from "../components/TotalCoins";
import { useGameStore } from "../zustand/gameStore";

import "./GamePage.css";

const Game = () => {
	const hand = useGameStore((state) => state.currentPlayer.hand);
	const message = useGameStore((state) => state.currentPlayer.message);
	const name = useGameStore((state) => state.currentPlayer.name);

	const navigate = useNavigate();

	useEffect(() => {
		if (!name) navigate("/");
	}, [name, navigate]);

	return (
		<main className="container--md">
			<h1 className="game-title">Poker</h1>

			<div className="counter container--sm">
				<CurrentBet />
				<TotalCoins />
			</div>

			<div
				role="status"
				aria-live="polite"
				aria-atomic="true"
				className={`message ${!message && "sr-only"}`}
			>
				<span>{message}</span>
			</div>

			<div className="cards-container">
				<HandRank />

				<div className="cards">
					{hand.length
						? hand.slice(-5).map((card) => <Card key={card.id} card={card} />)
						: new Array(5).fill(null).map((_, i) => (
								<div key={i} className="card-back">
									<div className="card-back__center" />
								</div>
							))}
				</div>
			</div>

			<Controls />

			<Nav />
		</main>
	);
};

export default Game;
