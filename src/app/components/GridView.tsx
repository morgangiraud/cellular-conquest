"use client";

import React from "react";

import { useGameData } from "@/app/GameContext";
import { CellState, Diff, Territory } from "@/constants";
import CellView from "./CellView";

const GridView = () => {
  const { size, cells, handleCellClick, fortressCfg, player, nextDiffMap } =
    useGameData();

  if (!cells) return null;
  return (
    <div className={`grid grid-cols-${size} gap-0`}>
      {cells.map((cellsRow, rowIdx) => (
        <div key={rowIdx} className="flex mx-auto">
          {cellsRow.map((cell, colIdx) => {
            const isFortress =
              fortressCfg &&
              (fortressCfg.a.x === colIdx || fortressCfg.b.x === colIdx) &&
              (fortressCfg.a.y === rowIdx || fortressCfg.b.y === rowIdx);

            const canInteract =
              (player === CellState.A &&
                [Territory.A, Territory.AB].indexOf(cell.territory) !== -1) ||
              (player === CellState.B &&
                [Territory.B, Territory.AB].indexOf(cell.territory) !== -1);

            const nextDiff: Diff = nextDiffMap
              ? nextDiffMap[rowIdx][colIdx]
              : [0, CellState.EMPTY];

            return (
              <CellView
                key={colIdx}
                cell={cell}
                diff={nextDiff}
                canInteract={canInteract}
                isFortress={isFortress}
                onClick={() => canInteract && handleCellClick(rowIdx, colIdx)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default GridView;
