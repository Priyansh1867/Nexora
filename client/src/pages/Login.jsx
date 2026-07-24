import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, LoaderCircle } from "lucide-react";
import { motion } from "framer-motion";

import AuthLayout from "../layouts/AuthLayout";
import AuthCard from "../components/AuthCard";
import Input from "../components/Input";
import Button from "../components/Button";

import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      server: "",
    }));
  };

  const validate = () => {
    const validationErrors = {};

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      validationErrors.email = "Enter a valid email.";
    }

    if (!formData.password.trim()) {
      validationErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      validationErrors.password =
        "Password must contain at least 6 characters.";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      await login({
        email: formData.email,
        password: formData.password,
      });

      const searchParams = new URLSearchParams(location.search);
      const queryRedirect = searchParams.get("redirect");

      const redirect =
        queryRedirect || location.state?.from?.pathname || "/dashboard";

      navigate(redirect, {
        replace: true,
      });
    } catch (error) {
      setErrors({
        server:
          error?.response?.data?.message ||
          error?.message ||
          "Unable to login. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <h1 className="text-4xl font-extrabold text-[#16332D]">
            Welcome back!
          </h1>

          <p className="mt-3 mb-8 text-[#4B5563] font-semibold text-sm">
            Sign in to continue your learning journey.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <Input
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
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
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                type={
                  showPassword ? "text" : "password"
                }
                placeholder="Enter your password"
                icon={<Lock size={18} />}
                rightElement={
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-700 font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="accent-[#428475] h-4 w-4 rounded border-gray-300"
                />

                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="font-bold text-[#428475] hover:underline"
              >
                Forgot Password?
              </Link>
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
                  Signing In...
                </span>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-8 text-center text-gray-600 font-semibold">
            New to Nexora?

            <Link
              to="/register"
              className="ml-2 font-bold text-[#428475] hover:underline"
            >
              Create Account
            </Link>
          </div>
        </motion.div>
      </AuthCard>
    </AuthLayout>
  );
}

export default Login;