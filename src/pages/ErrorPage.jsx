/**
 * PasswordRequirements Component
 * 
 * Displays password requirements that disappear when met
 * Only shows unmet requirements as user types
 * Shows in red when there's a password error
 * 
 * Props:
 * - password: The password string to evaluate
 * - hasError: Boolean indicating if password field has an error
 */
const PasswordRequirements = ({ password = '', hasError = false }) => {
  // Check each requirement
  const requirements = [
    {
      text: 'At least one special character',
      met: /[^a-zA-Z0-9]/.test(password)
    },
    {
      text: 'At least one lowercase letter',
      met: /[a-z]/.test(password)
    },
    {
      text: 'At least one uppercase letter',
      met: /[A-Z]/.test(password)
    },
    {
      text: 'At least 7 characters',
      met: password.length >= 7
    }
  ];

  // When there's an error, show all requirements that aren't met
  // When no error, show all unmet requirements normally
  const displayRequirements = hasError 
    ? requirements.filter(req => !req.met)
    : requirements.filter(req => !req.met);

  // Don't show anything if all requirements are met
  if (displayRequirements.length === 0) return null;

  return (
    <div className="mb-4">
      <p className={`text-xs font-medium mb-2 ${hasError ? 'text-red-600' : 'text-gray-700'}`}>
        Password Requirements:
      </p>
      <ul className="text-xs space-y-1 list-disc list-inside">
        {displayRequirements.map((req, index) => (
          <li key={index} className={hasError ? 'text-red-600' : 'text-gray-600'}>
            {req.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordRequirements;