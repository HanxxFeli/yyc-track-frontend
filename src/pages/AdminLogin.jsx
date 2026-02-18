/**
 * Admin Login Page
 * 
 * Login interface specifically for administration
 * - collects admin email and password
 * - sends credentials to backend endpoint: POST /api/auth/admin/login
 * - handles loading and error states
 * - store returned JWT token in localStorage under "adminAuthToken"
 * - redirect to authenticated admins to /admin/dashboard
 */

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineWarning } from "react-icons/ai";

import LoginInputField from "../components/LoginInputField";
import LoginPasswordField from "../components/LoginPasswordField";
import LoginSubmitButton from "../components/LoginSubmitButton";

export default function AdminLogin() {
  /**
   * React Router navigation hook
   * Used to redirect admin after successful login
   */
  const navigate = useNavigate();

  /**
   * API base URL for backend requests
   */
  const API_URL = "http://localhost:5000/api";

  /**
   * Key used to store admin JWT token in localStorage
   */
  const ADMIN_TOKEN_KEY = "adminAuthToken";

  // form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // ui state
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles admin login form submission
   * 
   * workflow:
   * 1. prevent default form refresh
   * 2. send email + password to backend
   * 3. if successful:
   *    - store jwt token
   *    - redirect to admin dashboard
   * 4. if failed: 
   *    - displays error message
   */
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
        navigate("/admin/dashboard");
      } else {
        setError(data.message || "Incorrect email or password.");
      }
    } catch (err) {
      console.error("Admin login error:", err);
      setError("Admin login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center bg-gray-100 pt-16 pb-20">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border">
        <h1 className="text-2xl font-bold mb-2 text-center">
          Admin Login
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Access the admin dashboard.
        </p>

        <form onSubmit={handleAdminLogin}>
          <LoginInputField
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter admin email"
            error={error ? " " : null}
          />

          <LoginPasswordField
            label="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            error={error ? " " : null}
          />

          {error && (
            <div className="flex items-center gap-2 bg-red-100 text-red-700 border border-red-300 p-2 rounded mb-4">
              <AiOutlineWarning size={22} />
              <p>{error}</p>
            </div>
          )}

          <LoginSubmitButton isLoading={isLoading}>
            Login
          </LoginSubmitButton>

          <p className="text-center mt-4 text-sm text-gray-600">
            Not an admin?{" "}
            <Link to="/login" className="text-[#BC0B2A] font-medium hover:underline">
              Go to user login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}