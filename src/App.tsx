import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Game from "./pages/Game";
import Home from "./pages/Home";
import Rules from "./pages/Rules";

import "./App.css";

function App() {
	return (
		<Router>
			<Link to="/">Home</Link>
			<Link to="/rules">Rules</Link>
			<Link to="/game">Game</Link>

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/rules" element={<Rules />} />
				<Route path="/game" element={<Game />} />
			</Routes>
		</Router>
	);
}

export default App;
