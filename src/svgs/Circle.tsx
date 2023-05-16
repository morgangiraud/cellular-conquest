import * as React from "react";

export const Circle = ({ color }: { color: string }) => {
  return (
    <svg
      className="absolute w-full h-full"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="transparent"
        stroke={color}
        strokeWidth="8%"
      />
    </svg>
  );
};
