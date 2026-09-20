import Card from "../components/Card";
import Controls from "../components/Controls";
import Nav from "../components/Nav";
import { useGameStore } from "../zustand/gameStore";

import "./GamePage.css";

const Game = () => {
	const hand = useGameStore((state) => state.hand);
	const bet = useGameStore((state) => state.bet);
	const player = useGameStore((state) => state.player);
	const rank = useGameStore((state) => state.rank);
	const message = useGameStore((state) => state.message);

	return (
		<main>
			<div className="counter">
				<span>Bet: ${bet}</span>
				<span>${player.balance}</span>
			</div>

			<div className="poker-hand">{rank}</div>

			{message && (
				<div className="message">
					<span>{message}</span>
				</div>
			)}

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
