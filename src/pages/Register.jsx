import { useState } from "react";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import PasswordStrength from "../components/PasswordStrength";
import CheckboxField from "../components/CheckboxField";
import SubmitButton from "../components/SubmitButton";
import SuccessMessage from "../components/SuccessMessage";

const Register = () => {
  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  //validation
  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    return newErrors;
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // run validation
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    // Replace this setTimeout with API call
    // temporary mock API call
    setTimeout(() => {
      console.log("Registration data ready for backend:", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      setSuccess(true);
      setIsLoading(false);

      // reset form after success
      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
          agreeToTerms: false,
        });
        setSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 border-t-4 border-[#BC0B2A]">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600">Join YYC Track today</p>
        </div>

        {/* Success message */}
        {success && <SuccessMessage message="Account created successfully!" />}

        {/* Registration form */}
        <div>
          <InputField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
            placeholder="Lebron James"
          />

          <InputField
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="tite@email.com"
          />

          <PasswordField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Enter your password"
          />

          <PasswordStrength password={formData.password} />

          <PasswordField
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            placeholder="Confirm your password"
          />

          <CheckboxField
            label="I agree to the Terms and Conditions and Privacy Policy"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            error={errors.agreeToTerms}
          />

          <SubmitButton isLoading={isLoading} onClick={handleSubmit}>
            Create Account
          </SubmitButton>
        </div>

        {/* Login link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-700">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#BC0B2A] hover:underline font-medium"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
