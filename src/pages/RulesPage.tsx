import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import PayoutTable from "../components/PayoutTable";
import { useGameStore } from "../zustand/gameStore";

import "./RulesPage.css";

const Rules = () => {
	const name = useGameStore((state) => state.currentPlayer.name);

	const navigate = useNavigate();

	useEffect(() => {
		if (!name) navigate("/");
	}, [name, navigate]);

	return (
		<main className="container">
			<div className="rules-container container--md">
				<div className="rules">
					<h1 className="rules__title">Poker</h1>
					<h2 className="rules__subtitle">5-Card Draw</h2>

					<span>Place bet</span>
					<span className="rules__divider" />
					<span>Click on the cards you want to keep</span>
					<span className="rules__divider" />
					<span>The rest gets switched out</span>
					<span className="rules__divider" />
					<span>The game ends after one turn</span>
					<span className="rules__divider" />
					<span>Payout is multiplied by bet amount</span>
				</div>

				<PayoutTable />
			</div>

			<Link to="/game" className="rules__link">
				Play
			</Link>

			<div className="rules__made-by">Made by Steffen</div>

			<Nav />
		</main>
	);
};

export default Rules;
