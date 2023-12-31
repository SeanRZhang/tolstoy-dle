import "./App.css";
import Board from "./Components/Board";
import Keyboard from "./Components/Keyboard";
import React, { useState, createContext, useEffect } from "react";
import { boardDefault, generateWordSet } from "./Words";
import GameOver from "./Components/GameOver";
import TextHover from "./Components/TextHover";

export const AppContext = createContext();
function App() {
  const [correctWord, setCorrectWord] = useState("");
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({
    attempt: 0,
    letterPosition: 0,
  });
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });
  const [isHovered, setIsHovered] = useState(false);
  const [displayText, setDisplayText] = useState("TOLSTOY-DLE");

  const onLetter = (key) => {
    if (currAttempt.letterPosition > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPosition] = key;
    newBoard[currAttempt.attempt][currAttempt.letterPosition + 1] = (
      <span className="blinking-cursor">_</span>
    );
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
      if (currAttempt.attempt < 5) {
        const newBoard = [...board];
        newBoard[currAttempt.attempt + 1][0] = (
          <span className="blinking-cursor">_</span>
        );
        setBoard(newBoard);
      }
      if (currWord === correctWord.toUpperCase()) {
        setGameOver({ gameOver: true, guessedWord: true });
        if (currAttempt.attempt < 5) {
          const newBoard = [...board];
          newBoard[currAttempt.attempt + 1][0] = "";
          setBoard(newBoard);
        }
        return;
      } else if (currAttempt.attempt === 5) {
        setGameOver({ gameOver: true, guessedWord: false });
      }
    } else {
      alert("WORD NOT FOUND");
    }
  };

  const onDelete = () => {
    if (currAttempt.letterPosition === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPosition] = "";
    newBoard[currAttempt.attempt][currAttempt.letterPosition - 1] = (
      <span className="blinking-cursor">_</span>
    );
    setBoard(newBoard);
    setCurrAttempt({
      ...currAttempt,
      letterPosition: currAttempt.letterPosition - 1,
    });
  };

  const [wordSet, setWordSet] = useState(new Set());

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.newWord);
    });
  }, []);

  return (
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
        setGameOver,
        gameOver,
        isHovered,
        setIsHovered,
        displayText,
        setDisplayText,
      }}
    >
      <div className="App">
        <nav>
          <h1>
            <TextHover
              originalText="TOLSTOY-DLE"
              hoveredText="PLAY-AGAIN?"
              refresh
            />
          </h1>
        </nav>
        <div className="game">
          <div className="vertical-text-left">
            A version of Wordle featuring words from Leo Tolstoy's War and Peace
            and Anna Karenina (proper nouns included)
          </div>
          <div className="vertical-text-right">
            Some mathematician has said that pleasure lies not in discovering
            truth, but in searching for it -Anna Karenina
          </div>
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
