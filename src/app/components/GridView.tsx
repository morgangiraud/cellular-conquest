"use client";

import React, { useState } from "react";

import {
  CellState,
  Diff,
  Territory,
  GameState,
  fortressCfg,
  DiffMap,
  NB_MAX_MOVES,
} from "@/constants";
import CellView from "./CellView";
import { Cell } from "@/Game";

interface GridViewProps {
  size: number;
  fortressCfg: fortressCfg;
  gameState: GameState | undefined;
  cells: Cell[][] | undefined;
  nextDiffMap: DiffMap | undefined;
  moves: [string[], string[]];
  handleCellClick: (i: number, j: number) => void;
}

const GridView = ({
  size,
  fortressCfg,
  gameState,
  cells,
  nextDiffMap,
  moves,
  handleCellClick,
}: GridViewProps) => {
  const [tooltipAnimateOut, setTooltipAnimateOut] = useState(false);
  const [tooltipPos, setTooltipPos] = useState<[number, number]>([0, 0]);
  const [showTooltip, setShowTooltip] = useState(false);

  if (!cells) return null;

  return (
    <>
      <div className={`grid grid-cols-${size} gap-0`}>
        {cells.map((cellsRow, rowIdx) => (
          <div key={rowIdx} className="flex mx-auto">
            {cellsRow.map((cell, colIdx) => {
              const isFortress =
                fortressCfg &&
                (fortressCfg.a.x === colIdx || fortressCfg.b.x === colIdx) &&
                (fortressCfg.a.y === rowIdx || fortressCfg.b.y === rowIdx);

              const currentPlayerMoves =
                moves[gameState === GameState.PLAYER_A ? 0 : 1];
              const maximumReached = currentPlayerMoves.length === NB_MAX_MOVES;

              let canInteract: boolean;
              if (maximumReached) {
                canInteract =
                  currentPlayerMoves.indexOf(`${rowIdx}-${colIdx}`) !== -1;
              } else {
                canInteract =
                  (gameState === GameState.PLAYER_A &&
                    [Territory.A, Territory.AB].indexOf(cell.territory) !==
                      -1) ||
                  (gameState === GameState.PLAYER_B &&
                    [Territory.B, Territory.AB].indexOf(cell.territory) !== -1);
              }

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
                  onClick={(ev) => {
                    if (canInteract) {
                      handleCellClick(rowIdx, colIdx);
                    } else if (maximumReached) {
                      setTooltipPos([ev.clientX, ev.clientY]);
                      setShowTooltip(true);
                      setTimeout(() => {
                        setTooltipAnimateOut(true);
                      }, 1000);
                    }
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>

      {showTooltip && (
        <div
          className={`absolute w-36 text-center p-1 bg-black text-white text-xs rounded transition-all transform translate-y-2 opacity-0 ${
            tooltipAnimateOut ? "animate-fadeOutUp" : "animate-fadeInDown"
          }`}
          style={{
            left: tooltipPos[0] - 18 * 4 + "px",
            top: tooltipPos[1] + "px",
          }}
          onAnimationEnd={() => {
            if (tooltipAnimateOut) {
              setTooltipAnimateOut(false);
              setShowTooltip(false);
            }
          }}
        >
          Maximum {NB_MAX_MOVES} modifications! Unselect a square first.
        </div>
      )}
    </>
  );
};

export default GridView;
