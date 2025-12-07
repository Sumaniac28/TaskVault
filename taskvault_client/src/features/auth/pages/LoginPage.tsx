import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/features/auth/authSlice";
import { authApi } from "@/features/auth/authApi";
import { LoginCredentials } from "@/types";
import { Alert, Input, Button } from "@/shared/components";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>();

  const onSubmit = async (data: LoginCredentials) => {
    try {
      setLoading(true);
      setError("");
      const response = await authApi.login(data);
      dispatch(setCredentials({ user: response.user, token: response.token }));
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none loginpage-bg-pattern" />

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-primary/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-surface/90 backdrop-blur-xl border border-border-default rounded-2xl shadow-xl overflow-hidden">
        <div className="px-8 pt-8 pb-6 border-b border-border-default">
          <Link to="/" className="inline-flex items-center gap-2 mb-5 group">
            <div className="w-2.5 h-2.5 bg-primary rounded-sm" />
            <span className="font-themeFont font-semibold text-[18px] text-primary group-hover:opacity-80 transition">
              TaskVault
            </span>
          </Link>

          <h2 className="font-themeFont font-semibold text-[26px] text-primary tracking-tight">
            Welcome back
          </h2>

          <p className="text-muted text-[14px] mt-2 font-bodyFont leading-relaxed">
            Log in to continue managing your work with clarity and focus.
          </p>
        </div>

        <div className="px-8 py-7">
          <div className="mb-6">
            <Alert
              type="info"
              message="Backend is on Render's free tier. First request may take 30-60 seconds to activate."
            />
          </div>

          {error && (
            <div className="mb-6">
              <Alert
                type="error"
                message={error}
                onClose={() => setError("")}
              />
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              {...register("email", { required: "Email is required" })}
              error={errors.email?.message}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
              error={errors.password?.message}
            />

            <Button
              type="submit"
              disabled={loading}
              variant="primary"
              size="lg"
              className="w-full"
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </div>

        <div className="border-t border-border-default px-8 py-6 bg-background text-center">
          <p className="text-sm text-muted font-bodyFont">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-primary font-themeFont font-semibold hover:text-primary-hover transition-colors duration-200"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
