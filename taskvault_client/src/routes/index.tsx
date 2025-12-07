import { Suspense, lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { LoadingSpinner } from "@/shared/components";

const HomePage = lazy(() => import("@/pages/HomePage"));
const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const SignupPage = lazy(() => import("@/features/auth/pages/SignupPage"));
const DashboardPage = lazy(
  () => import("@/features/tasks/pages/DashboardPage")
);

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen bg-background">
    <LoadingSpinner size="lg" />
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <HomePage />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SignupPage />
      </Suspense>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <DashboardPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);
