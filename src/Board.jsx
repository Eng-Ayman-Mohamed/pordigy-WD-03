import React, { useEffect, useState } from "react";
import "./App.css";

const Board = () => {
  const playedInitialState = {
    btn_1: false,
    btn_2: false,
    btn_3: false,
    btn_4: false,
    btn_5: false,
    btn_6: false,
    btn_7: false,
    btn_8: false,
    btn_9: false,
  };
  const textInitialState = {
    btn_1: "",
    btn_2: "",
    btn_3: "",
    btn_4: "",
    btn_5: "",
    btn_6: "",
    btn_7: "",
    btn_8: "",
    btn_9: "",
  };
  const [played, setPlayed] = useState(playedInitialState);
  const [text, setText] = useState(textInitialState);
  const [player, setPlayer] = useState(true);
  const [error, setError] = useState("");
  const [roundWon, setRoundWon] = useState(false);
  const [draw, setDraw] = useState(false);
  const [computer, setComputer] = useState(false);

  const HandleChange = (e) => {
    const name = e.target.name;
    //if button is not displayed make the action
    if (!played[name] && !roundWon) {
      if (player) {
        setText((prevText) => ({
          ...prevText,
          [name]: "X",
        }));
      } else {
        setText((prevText) => ({
          ...prevText,
          [name]: "O",
        }));
      }
      // display button
      setPlayed((prevPlayed) => ({
        ...prevPlayed,
        [name]: true,
      }));
      setPlayer(!player);
    } else {
      setError("This place is fill already");
    }
  };

  const play = async () => {
    if (roundWon) {
      return;
    }
    let number;
    let count = 0;
    do {
      number = Math.floor(Math.random() * 9) + 1;
      count++;
      if (count > 9) {
        return;
      }
    } while (text[`btn_${number}`] !== "");
    const t = "btn_" + number;
    setText((prevText) => ({
      ...prevText,
      [t]: "O",
    }));
    setPlayed((prevPlayed) => ({
      ...prevPlayed,
      [t]: true,
    }));
    if (!roundWon) {
      setPlayer(true);
    }
  };

  useEffect(() => {
    if (!player && !roundWon && !draw && computer) {
      play();
    }
  }, [player, roundWon, draw, computer]);

  useEffect(() => {
    const winningConditions = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      const t1 = "btn_" + winCondition[0];
      const t2 = "btn_" + winCondition[1];
      const t3 = "btn_" + winCondition[2];
      let a = text[t1];
      let b = text[t2];
      let c = text[t3];
      if (a === "" || b === "" || c === "") {
        continue;
      }
      if (a === b && b === c) {
        setRoundWon(true);
        setError("Game Finished");
        break;
      }
    }

    for (let i = 0; i < 10; i++) {
      const t1 = "btn_" + i;
      if (text[t1] === "") return;
    }
    setRoundWon(true);
    setDraw(true);
  }, [roundWon, text]);

  const reload = () => {
    setPlayer(true);
    setComputer(false);
    setText(textInitialState);
    setPlayed(playedInitialState);
    setError("");
    setDraw(false);
    setRoundWon(false);
  };
  const computer_handler = () => {
    setPlayer(true);
    setComputer(true);
    setText(textInitialState);
    setPlayed(playedInitialState);
    setError("");
    setDraw(false);
    setRoundWon(false);
  };

  return (
    <div className="board_container">
      {player ? (
        <h2>player 1 </h2>
      ) : computer ? (
        <h2>Computer </h2>
      ) : (
        <h2>player 2</h2>
      )}

      <div className="btn_container">
        <button
          style={{ borderWidth: "2px" }}
          className="board_btn"
          name="btn_1"
          onClick={HandleChange}
        >
          {text.btn_1}
        </button>
        <button className="board_btn" name="btn_2" onClick={HandleChange}>
          {text.btn_2}
        </button>
        <button className="board_btn" name="btn_3" onClick={HandleChange}>
          {text.btn_3}
        </button>
        <button className="board_btn" name="btn_4" onClick={HandleChange}>
          {text.btn_4}
        </button>
        <button className="board_btn" name="btn_5" onClick={HandleChange}>
          {text.btn_5}
        </button>
        <button className="board_btn" name="btn_6" onClick={HandleChange}>
          {text.btn_6}
        </button>
        <button className="board_btn" name="btn_7" onClick={HandleChange}>
          {text.btn_7}
        </button>
        <button className="board_btn" name="btn_8" onClick={HandleChange}>
          {text.btn_8}
        </button>
        <button className="board_btn" name="btn_9" onClick={HandleChange}>
          {text.btn_9}
        </button>
      </div>
      <p className="error">{error}</p>

      {roundWon ? (
        <div className="after_win">
          <div>
            {draw ? (
              <h2>Draw !</h2>
            ) : computer ? (
              !player ? (
                <h2>Computer Won</h2>
              ) : (
                <h2> player 1 won (X)</h2>
              )
            ) : !player ? (
              <h2>player 1 won (X)</h2>
            ) : (
              <h2>player 2 won (O)</h2>
            )}
          </div>
          <div style={{ display: "grid" }}>
            <button onClick={reload} className="play_btn">
              Play with friends
            </button>
            <button onClick={computer_handler} className="play_btn">
              Play with computer
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Board;
