import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import mySvg from "../../static/svg/sad.svg";

const Logout = () => {
  const navigation = useNavigate();
  const logout = useCallback(() => {
    localStorage.removeItem("gamesState");
    localStorage.removeItem("player");
    navigation("/", { replace: true });
  }, [navigation]);

  return (
    <div className="logout">
      <div className="login_action prymary-shadow prymary-b-radius prymary-background active marginB2rem logout_title relative">
        <div className="logo">
          <img src={mySvg} alt="alieno simpatico" />
        </div>
        <h1 className="small">Vuoi davvero uscire</h1>
      </div>
      <div className="action_wrapper">
        <button
          onClick={logout}
          className="exit-btn-yes [ prymary-item prymary-b-radius item-padding titleLight ]"
        >
          si
        </button>
        <button
          onClick={() => navigation("/games", { replace: true })}
          className="exit-btn-no [ prymary-item prymary-b-radius item-padding titleLight ]"
        >
          no
        </button>
      </div>
    </div>
  );
};

export default Logout;
