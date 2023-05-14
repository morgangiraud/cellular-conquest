// Row.tsx

import React from "react";
import CellView from "./CellView";

import { CellState, Territory } from "@/constants";
import { useGameData } from "@/GameContext";
import { Cell } from "@/Game";

interface RowProps {
  cellsRow: Cell[];
  rowIndex: number;

  onCellClick: (i: number, j: number) => boolean;
}

const Row = ({ cellsRow, rowIndex, onCellClick }: RowProps) => {
  const { fortressCfg, player } = useGameData();

  return (
    <div className="flex mx-auto">
      {cellsRow.map((cell, cellIndex) => {
        const isFortress =
          fortressCfg &&
          (fortressCfg.a.x === cellIndex || fortressCfg.b.x === cellIndex) &&
          (fortressCfg.a.y === rowIndex || fortressCfg.b.y === rowIndex);

        const canInteract =
          (player === CellState.A && cell.territory === Territory.A) ||
          (player === CellState.B && cell.territory === Territory.B);

        return (
          <CellView
            key={cellIndex}
            cell={cell}
            canInteract={canInteract}
            isFortress={isFortress}
            onClick={() => canInteract && onCellClick(rowIndex, cellIndex)}
          />
        );
      })}
    </div>
  );
};

export default Row;
