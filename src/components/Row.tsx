// Row.tsx

import React from "react";
import Cell from "./Cell";

import { CellState } from "@/constants";
import { useGameData } from "@/GameContext";

interface RowProps {
  row: CellState[];
  rowIndex: number;

  onCellClick: (i: number, j: number) => boolean;
}

const Row = ({ row, rowIndex, onCellClick }: RowProps) => {
  const { fortress, player } = useGameData();

  const canInteract =
    (player === CellState.A && rowIndex < row.length / 2) ||
    (player === CellState.B && rowIndex >= row.length / 2);

  return (
    <div className="flex mx-auto">
      {row.map((cell, cellIndex) => {
        const isFortress =
          fortress &&
          (fortress.a.x === cellIndex || fortress.b.x === cellIndex) &&
          (fortress.a.y === rowIndex || fortress.b.y === rowIndex);

        return (
          <Cell
            key={cellIndex}
            state={cell}
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
