import cloverIcon from "../assets/clover.svg";
import spadeIcon from "../assets/spade.svg";
import diamondIcon from "../assets/diamond.svg";
import heartIcon from "../assets/heart.svg";

const Card = () => {
	return (
		<div className="card">
			<span className="card__number">5</span>

			<div className="card__icons">
				<img src={cloverIcon} alt="clover" className="card__icons__icon" />
			</div>

			<span className="card__number">5</span>
		</div>
	);
};

export default Card;
