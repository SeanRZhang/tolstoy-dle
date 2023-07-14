import "./App.css";
import Board from "./Components/Board";
import Keyboard from "./Components/Keyboard";
import React, { useState, createContext, useEffect } from "react";
import { boardDefault, generateWordSet } from "./Words";

export const AppContext = createContext();
function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({
    attempt: 0,
    letterPosition: 0,
  });
  const [disabledLetters, setDisabledLetters] = useState([]);
  const onLetter = (key) => {
    if (currAttempt.letterPosition > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPosition] = key;
    setBoard(newBoard);
    setCurrAttempt({
      ...currAttempt,
      letterPosition: currAttempt.letterPosition + 1,
    });
  };
  const onEnter = () => {
    if (currAttempt.letterPosition !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }
    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPosition: 0 });
    } else {
      alert("WORD NOT FOUND");
    }

    if (currWord === correctWord) {
      alert("END");
    }
  };
  const onDelete = () => {
    if (currAttempt.letterPosition === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPosition - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({
      ...currAttempt,
      letterPosition: currAttempt.letterPosition - 1,
    });
  };

  const correctWord = "RIGHT";

  const [wordSet, setWordSet] = useState(new Set());

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
    });
  }, []);

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          onLetter,
          onEnter,
          onDelete,
          correctWord,
          disabledLetters,
          setDisabledLetters,
        }}
      >
        <div className="game">
          <Board />
          <Keyboard />
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
