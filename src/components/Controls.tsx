import { useGameStore } from "../zustand/gameStore";

const Controls = () => {
	const hand = useGameStore((state) => state.currentPlayer.hand);
	const bet = useGameStore((state) => state.currentPlayer.bet);
	const message = useGameStore((state) => state.currentPlayer.message);
	const balance = useGameStore((state) => state.currentPlayer.balance);
	const startGame = useGameStore((state) => state.startGame);
	const endGame = useGameStore((state) => state.endGame);
	const setBet = useGameStore((state) => state.setBet);
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

		startGame(newDeck);
	};

	return (
		<div className="controls container--sm">
			<button
				type="button"
				aria-label="bet minus"
				disabled={bet < 2 || (!message && !!hand.length)}
				onClick={() => setBet(-1)}
				className="controls__btn--left"
			>
				Bet-
			</button>

			{!message && hand.length ? (
				<button
					type="button"
					onClick={() => {
						endGame();
					}}
					className="controls__btn--middle"
				>
					Draw
				</button>
			) : (
				<button
					type="button"
					onClick={() => {
						balance < bet
							? setMessage("ur broke lmao")
							: (createDeck(), updateBalance(-bet), setMessage(""));
					}}
					className="controls__btn--middle"
				>
					Play
				</button>
			)}

			<button
				type="button"
				aria-label="bet plus"
				disabled={bet > 4 || (!message && !!hand.length)}
				onClick={() => setBet(1)}
				className="controls__btn--right"
			>
				Bet+
			</button>
		</div>
	);
};

export default Controls;
