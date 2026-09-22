import { Link } from "react-router-dom";
import Nav from "../components/Nav";

import "./RulesPage.css";

const Rules = () => {
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

				<table className="rules__table container--sm">
					<thead className="rules__table__header">
						<tr>
							<th>Hand ranks</th>
							<th className="rules__table__cell--right">Payout</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Royal flush</td>
							<td className="rules__table__cell--right">250</td>
						</tr>
						<tr>
							<td>Straight flush</td>
							<td className="rules__table__cell--right">50</td>
						</tr>
						<tr>
							<td>Four of a kind</td>
							<td className="rules__table__cell--right">25</td>
						</tr>
						<tr>
							<td>Full house</td>
							<td className="rules__table__cell--right">9</td>
						</tr>
						<tr>
							<td>Flush</td>
							<td className="rules__table__cell--right">6</td>
						</tr>
						<tr>
							<td>Straight</td>
							<td className="rules__table__cell--right">4</td>
						</tr>
						<tr>
							<td>Three of a kind</td>
							<td className="rules__table__cell--right">3</td>
						</tr>
						<tr>
							<td>Two pairs</td>
							<td className="rules__table__cell--right">2</td>
						</tr>
						<tr>
							<td>One pair</td>
							<td className="rules__table__cell--right">1</td>
						</tr>
					</tbody>
				</table>
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
