import { useState } from "react";
import Card from "../components/Card";
import Controls from "../components/Controls";
import Nav from "../components/Nav";
import type { PlayingCardType } from "../types";
import { useGameStore } from "../zustand/gameStore";

import "./GamePage.css";

const Game = () => {
	const [selectedCards, setSelectedCards] = useState<PlayingCardType[]>([]);

	const hand = useGameStore((state) => state.hand);
	const bet = useGameStore((state) => state.bet);
	const player = useGameStore((state) => state.player);

	return (
		<main>
			<div className="counter">
				<span>Bet: ${bet}</span>
				<span>${player.balance}</span>
			</div>

			<div className="cards">
				{hand.length
					? hand
							.slice(-5)
							.map((card) => (
								<Card
									key={card.id}
									card={card}
									selectedCards={selectedCards}
									setSelectedCards={setSelectedCards}
								/>
							))
					: new Array(5).fill(null).map((_, i) => (
							<div key={i} className="card-back">
								<div className="card-back__center" />
							</div>
						))}
			</div>

			<Controls />

			<Nav />
		</main>
	);
};

export default Game;
