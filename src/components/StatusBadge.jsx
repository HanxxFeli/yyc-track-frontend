/**
 * StatusBadge
 * 
 * - Reusable pill badge for statuses across admin pages
 * 
 * Props:
 * - label: string
 * - variant: "success" | "warning" | "danger" |
 * - size: "sm" | "md"
 */

export default function StatusBadge({ label, variant = "neutral", size = "sm" }) {
  const base = 
    "inline-flex items-center justify-center rounded-full border font-medium whitespace-nowrap";

  const sizes = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-1.5 text-sm",
  };

  const variants = {
    danger: "bg-red-50 text-red-700 border-red-200",
    warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
    success: "bg-green-50 text-green-700 border-green-200",
    info: "bg-blue-50 text-blue-700 border-blue-200",
    neutral: "bg-gray-50 text-gray-700 border-gray-200",
  };

  return (
    <span className={`${base} ${sizes[size]} ${variants[variant]}`}>
      {label}
    </span>
  );
}