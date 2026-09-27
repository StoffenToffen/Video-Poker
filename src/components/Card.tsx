import clubsIcon from "../assets/clubs.svg";
import diamondsIcon from "../assets/diamonds.svg";
import heartsIcon from "../assets/hearts.svg";
import spadesIcon from "../assets/spades.svg";
import type { PlayingCardType } from "../types";
import { useGameStore } from "../zustand/gameStore";

const faces = import.meta.glob<string>("../assets/faces/*.PNG", {
	eager: true,
	import: "default",
});

const Card = ({ card }: { card: PlayingCardType }) => {
	const selectedCards = useGameStore(
		(state) => state.currentPlayer.selectedCards,
	);
	const message = useGameStore((state) => state.currentPlayer.message);
	const setSelectedCards = useGameStore((state) => state.setSelectedCards);

	/**
	 * @param symbol as the card symbol hearts, spades, diamonds, or clubs
	 * @returns icon import of the corresponding symbol
	 */
	const symbolToShow = (symbol: string) => {
		switch (symbol) {
			case "spades":
				return spadesIcon;
			case "clubs":
				return clubsIcon;
			case "diamonds":
				return diamondsIcon;
			case "hearts":
				return heartsIcon;
		}
	};

	/**
	 * @param value as the card value 1-13
	 * @returns letters associated to ace, jack, queen, and king, or just the number
	 */
	const valueToShow = (value: number) => {
		switch (value) {
			case 1:
				return "A";
			case 11:
				return "J";
			case 12:
				return "Q";
			case 13:
				return "K";
			default:
				return value;
		}
	};

	const faceIDs: Record<string, string> = Object.fromEntries(
		Object.entries(faces).map(([path, url]) => {
			return [path.split(/[/.]+/).at(-2), url];
		}),
	);

	return (
		<button
			type="button"
			onClick={() => setSelectedCards(card)}
			disabled={!!message}
			className={`card ${selectedCards.some((selectedCard) => selectedCard.id === card.id) ? "card--selected" : ""}`}
			style={{
				backgroundImage: faceIDs[card.id] ? `url("${faceIDs[card.id]}")` : "",
			}}
		>
			<div className="card__identifiers">
				<span className="card__number">{valueToShow(card.value)}</span>
				<img
					src={symbolToShow(card.symbol)}
					alt={card.symbol}
					className="card__icon"
				/>
			</div>

			<div />

			<div className="card__identifiers">
				<span className="card__number">{valueToShow(card.value)}</span>
				<img
					src={symbolToShow(card.symbol)}
					alt={card.symbol}
					className="card__icon"
				/>
			</div>
		</button>
	);
};

export default Card;
