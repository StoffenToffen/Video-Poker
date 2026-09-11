import clubsIcon from "../assets/clubs.svg";
import diamondsIcon from "../assets/diamonds.svg";
import heartsIcon from "../assets/hearts.svg";
import spadesIcon from "../assets/spades.svg";
import type { PlayingCardType } from "../types";

const Card = ({
	card,
	selectedCards,
	setSelectedCards,
}: {
	card: PlayingCardType;
	selectedCards: PlayingCardType[];
	setSelectedCards: React.Dispatch<React.SetStateAction<PlayingCardType[]>>;
}) => {
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
		// Converts the four card symbols into their corresponding icon
	};

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
		// Converts the numbers 1, 11, 12, and 13 to card letters
	};

	const handleSetSelectedCards = (
		selectedCards: PlayingCardType[],
		card: PlayingCardType,
	) => {
		setSelectedCards(
			selectedCards.includes(card)
				? selectedCards.filter((selectedCard) => selectedCard !== card)
				: [...selectedCards, card],
		);
		// Takes in selectedCards & card
		// Returns void
		// Removes or adds card to selectedCards
	};

	return (
		<button
			type="button"
			onClick={() => handleSetSelectedCards(selectedCards, card)}
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
