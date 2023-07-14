import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

function TextHover({ originalText, hoveredText, refresh }) {
  const { isHovered, setIsHovered, displayText, setDisplayText } =
    useContext(AppContext);
  const handleMouseEnter = () => {
    setIsHovered(true);
    setDisplayText("AGAIN?");
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setDisplayText("WORDLE");
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
