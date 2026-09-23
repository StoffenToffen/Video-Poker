import { useState } from "react";
import { useNavigate } from "react-router-dom";
import arrowIcon from "../assets/arrow.svg";
import { useGameStore } from "../zustand/gameStore";

import "./HomePage.css";

const Home = () => {
	const [showLogin, setShowLogin] = useState(false);
	const [error, setError] = useState("");

	const players = useGameStore((state) => state.players);
	const setCurrentPlayer = useGameStore((state) => state.setCurrentPlayer);
	const register = useGameStore((state) => state.register);

	const navigate = useNavigate();

	/**
	 * @description checks the username from the form and either throws an error, or creates and signs in the user
	 * @param formData as a username
	 */
	const registerUser = (formData: FormData) => {
		const username = String(formData.get("username"));

		if (players.find((player) => player.name === username))
			return setError("A user with the same name already exists");
		else {
			register(username);
			navigate("/rules");
		}
	};

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
					<form action={registerUser}>
						<label htmlFor="username" className="home__label">
							Register new account
							<div className="home__input-wrapper">
								<input
									type="text"
									id="username"
									name="username"
									autoComplete="username"
									minLength={2}
									maxLength={20}
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

						<div className="home__error">{error}</div>
					</form>

					<div className="home__divider">
						<span className="home__divider__line" />
						<span>or</span>
						<span className="home__divider__line" />
					</div>

					<span className="home__subtext">Pick an existing user</span>

					{players.length ? (
						<ul className="home__users">
							{players.map((player) => (
								<li key={player.name}>
									<button
										type="button"
										onClick={() => {
											setCurrentPlayer(player);
											navigate("/game");
										}}
										className="home__user__btn"
									>
										<span>{player.name}</span>
										<span>${player.balance}</span>
									</button>
								</li>
							))}
						</ul>
					) : (
						<span>No users yet</span>
					)}
				</div>
			)}
		</main>
	);
};

export default Home;
