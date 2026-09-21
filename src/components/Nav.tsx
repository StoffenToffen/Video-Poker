import { Link } from "react-router-dom";
import bookIcon from "../assets/book.svg";
import closeIcon from "../assets/close.svg";
import logoutIcon from "../assets/logout.svg";
import speakerOnIcon from "../assets/speaker-on.svg";

const Nav = () => {
	const path = location.pathname;

	return (
		<nav className="nav container--sm">
			<Link to="/">
				<img src={logoutIcon} alt="Log out" className="nav__link__icon" />
			</Link>
			{path === "rules" ? (
				<Link to="/game">
					<img src={closeIcon} alt="Close rules" className="nav__link__icon" />
				</Link>
			) : (
				<Link to="/rules">
					<img src={bookIcon} alt="Rules" className="nav__link__icon" />
				</Link>
			)}
			<button type="button">
				<img src={speakerOnIcon} alt="Sound on" className="nav__link__icon" />
			</button>
		</nav>
	);
};

export default Nav;
