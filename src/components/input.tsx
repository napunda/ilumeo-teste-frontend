import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface InputProps {
  name: string;
  label: string;
  register: any;
  required?: string;
  type?: string;
  error?: { message: string };
}

export const Input: React.FC<InputProps> = ({
  name,
  label,
  register,
  required,
  type = "text",
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4 bg-secondary-200 rounded-sm py-1.5 px-4 relative">
      <label htmlFor={name} className="block text-xs font-light text-white">
        {label}
      </label>
      <input
        id={name}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        {...register(name, { required })}
        className="block w-full text-white shadow-sm bg-secondary-200 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg font-bold pr-10"
      />
      {type === "password" && (
        <button
          type="button"
          onClick={handleTogglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          {showPassword ? (
            <EyeOffIcon className="w-5 h-5 text-gray-500" />
          ) : (
            <EyeIcon className="w-5 h-5 text-gray-500" />
          )}
        </button>
      )}
      {error && <p className="my-2 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};
