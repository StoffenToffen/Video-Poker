import { useGameStore } from "../zustand/gameStore";

const TotalCoins = () => {
	const balance = useGameStore((state) => state.currentPlayer.balance);

	return <span>${balance}</span>;
};

export default TotalCoins;
