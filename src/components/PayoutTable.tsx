const PayoutTable = () => {
	return (
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
	);
};

export default PayoutTable;
