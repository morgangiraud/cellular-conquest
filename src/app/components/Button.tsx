"use client";

import { GameState } from "@/constants";
import { useState } from "react";

interface ButtonProps {
  className?: string;
  variant?: string;
  gameState?: GameState;
  onClick: () => void;
  children: React.ReactNode;
}

const Button = ({
  variant,
  gameState,
  onClick,
  children,
  className = "",
}: ButtonProps) => {
  const [pop, setPop] = useState(false);

  const animate = () => {
    setPop(true);
    setTimeout(() => setPop(false), 200);
  };

  const animation = "focus:outline-none animate-pop";

  return (
    <button
      className={`px-4 py-2 my-2 rounded ${pop ? animation : ""} ${className} ${
        gameState ? `bg-cell-${gameState}` : "bg-other text-white"
      }`}
      onClick={() => {
        animate();
        onClick();
      }}
    >
      {children}
    </button>
  );
};
export default Button;
