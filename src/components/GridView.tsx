// Grid.tsx

import React from "react";

import Row from "./Row";
import { useGameData } from "@/GameContext";

const GridView = () => {
  const { size, cells, handleCellClick } = useGameData();

  if (!cells) return null;
  return (
    <div className={`grid grid-cols-${size} gap-0`}>
      {cells.map((cellsRow, rowIndex) => (
        <Row
          key={rowIndex}
          cellsRow={cellsRow}
          rowIndex={rowIndex}
          onCellClick={handleCellClick}
        />
      ))}
    </div>
  );
};

export default GridView;
