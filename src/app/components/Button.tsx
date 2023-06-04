"use client";

import { GameState } from "@/constants";
import { useState } from "react";

interface ButtonProps {
  variant?: string;
  gameState?: GameState;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
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

  let classes: string;
  if (variant === "contained") {
    classes = `px-4 py-2 my-2 rounded ${pop ? animation : ""} ${className} ${
      gameState ? `bg-cell-${gameState}` : "bg-other text-white"
    }`;
  } else {
    classes = `w-full flex justify-center px-4 py-2 my-2 rounded ${
      pop ? animation : ""
    } ${className} ${
      gameState ? `bg-cell-${gameState}` : "bg-other text-white"
    }`;
  }

  return (
    <button
      className={classes}
      onClick={() => {
        animate();
        onClick && onClick();
      }}
    >
      {children}
    </button>
  );
};
export default Button;
