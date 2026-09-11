import Card from "../components/Card";
import Nav from "../components/Nav";
import { useGameStore } from "../zustand/gameStore";

import "./GamePage.css";

const Game = () => {
	const hand = useGameStore((state) => state.hand);
	const player = useGameStore((state) => state.player);
	const setDeck = useGameStore((state) => state.setDeck);

	const createDeck = () => {
		const suits = ["spades", "clubs", "diamonds", "hearts"];
		const newDeck = [];
		let id = 0;

		for (let i = 1; i <= 13; i++) {
			for (const suit in suits) {
				id++;
				newDeck.push({ id: id, symbol: suits[suit], value: i });
			}
		}

		let m = newDeck.length;
		let i: number;

		while (m) {
			i = Math.floor(Math.random() * m--);
			[newDeck[m], newDeck[i]] = [newDeck[i], newDeck[m]];
		}

		setDeck(newDeck);
		// Creates a new 52-card deck, then shuffles it with the Fisher-Yates method
	};

	return (
		<>
			<span>${player.balance}</span>

			<div className="cards">
				{hand.length
					? hand
							.slice(-5)
							.map(({ id, symbol, value }) => (
								<Card key={id} symbol={symbol} value={value} />
							))
					: new Array(5).fill(null).map((_, i) => (
							<div key={i} className="card-back">
								<div className="card-back__center" />
							</div>
						))}
			</div>

			<button type="button" onClick={createDeck}>
				Shuffle deck
			</button>

			<div className="controls">
				<button type="button" className="controls__btn--left">
					Bet-
				</button>
				<button type="button" className="controls__btn--middle">
					Draw
				</button>
				<button type="button" className="controls__btn--right">
					Bet+
				</button>
			</div>

			<Nav />
		</>
	);
};

export default Game;
