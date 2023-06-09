import * as React from "react";

export const DashedCircle = ({
  className,
  color,
}: {
  className?: string;
  color: string;
}) => {
  return (
    <svg
      className={`absolute w-full h-full ${className}`}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="transparent"
        stroke={color}
        strokeDasharray="10"
        strokeWidth="8%"
      />
    </svg>
  );
};
