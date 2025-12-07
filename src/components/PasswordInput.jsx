import { useState } from "react";

/**
 * SVG Icons 
 */

// eye open icon (password visible)
const EyeOpenIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.6}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

// eye closed icon (password hidden)
const EyeClosedIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.6}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 3l18 18M10.477 10.477A3 3 0 0114.12 14.12M6.94 6.94C4.7 8.387 3.146 10.55 2.458 12c1.274 4.057 5.065 7 9.542 7 1.466 0 2.862-.263 4.152-.745M17.06 17.06A9.97 9.97 0 0021.542 12c-.66-2.101-2.214-4.263-4.454-5.71"
    />
  </svg>
);

/**
 * PasswordInput Component
 * 
 * A reusable input field with:
 * - eye toggle to show/hide password
 * - controlled input value + onChange handler
 * 
 * Props:
 * - value (string): current password string
 * - onChange (function): input change handler
 * - placeholder (string): placeholder text
 * - className (string): optional Tailwind classes
 * 
 * This component is used in:
 * - Change password form
 * - Delete account modal
 */

const PasswordInput = ({
  value,
  onChange,
  placeholder = "",
  className = "",
}) => {

  // tracks visibility (true = text shown, false = hidden)
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative w-full">

      {/* password field */}
      <input
        type={visible ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full border rounded px-3 py-2 pr-10 ${className}`}
      />

      {/* toggle visibility button */}
      <button
        type="button"
        onClick={() => setVisible(!visible)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
      >
        {visible ? (
          <EyeClosedIcon className="w-5 h-5" />
        ) : (
          <EyeOpenIcon className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
