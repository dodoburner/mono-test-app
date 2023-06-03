import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { observer } from "mobx-react-lite";
import { VehiclesProvider } from "../common/context/vehiclesContext";
import { useContext, useEffect } from "react";
import { useAuthHeader, useIsAuthenticated } from "react-auth-kit";
import UserContext from "../common/context/userContext";

function MainLayout() {
  const isSignedIn = useIsAuthenticated();
  const authHeader = useAuthHeader();
  const userStore = useContext(UserContext);

  useEffect(() => {
    if (isSignedIn()) {
      userStore.fetchUser(authHeader());
    }
  }, []);

  return (
    <div className="vh-100">
      <Header />
      <div className="container">
        <VehiclesProvider>
          <Outlet />
        </VehiclesProvider>
      </div>
    </div>
  );
}

export default observer(MainLayout);
