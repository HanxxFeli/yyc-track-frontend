/**
 * PasswordRequirements Component
 * 
 * Displays password requirements as a bulleted list
 * Used to guide users on creating a strong password
 */
const PasswordRequirements = () => {
  return (
    <div className="mb-4">
      <p className="text-xs font-medium text-gray-700 mb-2">Password Requirements:</p>
      <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
        <li>At least one special character</li>
        <li>At least one lowercase letter</li>
        <li>At least one uppercase letter</li>
        <li>At least 7 characters</li>
      </ul>
    </div>
  );
};

export default PasswordRequirements;
