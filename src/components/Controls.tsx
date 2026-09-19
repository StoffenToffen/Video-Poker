import { useGameStore } from "../zustand/gameStore";

const Controls = () => {
	const bet = useGameStore((state) => state.bet);
	const selectedCards = useGameStore((state) => state.selectedCards);
	const isGameOver = useGameStore((state) => state.isGameOver);
	const player = useGameStore((state) => state.player);
	const setDeck = useGameStore((state) => state.setDeck);
	const setHand = useGameStore((state) => state.setHand);
	const setBet = useGameStore((state) => state.setBet);
	const deselectCards = useGameStore((state) => state.deselectCards);
	const setIsGameOver = useGameStore((state) => state.setIsGameOver);
	const setMessage = useGameStore((state) => state.setMessage);
	const updateBalance = useGameStore((state) => state.updateBalance);

	/**
	 * @description Creates a new 52-card deck, then shuffles it with the Fisher-Yates method
	 */
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
	};

	return (
		<div className="controls">
			<button
				type="button"
				disabled={bet < 2}
				onClick={() => setBet(-1)}
				className="controls__btn--left"
			>
				Bet-
			</button>

			{!isGameOver ? (
				<button
					type="button"
					onClick={() => {
						deselectCards();
						setHand(selectedCards);
						setIsGameOver();
					}}
					className="controls__btn--middle"
				>
					Draw
				</button>
			) : (
				<button
					type="button"
					onClick={() => {
						player.balance < bet
							? setMessage("ur broke lmao")
							: (createDeck(),
								updateBalance(-bet),
								setIsGameOver(),
								setMessage(""));
					}}
					className="controls__btn--middle"
				>
					Play
				</button>
			)}

			<button
				type="button"
				disabled={bet > 4}
				onClick={() => setBet(1)}
				className="controls__btn--right"
			>
				Bet+
			</button>
		</div>
	);
};

export default Controls;
