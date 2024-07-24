interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const Button = ({
  children,
  className,
  type = "button",
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`px-4 py-2 bg-primary bg-opacity-10 text-primary rounded-sm hover:bg-opacity-40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${className} transition-all duration-200 font-bold text-lg`}
    >
      {children}
    </button>
  );
};

export default Button;
