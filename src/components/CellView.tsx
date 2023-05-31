import React, { useState } from "react";

import { CellState, Diff, NB_MAX_MOVES, Territory } from "@/constants";

import { Cell } from "@/Game";
import { classNames } from "@/utils";
import { DashedCircle } from "@/svgs/DashedCircle";
import { Circle } from "@/svgs/Circle";
import { Fort } from "@/svgs/Fort";

interface CellViewProps {
  cell: Cell;
  diff: Diff;
  canInteract: boolean;
  onClick: () => boolean;
  isFortress?: boolean;
  className?: string;
}

const CellView = ({
  cell,
  diff,
  canInteract,
  onClick,
  isFortress = false,
  className = "",
}: CellViewProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  const handleClick = () => {
    const maximumReached = onClick();
    if (maximumReached) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 1000);
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
    <>
      <div
        className={classNames(
          "w-6 h-6 border border-black relative items-center justify-center",
          bgClass,
          canInteract
            ? `cursor-pointer hover:border-cell-${
                cell.state
              } hover:scale-125 hover:z-10 ${
                isBouncing ? "animate-bounce" : ""
              }`
            : "cursor-not-allowed",
          diff[0] !== 0 ? `diff-${diff[1]}` : "",
          className
        )}
        onClick={handleClick}
      >
        {diff[0] === -1 && (
          <div className="absolute top-0 left-0 w-full h-full">
            <DashedCircle color="white" />
          </div>
        )}{" "}
        {diff[0] === 1 && (
          <div className="absolute top-0 left-0 w-full h-full">
            <Circle
              color={
                diff[1] === CellState.A ? "var(--cell-a)" : "var(--cell-b)"
              }
            />
          </div>
        )}
        {isFortress && (
          <div
            className={
              diff[0] === 0
                ? "absolute top-0 left-0 w-full h-full"
                : "absolute top-0.5 left-0 w-full h-4"
            }
          >
            <Fort />
          </div>
        )}
        {showTooltip && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-48 p-2 bg-black text-white text-xs rounded">
            Maximum {NB_MAX_MOVES} squares can be selected. Unselect a square
            first.
          </div>
        )}
      </div>
    </>
  );
};

export default CellView;
