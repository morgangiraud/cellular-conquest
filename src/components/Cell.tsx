import React, { useState } from "react";

import { CellState } from "@/constants";
import { Fort } from "@/svgs/fort";

interface CellProps {
  state: CellState;
  canInteract: boolean;
  isFortress?: boolean;
  onClick: () => boolean;
}

const Cell = ({
  state,
  canInteract,
  isFortress = false,
  onClick,
}: CellProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  // Required to ensure tailwindcss does not purge thhttps://static.vecteezy.com/system/resources/previews/000/627/847/original/castle-icon-symbol-sign-vector.jpge classes
  let color = "";
  switch (state) {
    case CellState.A:
      color = "cell-a";
      break;
    case CellState.B:
      color = "cell-b";
      break;
    case CellState.EMPTY:
      color = "cell-empty";
      break;
    default:
      break;
  }

  const handleClick = () => {
    const maximumReached = onClick();
    if (maximumReached) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    } else {
      setIsBouncing(true);
      setTimeout(() => setIsBouncing(false), 300);
    }
  };

  return (
    <div
      className={`w-6 h-6 border border-black bg-${color} ${
        canInteract
          ? `cursor-pointer hover:border-${color} hover:scale-125 ${
              isBouncing ? "animate-bounce" : ""
            }`
          : "cursor-not-allowed"
      }`}
      onClick={handleClick}
    >
      {isFortress && <Fort />}
      {showTooltip && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-48 p-2 bg-black text-white text-xs rounded">
          Maximum 3 squares can be selected. Unselect a square first.
        </div>
      )}
    </div>
  );
};

export default Cell;
