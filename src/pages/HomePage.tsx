import { useState } from "react";
import { Link } from "react-router-dom";
import arrowIcon from "../assets/arrow.svg";

import "./HomePage.css";

const Home = () => {
	const [showLogin, setShowLogin] = useState(false);

	return (
		<main className="container">
			<h1 className="home__title">Poker</h1>
			<h2 className="home__subtitle">5-Card Draw</h2>

			{!showLogin ? (
				<button
					type="button"
					onClick={() => setShowLogin(true)}
					className="home__btn"
				>
					Play
				</button>
			) : (
				<div className="home__container">
					<form action="">
						<label htmlFor="username" className="home__label">
							Register new account
							<div className="home__input-wrapper">
								<input
									type="text"
									id="username"
									autoComplete="username"
									min={2}
									max={20}
									required
									placeholder="John Doe"
									className="home__input"
								/>

								<button type="submit" className="home__input__btn">
									<img
										src={arrowIcon}
										alt="arrow"
										className="home__input__btn__icon"
									/>
								</button>
							</div>
						</label>
					</form>

					<div className="home__divider">
						<span className="home__divider__line" />
						<span>or</span>
						<span className="home__divider__line" />
					</div>

					<span className="home__subtext">Pick an existing user</span>

					<ul className="home__users">
						<li>
							<button type="button" className="home__user__btn">
								<span>John</span>
								<span>$90</span>
							</button>
						</li>

						<li>
							<button type="button" className="home__user__btn">
								<span>Mark</span>
								<span>$20</span>
							</button>
						</li>

						<li>
							<button type="button" className="home__user__btn">
								<span>Loffen</span>
								<span>$26</span>
							</button>
						</li>

						<li>
							<button type="button" className="home__user__btn">
								<span>Bernt</span>
								<span>$120</span>
							</button>
						</li>
					</ul>
				</div>
			)}
		</main>
	);
};

export default Home;
