import React, { useContext } from "react";
import { AppContext } from "../App";

function GameOver() {
  const { gameOver, setGameOver, currAttempt, correctWord } =
    useContext(AppContext);
  return (
    <div className="gameOver">
      <h3>{gameOver.guessedWord ? "Correct!" : "You Lose..."}</h3>
      <h1>{correctWord.toUpperCase()}</h1>
      {gameOver.guessedWord && <h2>Tries: {currAttempt.attempt}</h2>}
    </div>
  );
}

export default GameOver;
