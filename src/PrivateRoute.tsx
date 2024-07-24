import { useEffect, ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "./stores/AuthStore";
import { AuthenticatedLayout } from "./layouts/authenticated-layout";

interface PrivateRouteProps {
  children: ReactElement;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;
  const location = useLocation();

  useEffect(() => {
    const verifyTokenAndRedirect = async () => {
      try {
        if (isAuthenticated) {
          await authStore.verifyToken();
        }
      } catch (error) {
        authStore.logout();
      }
    };

    verifyTokenAndRedirect();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
};

export default PrivateRoute;
