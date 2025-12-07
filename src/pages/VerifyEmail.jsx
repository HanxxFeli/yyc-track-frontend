import { useState } from "react";
import VerifyEmailForm from "../components/VerifyEmailForm";

/**
 * VerifyEmail Page Component
 *
 * Page wrapper for email verification
 * Handles API calls and state management
 */
const VerifyEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Handle code verification
  const handleVerify = async (code) => {
    setIsLoading(true);
    setError("");

    // Temporary mock API call
    setTimeout(() => {
      console.log("Verification code:", code);

      // Simulate error for demonstration (code: 123456)
      if (code === "123456") {
        setError(
          "Unable to send verification email. Please resend code, or try again later."
        );
        setIsLoading(false);
        return;
      }

      setSuccess(true);
      setIsLoading(false);

      // Redirect after success
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    }, 1500);
  };

  // Handle resend code
  const handleResend = async () => {
    setIsResending(true);
    setError("");

    // Temporary mock API call
    setTimeout(() => {
      console.log("Resending verification code");
      alert("Verification code sent to your email!");
      setIsResending(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <VerifyEmailForm
        onVerify={handleVerify}
        onResend={handleResend}
        isLoading={isLoading}
        isResending={isResending}
        error={error}
        success={success}
        onErrorChange={setError}
      />
    </div>
  );
};

export default VerifyEmail;
