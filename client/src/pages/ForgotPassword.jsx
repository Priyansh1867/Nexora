import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  LoaderCircle,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";

import AuthLayout from "../layouts/AuthLayout";
import AuthCard from "../components/AuthCard";
import Input from "../components/Input";
import Button from "../components/Button";

import authService from "../services/authService";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const validateEmail = () => {
    if (!email.trim()) {
      setError("Email is required.");
      return false;
    }

    const emailRegex =
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email.");
      return false;
    }

    setError("");

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail()) return;

    try {
      setLoading(true);

      const response =
        await authService.forgotPassword(email);

      setSuccess(true);

      setMessage(
        response.message ||
          "Password reset link has been sent."
      );
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong. Please try again."
      );
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
          {!success ? (
            <>
              <h1 className="text-4xl font-extrabold text-[#16332D]">
                Forgot Password
              </h1>

              <p className="mt-3 mb-8 text-[#4B5563] font-semibold text-sm">
                Enter your registered email to receive password reset instructions.
              </p>

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div>
                  <Input
                    name="email"
                    label="Email Address"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Enter your email"
                    icon={<Mail size={18} />}
                  />

                  {error && (
                    <p className="mt-2 text-sm text-red-500 font-medium">
                      {error}
                    </p>
                  )}
                </div>

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
                      Sending...
                    </span>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 shadow-sm">
                <CheckCircle2
                  size={40}
                  className="text-green-600"
                />
              </div>

              <h2 className="mt-6 text-3xl font-extrabold text-[#16332D]">
                Check your inbox
              </h2>

              <p className="mt-4 leading-relaxed text-[#4B5563] font-semibold">
                {message}
              </p>

              <p className="mt-3 text-sm text-gray-500 font-medium">
                Didn't receive the email? Check your spam folder or try again.
              </p>
            </div>
          )}

          <div className="mt-8 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 font-bold text-[#428475] hover:underline"
            >
              <ArrowLeft size={18} />
              Back to Login
            </Link>
          </div>
        </motion.div>
      </AuthCard>
    </AuthLayout>
  );
}

export default ForgotPassword;