import clubsIcon from "../assets/clubs.svg";
import diamondsIcon from "../assets/diamonds.svg";
import heartsIcon from "../assets/hearts.svg";
import spadesIcon from "../assets/spades.svg";
import type { PlayingCardType } from "../types";
import { useGameStore } from "../zustand/gameStore";

const Card = ({ card }: { card: PlayingCardType }) => {
	const selectedCards = useGameStore((state) => state.selectedCards);
	const isGameOver = useGameStore((state) => state.isGameOver);
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

	return (
		<button
			type="button"
			onClick={() => setSelectedCards(card)}
			disabled={isGameOver}
			className={`card ${selectedCards.includes(card) && "card--selected"}`}
		>
			<span className="card__number">{valueToShow(card.value)}</span>

			<div className="card__icons">
				<img
					src={symbolToShow(card.symbol)}
					alt={card.symbol}
					className="card__icons__icon"
				/>
			</div>

			<span className="card__number">{valueToShow(card.value)}</span>
		</button>
	);
};

export default Card;
