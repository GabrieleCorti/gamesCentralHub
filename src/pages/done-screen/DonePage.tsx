import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { passwords } from "../../secretData/games";
import mySvg from "../../static/svg/lock.svg";
import "./style.css";

const DonePage: React.FC = () => {
  let { id } = useParams();

  const navigation = useNavigate();
  const [games, setGames] = useState<
    {
      id: number;
      name: string;
      done: boolean;
    }[]
  >([]);
  const [passwordValue, setPasswordValue] = useState<{
    firstPart: string;
    secondPart: string;
  }>({
    firstPart: "",
    secondPart: "",
  });
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const player = localStorage.getItem("player");
    if (!player || !id) {
      navigation("/");
    } else {
      const gameState = localStorage.getItem("gamesState");
      console.log(gameState);
      setGames(gameState ? JSON.parse(gameState) : []);
    }
  }, [id, navigation]);
  const onClick = useCallback(() => {
    const password = passwords.find((e) => e.id === Number(id));
    if (!password) {
      alert("Questo gioco non esiste");
      navigation("/games", { replace: true });
      return;
    }
    const _games = [...games];
    const index = _games.findIndex((g) => g.id === Number(id));
    if (index !== -1) {
      if (
        password.firstPart === passwordValue.firstPart &&
        password.secondPart === passwordValue.secondPart
      ) {
        setIsError(false);
        games[index] = { ...games[index], done: true };
        localStorage.removeItem("gamesState");
        localStorage.setItem("gamesState", JSON.stringify(games));
        navigation("/games", { replace: true });
      } else {
        setIsError(true);
      }
    } else {
      alert("Questo gioco non esiste!");
      navigation("/games", { replace: true });
    }
  }, [
    games,
    id,
    navigation,
    passwordValue.firstPart,
    passwordValue.secondPart,
  ]);

  return (
    <div className="done-page">
      <div className="[ login_action prymary-shadow prymary-b-radius prymary-background active relative ]">
        <div className="logo">
          <img src={mySvg} alt="alieno simpatico" />
        </div>
        <div className="[ title-container ] done-title">
          <h1 className="small">Inserisci le password</h1>
        </div>
        <div className="input-container">
          <div className="[ prymary-input_wrapper prymary-item prymary-b-radius ] first-done-input">
            <input
              type="password"
              name="factor-one"
              id="factor-one"
              placeholder="Prima password..."
              className="prymary-item prymary-input"
              value={passwordValue.firstPart}
              onChange={({ target: { value: firstPart } }) =>
                setPasswordValue((prev) => ({ ...prev, firstPart }))
              }
            />
          </div>
          <div className="prymary-input_wrapper prymary-item prymary-b-radius">
            <input
              type="password"
              name="factor-two"
              id="factor-two"
              placeholder="Seconda password..."
              className="prymary-item prymary-input"
              value={passwordValue.secondPart}
              onChange={({ target: { value: secondPart } }) =>
                setPasswordValue((prev) => ({ ...prev, secondPart }))
              }
            />
          </div>
        </div>
      </div>
      {isError && (
        <div className="error-wrapper">
          <p className="error">* Una delle password è errata</p>
        </div>
      )}
      <button
        type="button"
        className={
          "done-btn [ prymary-item prymary-b-radius item-padding titleLight primary-buton" +
          (passwordValue.firstPart !== "" && passwordValue.secondPart !== ""
            ? " active ]"
            : " ]")
        }
        onClick={onClick}
        disabled={
          passwordValue.firstPart === "" || passwordValue.secondPart === ""
        }
      >
        conferma vittoria
      </button>
      <div className="back-wrapper">
        <Link to={"/games"} className="link-logut" replace>
          {"<< Go back"}
        </Link>
      </div>
    </div>
  );
};

export default DonePage;
