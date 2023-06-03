/* eslint-disable */

import { useEffect } from "react";
import { useIsAuthenticated } from "react-auth-kit";
import { Outlet, useNavigate } from "react-router-dom";

export default function AuthLayout() {
  const isSignedIn = useIsAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn()) {
      navigate("/vehicles")
    }
  }, [])

  return (
    <div className="container h-100">
      <Outlet />
    </div>
  );
}
