import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

const GameList: React.FC = () => {
  const navigation = useNavigate();
  const [player, setPlayer] = useState("");
  const [games, setGames] = useState<
    {
      id: number;
      name: string;
      done: boolean;
    }[]
  >([]);
  useEffect(() => {
    const player = localStorage.getItem("player");
    if (!player) {
      navigation("/");
    } else {
      const gameState = localStorage.getItem("gamesState");
      setPlayer(player);
      //console.log(gameState);
      setGames(gameState ? JSON.parse(gameState) : []);
    }
  }, [navigation]);
  const doneGmaesNumber = useMemo(
    () => games.filter((e) => e.done).length,
    [games]
  );
  return (
    <div className="game-list">
      <div className="login_action prymary-shadow prymary-b-radius prymary-background active marginB2rem item-padding">
        <div className="game-info">
          <h3 className="label">Giocatore</h3>
          <h2>{player}</h2>
        </div>
        <div>
          <h3 className="label">Giochi completati</h3>
          <h2>{`${doneGmaesNumber} / ${games.length}`}</h2>
        </div>
      </div>
      <ul className="game-item-list">
        {games.map(({ done, id, name }) => (
          <li key={id} className="game-item">
            <Link to={`${id}`} style={{ textDecoration: "none" }}>
              <div
                className={`[ prymary-item prymary-b-radius item-padding ${
                  done ? "active" : ""
                } ] name-wrapper`}
              >
                <p className="[ titleLight ] game-name">{name}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <Link to={"/logout"} className="link-logut" replace>
          {"<< Logout"}
        </Link>
      </div>
    </div>
  );
};

export default GameList;
