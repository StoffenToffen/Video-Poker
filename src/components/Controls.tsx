import { useGameStore } from "../zustand/gameStore";

const Controls = () => {
	const hand = useGameStore((state) => state.hand);
	const bet = useGameStore((state) => state.bet);
	const selectedCards = useGameStore((state) => state.selectedCards);
	const setDeck = useGameStore((state) => state.setDeck);
	const setHand = useGameStore((state) => state.setHand);
	const setBet = useGameStore((state) => state.setBet);
	const deselectCards = useGameStore((state) => state.deselectCards);
	const updateBalance = useGameStore((state) => state.updateBalance);

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
		<div className="controls">
			<button
				type="button"
				onClick={() => setBet(-1)}
				className="controls__btn--left"
			>
				Bet-
			</button>

			{hand.length ? (
				<button
					type="button"
					onClick={() => {
						!bet && setBet(1);
						deselectCards();
						setHand(selectedCards);
						updateBalance(-bet);
					}}
					className="controls__btn--middle"
				>
					Draw
				</button>
			) : (
				<button
					type="button"
					onClick={() => {
						!bet && setBet(1);
						createDeck();
						updateBalance(-bet);
					}}
					className="controls__btn--middle"
				>
					Play
				</button>
			)}

			<button
				type="button"
				onClick={() => setBet(1)}
				className="controls__btn--right"
			>
				Bet+
			</button>
		</div>
	);
};

export default Controls;
