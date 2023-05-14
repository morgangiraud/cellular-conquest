interface ButtonProps {
  variant?: string;
  color?: string;
  onClick: () => void;
  children: React.ReactNode;
}

const Button = ({ variant, color, onClick, children }: ButtonProps) => (
  <button
    className={`px-4 py-2 rounded ${
      variant === "contained"
        ? "bg-blue-500 text-white"
        : "border border-blue-500 text-blue-500"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
