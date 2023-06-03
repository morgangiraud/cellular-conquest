import { NB_UPDATE_PER_TURN } from "@/constants";
import React from "react";

const DashedLine = ({
  length = 100,
  strokeWidth = 2,
  strokeColor = "black",
  fillPercentage,
}: {
  length?: number;
  strokeWidth?: number;
  strokeColor?: string;
  fillPercentage: number;
}) => {
  const dashArray = NB_UPDATE_PER_TURN;
  const dashOffset = length * fillPercentage;

  return (
    <svg
      className="absolute w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
    >
      <line
        x1="0"
        y1="0"
        x2="100"
        y2="4"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        // strokeLinecap="round"
        strokeDasharray={dashArray}
        strokeDashoffset={dashOffset}
      />
    </svg>
  );
};

export default DashedLine;
