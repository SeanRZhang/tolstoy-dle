import React, { useContext } from "react";
import { AppContext } from "../App";

function Letter({ letterPosition, attemptVal }) {
  const { board, correctWord, currAttempt } = useContext(AppContext);
  const letter = board[attemptVal][letterPosition];

  const correct = correctWord[letterPosition] === letter;
  const almost = !correct && letter !== "" && correctWord.includes(letter);
  const letterState =
    currAttempt.attempt > attemptVal &&
    (correct ? "correct" : almost ? "almost" : "error");

  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
}

export default Letter;
