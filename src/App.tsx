import { Route, Routes } from "react-router-dom";
import DonePage from "./pages/done-screen";
import GameList from "./pages/game-list";
import Home from "./pages/home";
import Logout from "./pages/logout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="games" element={<GameList />} />
        <Route path="games">
          <Route path=":id" element={<DonePage />} />
        </Route>
        <Route path="logout" element={<Logout />} />
      </Routes>
    </div>
  );
}

export default App;
