import { RouterProvider } from "react-router-dom";
import { useAuthInitialize } from "@/features/auth/hooks/useAuthInitialize";
import { router } from "@/routes";

export default function App() {
  useAuthInitialize();

  return <RouterProvider router={router} />;
}
