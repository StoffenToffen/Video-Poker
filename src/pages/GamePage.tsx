import { useState } from "react";
import Card from "../components/Card";

import type { PlayingCardType } from "../types";
import "./GamePage.css";

const Game = () => {
	const [deck, setDeck] = useState<PlayingCardType[]>(createDeck);

	function createDeck() {
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

		return newDeck;
	}
	// Creates a new 52-card deck, then shuffles it with the Fisher-Yates method

	return (
		<>
			<div className="cards">
				{deck.slice(-5).map(({ id, symbol, value }) => (
					<Card key={id} symbol={symbol} value={value} />
				))}
			</div>

			<button type="button" onClick={() => setDeck(createDeck)}>
				Shuffle deck
			</button>
		</>
	);
};

export default Game;
