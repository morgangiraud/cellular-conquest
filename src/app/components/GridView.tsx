"use client";

import React from "react";

import {
  CellState,
  Diff,
  Territory,
  GameState,
  fortressCfg,
  DiffMap,
} from "@/constants";
import CellView from "./CellView";
import { Cell } from "@/Game";

interface GridViewProps {
  size: number;
  fortressCfg: fortressCfg;
  gameState: GameState | undefined;
  cells: Cell[][] | undefined;
  nextDiffMap: DiffMap | undefined;
  handleCellClick: (i: number, j: number) => boolean;
}

const GridView = ({
  size,
  fortressCfg,
  gameState,
  cells,
  nextDiffMap,
  handleCellClick,
}: GridViewProps) => {
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
              (gameState === GameState.PLAYER_A &&
                [Territory.A, Territory.AB].indexOf(cell.territory) !== -1) ||
              (gameState === GameState.PLAYER_B &&
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
