import type { PokerHandType } from "../types";
import { useGameStore } from "../zustand/gameStore";

const HandRank = () => {
	const rank = useGameStore((state) => state.currentPlayer.rank);

	/**
	 * @description Makes the first letter of a string uppercase, and adds spaces between capital letters
	 * @param string as the player's hand rank
	 * @returns string
	 */
	const formatRankTxt = (string: PokerHandType): string => {
		const newString = string[0].toUpperCase() + string.slice(1);
		return newString.split(/(?=[A-Z])/).join(" ");
	};

	return (
		<div className="poker-hand">
			{rank && formatRankTxt(rank as PokerHandType)}
		</div>
	);
};

export default HandRank;
