import { useGameStore } from "../zustand/gameStore";

const TotalCoins = () => {
	const balance = useGameStore((state) => state.currentPlayer.balance);

	return (
		<>
			<span aria-hidden>${balance}</span>
			<span className="sr-only">Balance: ${balance}</span>
		</>
	);
};

export default TotalCoins;
