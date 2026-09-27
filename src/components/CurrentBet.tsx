import { useGameStore } from "../zustand/gameStore";

const CurrentBet = () => {
	const bet = useGameStore((state) => state.currentPlayer.bet);

	return <span>Bet: ${bet}</span>;
};

export default CurrentBet;
