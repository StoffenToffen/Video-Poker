import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import GamePage from "./pages/GamePage";
import HomePage from "./pages/HomePage";
import RulesPage from "./pages/RulesPage";

import "./App.css";

function App() {
	return (
		<Router>
			<Link to="/">Home</Link>
			<Link to="/rules">Rules</Link>
			<Link to="/game">Game</Link>

			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/rules" element={<RulesPage />} />
				<Route path="/game" element={<GamePage />} />
			</Routes>
		</Router>
	);
}

export default App;
