import Card from "../components/Card";
import Controls from "../components/Controls";
import Nav from "../components/Nav";
import { useGameStore } from "../zustand/gameStore";

import "./GamePage.css";

const Game = () => {
	const hand = useGameStore((state) => state.hand);
	const bet = useGameStore((state) => state.bet);
	const player = useGameStore((state) => state.player);

	return (
		<>
			<div className="counter">
				<span>Bet: ${bet}</span>
				<span>${player.balance}</span>
			</div>

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

			<Controls />

			<Nav />
		</>
	);
};

export default Game;
