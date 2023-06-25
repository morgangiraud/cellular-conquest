import React from "react";
import { CellState, Diff, Territory } from "@/constants";

import CellView from "./CellView";
import { Cell } from "@/Game";

interface LegendItem {
  cells: Cell[];
  diffs: Diff[];
  canInteract: boolean;
  isFortress?: boolean;
  text: string;
}

const LegendItem = ({
  cells,
  diffs,
  canInteract,
  isFortress,
  text,
}: LegendItem) => (
  <div className="flex items-center my-1">
    {cells.map((cell, i) => (
      <CellView
        key={i}
        cell={cell}
        diff={diffs[i]}
        canInteract={canInteract}
        isFortress={isFortress}
        onClick={() => false}
      />
    ))}

    <p className="ml-2">{text}</p>
  </div>
);

const legendElements: LegendItem[] = [
  {
    cells: [new Cell(CellState.EMPTY, Territory.EMPTY)],
    diffs: [[0, CellState.EMPTY]],
    canInteract: false,
    isFortress: false,
    text: "Empty cell",
  },
  {
    cells: [
      new Cell(CellState.A, Territory.A),
      new Cell(CellState.B, Territory.B),
    ],
    diffs: [
      [0, CellState.EMPTY],
      [0, CellState.EMPTY],
    ],
    canInteract: true,
    isFortress: false,
    text: "User A/B cell (you can play here)",
  },

  {
    cells: [
      new Cell(CellState.EMPTY, Territory.A),
      new Cell(CellState.EMPTY, Territory.B),
    ],
    diffs: [
      [0, CellState.EMPTY],
      [0, CellState.EMPTY],
    ],
    canInteract: true,
    isFortress: false,
    text: "User A/B territory (you can play here)",
  },
  {
    cells: [
      new Cell(CellState.A, Territory.A),
      new Cell(CellState.B, Territory.B),
    ],
    diffs: [
      [-1, CellState.EMPTY],
      [-1, CellState.EMPTY],
    ],
    canInteract: false,
    isFortress: false,
    text: "User cell about to disappear",
  },
  {
    cells: [
      new Cell(CellState.EMPTY, Territory.A),
      new Cell(CellState.EMPTY, Territory.B),
    ],
    diffs: [
      [1, CellState.A],
      [1, CellState.B],
    ],
    canInteract: false,
    isFortress: false,
    text: "User cell about to appear",
  },
  {
    cells: [
      new Cell(CellState.A, Territory.A),
      new Cell(CellState.B, Territory.B),
    ],
    diffs: [
      [0, CellState.A],
      [0, CellState.B],
    ],
    canInteract: false,
    isFortress: true,
    text: "User fortresses",
  },
];

const Legend = () => {
  return (
    <div className="max-w-sm md:max-w-md lg:max-w-lg mx-auto  p-4 bg-white shadow rounded">
      <h3 className="text-center text-lg font-semibold mb-2">Legend</h3>
      {legendElements.map((el, i) => (
        <LegendItem
          key={i}
          cells={el.cells}
          diffs={el.diffs}
          canInteract={el.canInteract}
          isFortress={el.isFortress}
          text={el.text}
        />
      ))}
    </div>
  );
};

export default Legend;
