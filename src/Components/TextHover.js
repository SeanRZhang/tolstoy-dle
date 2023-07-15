import React, { useContext, useEffect, useRef } from "react";
import { AppContext } from "../App";

function TextHover({ originalText, hoveredText, refresh }) {
  const { isHovered, setIsHovered, displayText, setDisplayText } =
    useContext(AppContext);

  useEffect(() => {
    spanRef.current = document.querySelector(".shuffle-text");
  }, []);

  const spanRef = useRef(null);
  let intervalId;

  const startShuffle = (targetText) => {
    const letters = targetText.split("");

    let counter = 0;
    const shuffleCount = 3;
    const shuffleInterval = 48;

    intervalId = setInterval(() => {
      const shuffledText = letters
        .map((char, index) => {
          if (char.match(/[a-zA-Z0-9?]/)) {
            const randomCharacter = getRandomCharacter();
            const cyclesToRevert = index - Math.floor(counter / shuffleCount);
            if (counter >= cyclesToRevert * shuffleCount) {
              return targetText[index];
            }
            return randomCharacter;
          }
          return char;
        })
        .join("");

      spanRef.current.textContent = shuffledText;

      counter++;
      if (counter >= shuffleCount * letters.length) {
        clearInterval(intervalId);
        spanRef.current.textContent = targetText;
      }
    }, shuffleInterval);
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function getRandomCharacter() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789?!/";
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  }

  const handleMouseEnter = () => {
    setIsHovered(true);
    clearInterval(intervalId);
    startShuffle(hoveredText);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    clearInterval(intervalId);
    startShuffle(originalText);
  };

  const handleRefresh = () => {
    refresh && window.location.reload();
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <span
        className="shuffle-text"
        onClick={handleRefresh}
        style={refresh ? { cursor: "pointer" } : { cursor: "default" }}
      >
        {displayText}
      </span>
    </div>
  );
}

export default TextHover;
