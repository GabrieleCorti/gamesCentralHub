import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { games } from "../../secretData/games";
import mySvg from "../../static/svg/alien.svg";
import "./style.css";

const CURRENT_VERSION = 2.0;

const Home: React.FC = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const version = localStorage.getItem("version");
    const isPlayer = localStorage.getItem("player");
    if (isPlayer && version === String(CURRENT_VERSION)) {
      navigate("games");
    } else {
      localStorage.clear();
    }
  }, [navigate]);

  const startGame = useCallback(() => {
    if (name) {
      localStorage.setItem("version", JSON.stringify(CURRENT_VERSION));
      localStorage.setItem("player", JSON.stringify(name));
      localStorage.setItem("gamesState", JSON.stringify(games));
      navigate("games");
    }
  }, [name, navigate]);

  return (
    <div className="login">
      <div className="flex_wrapper_column relative">
        <div className="logo">
          <img src={mySvg} alt="alieno simpatico" />
        </div>
        <div className="login_action prymary-shadow prymary-b-radius prymary-background active marginB2rem">
          <div className="title-container">
            <h1 className="login_wrapper_title">Ciao ado!</h1>
            <h3 className="start-game titleLight">
              Scrivi il tuo nome per iniziare a giocare
            </h3>
          </div>
          <div className="prymary-input_wrapper prymary-item prymary-b-radius">
            <input
              type="text"
              name="name"
              id="name"
              className="prymary-item prymary-input"
              onChange={({ target: { value } }) => setName(value)}
              value={name}
              placeholder={"Il mio nome è..."}
            />
          </div>
        </div>
        <button
          disabled={name.length < 3}
          type="button"
          className={
            "prymary-item prymary-b-radius item-padding titleLight primary-buton" +
            (name.length >= 3 ? " active" : "")
          }
          onClick={startGame}
        >
          Inizia a gicoare
        </button>
      </div>
    </div>
  );
};

export default Home;
