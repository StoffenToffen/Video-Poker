import clubsIcon from "../assets/clubs.svg";
import diamondsIcon from "../assets/diamonds.svg";
import heartsIcon from "../assets/hearts.svg";
import spadesIcon from "../assets/spades.svg";

const Card = ({ symbol, value }: { symbol: string; value: number }) => {
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

	return (
		<div className="card">
			<span className="card__number">{valueToShow(value)}</span>

			<div className="card__icons">
				<img
					src={symbolToShow(symbol)}
					alt={symbol}
					className="card__icons__icon"
				/>
			</div>

			<span className="card__number">{valueToShow(value)}</span>
		</div>
	);
};

export default Card;
