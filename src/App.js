import react from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage";
import GameSettings from "./pages/gameSettings";
import Game from "./pages/game";

const App = () => {
  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game" element={<Game />} />
            <Route path="/game-settings" element={<GameSettings />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
