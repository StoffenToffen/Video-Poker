import Card from "../components/Card";
import Controls from "../components/Controls";
import Nav from "../components/Nav";
import type { PlayingCardType } from "../types";
import { useGameStore } from "../zustand/gameStore";

import "./GamePage.css";

const Game = () => {
	const hand = useGameStore((state) => state.hand);
	const bet = useGameStore((state) => state.bet);
	const player = useGameStore((state) => state.player);
	const message = useGameStore((state) => state.message);

	/**
	 * @description Sorts the values of the player's hand and checks for each possible poker hand
	 * @param hand as the player's current five cards
	 * @returns playersHand as one of the different hands in poker
	 */
	const getPlayerHand = (hand: PlayingCardType[]): string => {
		let playersHand = "";
		const handValues: number[] = [];
		// Sort hand
		hand.forEach((card) => {
			handValues.push(card.value);
		});

		handValues.sort(
			(a, b) =>
				handValues.filter((card) => card === b).length -
					handValues.filter((card) => card === a).length || b - a,
		);
		// Is flush?
		if (hand.every((card) => card.symbol === hand[0].symbol)) {
			playersHand = "Flush";
			// Is straight flush?
			if (handValues[0] - handValues[4] === 4) playersHand = "Straight flush";
			// Is royal flush?
			else if (
				handValues[0] === 13 &&
				handValues[3] === 10 &&
				handValues[4] === 1
			)
				playersHand = "Royal flush";
		} else {
			// Is pairs?
			const pair1: number[] = [];
			const pair2: number[] = [];

			handValues.forEach((value) => {
				if (!pair1.length || pair1[0] === value) pair1.push(value);
				else if (!pair2.length || pair2[0] === value) pair2.push(value);
			});

			if (pair1.length === 4) playersHand = "Four of a kind";
			else if (pair1.length === 3 && pair2.length === 2)
				playersHand = "Full house";
			else if (pair1.length === 3) playersHand = "Three of a kind";
			else if (pair2.length === 2) playersHand = "Two pairs";
			else if (pair1.length === 2) playersHand = "One pair";
			// Is straight?
			else if (handValues[0] - handValues[4] === 4) playersHand = "Straight";
			else if (
				handValues[0] === 13 &&
				handValues[3] === 10 &&
				handValues[4] === 1
			)
				playersHand = "Straight";
		}
		return playersHand;
	};

	return (
		<main>
			<div className="counter">
				<span>Bet: ${bet}</span>
				<span>${player.balance}</span>
			</div>

			<div className="poker-hand">{getPlayerHand(hand)}</div>

			<div className="message">
				<span>{message}</span>
			</div>

			<div className="cards-container">
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
