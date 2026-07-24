import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LoaderCircle,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { motion } from "framer-motion";

import AuthLayout from "../layouts/AuthLayout";
import AuthCard from "../components/AuthCard";
import Input from "../components/Input";
import Button from "../components/Button";

import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      server: "",
    }));
  };

  const passwordRules = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    number: /\d/.test(formData.password),
    special:
      /[!@#$%^&*(),.?":{}|<>]/.test(
        formData.password
      ),
  };

  const validate = () => {
    const validationErrors = {};

    if (!formData.fullName.trim()) {
      validationErrors.fullName =
        "Full name is required.";
    }

    if (!formData.email.trim()) {
      validationErrors.email =
        "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        formData.email
      )
    ) {
      validationErrors.email =
        "Enter a valid email.";
    }

    if (
      !Object.values(passwordRules).every(Boolean)
    ) {
      validationErrors.password =
        "Password does not meet requirements.";
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      validationErrors.confirmPassword =
        "Passwords do not match.";
    }

    setErrors(validationErrors);

    return (
      Object.keys(validationErrors).length === 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      await register({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      navigate("/dashboard");
    } catch (error) {
      setErrors({
        server:
          error?.response?.data?.message ||
          error?.message ||
          "Registration failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  const Rule = ({ ok, text }) => (
    <div className="flex items-center gap-2 text-sm">
      {ok ? (
        <CheckCircle2
          size={16}
          className="text-green-600"
        />
      ) : (
        <Circle
          size={16}
          className="text-gray-400"
        />
      )}

      <span
        className={
          ok
            ? "text-green-700"
            : "text-gray-500"
        }
      >
        {text}
      </span>
    </div>
  );

  return (
    <AuthLayout>
      <AuthCard>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <h1 className="text-4xl font-extrabold text-[#16332D]">
            Create Account
          </h1>

          <p className="mt-3 mb-8 text-[#4B5563] font-semibold text-sm">
            Join Nexora and start your learning journey.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <Input
                name="fullName"
                label="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                icon={<User size={18} />}
              />

              {errors.fullName && (
                <p className="mt-2 text-sm text-red-500 font-medium">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <Input
                name="email"
                label="Email Address"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                icon={<Mail size={18} />}
              />

              {errors.email && (
                <p className="mt-2 text-sm text-red-500 font-medium">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <Input
                name="password"
                label="Password"
                value={formData.password}
                onChange={handleChange}
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Create password"
                icon={<Lock size={18} />}
                rightElement={
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="text-gray-400 transition hover:text-[#428475]"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                }
              />

              {errors.password && (
                <p className="mt-2 text-sm text-red-500 font-medium">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="rounded-xl bg-[#F8FAFB] p-4 space-y-2 border border-[#EDF1F4]">
              <Rule
                ok={passwordRules.length}
                text="Minimum 8 characters"
              />

              <Rule
                ok={passwordRules.uppercase}
                text="One uppercase letter"
              />

              <Rule
                ok={passwordRules.number}
                text="One number"
              />

              <Rule
                ok={passwordRules.special}
                text="One special character"
              />
            </div>

            <div>
              <Input
                name="confirmPassword"
                label="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm password"
                icon={<Lock size={18} />}
                rightElement={
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="text-gray-400 transition hover:text-[#428475]"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                }
              />

              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-500 font-medium">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {errors.server && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 font-semibold">
                {errors.server}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="shadow-md hover:shadow-lg shadow-[#428475]/15"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <LoaderCircle
                    size={18}
                    className="animate-spin"
                  />
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="mt-8 text-center text-gray-600 font-semibold">
            Already have an account?

            <Link
              to="/login"
              className="ml-2 font-bold text-[#428475] hover:underline"
            >
              Sign In
            </Link>
          </div>
        </motion.div>
      </AuthCard>
    </AuthLayout>
  );
}

export default Register;