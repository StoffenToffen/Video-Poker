import { useEffect } from "react";
import Card from "../components/Card";
import Controls from "../components/Controls";
import Nav from "../components/Nav";
import { useGameStore } from "../zustand/gameStore";

import "./GamePage.css";
import { useNavigate } from "react-router-dom";

const Game = () => {
	const hand = useGameStore((state) => state.currentPlayer.hand);
	const bet = useGameStore((state) => state.currentPlayer.bet);
	const balance = useGameStore((state) => state.currentPlayer.balance);
	const rank = useGameStore((state) => state.currentPlayer.rank);
	const message = useGameStore((state) => state.currentPlayer.message);
	const name = useGameStore((state) => state.currentPlayer.name);

	const navigate = useNavigate();

	/**
	 * @description Makes the first letter of a string uppercase, and adds spaces between capital letters
	 * @param string as the player's hand rank
	 * @returns string
	 */
	const formatRankTxt = (string: string) => {
		const newString = string[0].toUpperCase() + string.slice(1);
		return newString.split(/(?=[A-Z])/).join(" ");
	};

	useEffect(() => {
		if (!name) navigate("/");
	}, [name, navigate]);

	return (
		<main className="container--md">
			<div className="counter container--sm">
				<span>Bet: ${bet}</span>
				<span>${balance}</span>
			</div>

			{message && (
				<div className="message">
					<span>{message}</span>
				</div>
			)}

			<div className="cards-container">
				<div className="poker-hand">{rank && formatRankTxt(rank)}</div>

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
