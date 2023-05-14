// Grid.tsx

import React from "react";

import Row from "./Row";
import { CellState } from "@/constants";

interface GridViewProps {
  size: number;
  cells: CellState[][] | undefined;

  onCellClick: (i: number, j: number) => boolean;
}

const GridView = ({ size, cells, onCellClick }: GridViewProps) => {
  if (!cells) return null;
  return (
    <div className={`grid grid-cols-${size} gap-0`}>
      {cells.map((row, rowIndex) => (
        <Row
          key={rowIndex}
          row={row}
          rowIndex={rowIndex}
          onCellClick={onCellClick}
        />
      ))}
    </div>
  );
};

export default GridView;
