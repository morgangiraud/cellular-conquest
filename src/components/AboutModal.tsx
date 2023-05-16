import { useState } from "react";

import Button from "@/components/Button";
import { NB_UPDATE_PER_TURN } from "@/constants";

export default function AboutModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button
        className="mx-auto"
        variant="contained"
        color="primary"
        onClick={() => setIsOpen(true)}
      >
        About
      </Button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setIsOpen(false)}
          />

          <div className="bg-white p-6 rounded shadow-lg max-w-md max-h-[80%] overflow-auto w-full mx-auto z-10">
            <h2 className="text-xl font-bold mb-3">Game mechanics</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li className="text-lg">
                The game accommodates two players, referred to as Player A and
                Player B.
              </li>
              <li className="text-lg">
                Each cell in the game can exist in one of three states: empty,
                occupied by Player A (marked as &apos;a&apos;), or occupied by
                Player B (marked as &apos;b&apos;).
              </li>
              <li className="text-lg">
                The transitions of the cells follow the rules of Conway&apos;s
                Game of Life, where &apos;a&apos; and &apos;b&apos; represent
                live cells. When a new cell is born, its type is determined by
                the majority of its neighboring cells.
              </li>
              <li className="text-lg">
                The game grid is divided into two territories, each serving as
                the &apos;country&apos; for one player. Within each country,
                there is a designated area known as the &apos;fortress&apos;.
              </li>
              <li className="text-lg">
                Each turn, both players are allowed to modify the state of up to
                three cells within their respective countries. After these
                modifications, the game evolves naturally for{" "}
                {NB_UPDATE_PER_TURN} iterations according to the rules of
                cellular automata.
              </li>
              <li className="text-lg">
                The ultimate objective is to infiltrate the opponent&apos;s
                fortress. The first player to successfully place a cell within
                the fortress of the opposing player is declared the winner.
              </li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
