import clubsIcon from "../assets/clubs.svg";
import diamondsIcon from "../assets/diamonds.svg";
import heartsIcon from "../assets/hearts.svg";
import spadesIcon from "../assets/spades.svg";

const Card = ({ symbol, value }: { symbol: string; value: number }) => {
	const symbolToShow = () => {
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

	const valueToShow = () => {
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
		<div className="card">
			<span className="card__number">{valueToShow()}</span>

			<div className="card__icons">
				<img src={symbolToShow()} alt={symbol} className="card__icons__icon" />
			</div>

			<span className="card__number">{valueToShow()}</span>
		</div>
	);
};

export default Card;
