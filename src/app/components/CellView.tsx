"use client";

import React, { MouseEventHandler, useState } from "react";

import { CellState, Diff, Territory } from "@/constants";

import { Cell } from "@/Game";
import { classNames } from "@/utils";
import { DashedCircle } from "@/app/svgs/DashedCircle";
import { Circle } from "@/app/svgs/Circle";
import { Fort } from "@/app/svgs/Fort";

interface CellViewProps {
  cell: Cell;
  diff: Diff;
  canInteract: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
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
  const [isBouncing, setIsBouncing] = useState(false);

  const handleClick: MouseEventHandler<HTMLDivElement> = (ev) => {
    onClick(ev);

    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 300);
  };

  let bgClass = `bg-cell-${cell.state}`;
  if (cell.state === CellState.EMPTY && cell.territory !== Territory.EMPTY) {
    bgClass = `bg-territory-${cell.territory}`;
  }

  return (
    <>
      <div
        className={classNames(
          "w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 border border-black relative items-center justify-center",
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
      </div>
    </>
  );
};

export default CellView;
