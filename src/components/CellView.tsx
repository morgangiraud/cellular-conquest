import React, { useState } from "react";

import { CellState, NB_MAX_MOVES, Territory } from "@/constants";
import { Fort } from "@/svgs/fort";
import { Cell } from "@/Game";

interface CellViewProps {
  cell: Cell;
  canInteract: boolean;
  isFortress?: boolean;
  onClick: () => boolean;
}

const CellView = ({
  cell,
  canInteract,
  isFortress = false,
  onClick,
}: CellViewProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

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

  let bgClass = `bg-cell-${cell.state}`;
  if (cell.state === CellState.EMPTY && cell.territory !== Territory.EMPTY) {
    bgClass = `bg-territory-${cell.territory}`;
  }

  return (
    <div
      className={`w-6 h-6 border border-black ${bgClass}  ${
        canInteract
          ? `cursor-pointer hover:border-cell-${cell.state} hover:scale-125 ${
              isBouncing ? "animate-bounce" : ""
            }`
          : "cursor-not-allowed"
      }`}
      onClick={handleClick}
    >
      {isFortress && <Fort />}
      {showTooltip && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-48 p-2 bg-black text-white text-xs rounded">
          Maximum {NB_MAX_MOVES} squares can be selected. Unselect a square
          first.
        </div>
      )}
    </div>
  );
};

export default CellView;
