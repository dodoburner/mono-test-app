import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { observer } from "mobx-react-lite";
import VehiclesContext from "../common/context/vehiclesContext";
import { useContext, useEffect } from "react";
import { useAuthHeader, useIsAuthenticated } from "react-auth-kit";
import UserContext from "../common/context/userContext";

function MainLayout() {
  const isSignedIn = useIsAuthenticated();
  const authHeader = useAuthHeader();
  const userStore = useContext(UserContext);
  const vehiclesStore = useContext(VehiclesContext);

  useEffect(() => {
    if (isSignedIn()) {
      userStore.fetchUser(authHeader());
    }
    vehiclesStore.fetchMakes();
  }, []);

  return (
    <div className="vh-100">
      <Header />
      <Outlet />
    </div>
  );
}

export default observer(MainLayout);
