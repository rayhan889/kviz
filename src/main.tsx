import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import AuthProvider from "./components/AuthProvider.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import HomePage from "./pages/HomePage.tsx";
import QuestionPage from "./pages/QuestionPage.tsx";
import App from "./App.tsx";
import "./index.css";
import "@fontsource-variable/rubik";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "question",
        element: (
          <ProtectedRoute>
            <QuestionPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl={"/"}>
      <AuthProvider isSignedIn={false}>
        <RouterProvider router={router} />
      </AuthProvider>
    </ClerkProvider>
  </StrictMode>
);
