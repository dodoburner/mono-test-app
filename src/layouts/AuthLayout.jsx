import { useEffect } from "react";
import { useIsAuthenticated } from "react-auth-kit";
import { Outlet, useNavigate } from "react-router-dom";

export default function AuthLayout() {
  const isSignedIn = useIsAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn()) {
      navigate("/");
    }
  }, []);

  return (
    <div className="container h-100">
      <Outlet />
    </div>
  );
}
