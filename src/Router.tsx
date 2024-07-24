import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/home/Home.page";
import ShiftsPage from "./pages/shifts/Shifts.page";

import LoginPage from "./pages/login/Login.page";
import { GuessLayout } from "./layouts/guess-layout";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <GuessLayout />,
    children: [{ path: "/login", element: <LoginPage /> }],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    ),
  },

  {
    path: "/shifts",
    element: (
      <PrivateRoute>
        <ShiftsPage />
      </PrivateRoute>
    ),
  },

  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },

  {
    path: "*",
    element: <Navigate to="/error404" replace />,
  },

  {
    path: "/error404",
    element: (
      <div className="h-screen flex items-center justify-center gap-5 flex-col">
        <h1 className="font-black text-8xl">404</h1>
        <p className="text-pretty text-sm">Page not found!</p>
      </div>
    ),
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
