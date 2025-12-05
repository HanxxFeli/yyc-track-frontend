import { useState } from "react";
import LoginInputField from "../components/LoginInputField";
import LoginPasswordField from "../components/LoginPasswordField";
import LoginSubmitButton from "../components/LoginSubmitButton";
import { AiOutlineWarning } from "react-icons/ai";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Temporary fake login logic for testing login flow
    setTimeout(() => {
      if (email !== "test@gmail.com" || password !== "password123") {
        setError("Incorrect email or password.");
        setIsLoading(false);
      } else {
        setError("");
        setIsLoading(false);
        // Save token for header state (temporary until backend)
        localStorage.setItem("token", "dummy-token");
        window.location.href = "/";
      }
    }, 800);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border">
        
        {/* Title */}
        <h1 className="text-2xl font-bold mb-2 text-center">
          Login to your account
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Access real-time station feedback and alerts.
        </p>

        <form onSubmit={handleLogin}>
          
          {/* Email */}
          <LoginInputField
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            error={error ? " " : null} 
          />

          {/* Password */}
          <LoginPasswordField
            label="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            error={error ? " " : null}
          />

          {/* Error Box */}
          {error && (
            <div className="flex items-center gap-2 bg-red-100 text-red-700 border border-red-300 p-2 rounded mb-4">
              <AiOutlineWarning size={22} />
              <p>{error}</p>
            </div>
          )}

          {/* Remember / Forgot */}
          <div className="flex justify-between items-center mb-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" />
              <span className="text-gray-700 text-sm">Remember me</span>
            </label>

            <a href="#" className="text-[#BC0B2A] text-sm hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <LoginSubmitButton isLoading={isLoading}>
            Login
          </LoginSubmitButton>

          {/* Divider */}
          <div className="my-4 text-center text-sm text-gray-500">or</div>

          {/* Google Login */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg hover:bg-gray-50 transition"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google logo"
              className="w-5 h-5"
            />
            <span>Sign in with Google</span>
          </button>

          {/* Register */}
          <p className="text-center mt-4 text-sm">
            Don’t have an account?{" "}
            <a href="/register" className="text-[#BC0B2A] font-medium hover:underline">
              Register here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
