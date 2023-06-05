import { useContext } from "react";
import UserContext from "../common/context/userContext";
import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";

function AdminPageContainer() {
  const userStore = useContext(UserContext);
  const { isAdmin } = userStore;

  return isAdmin ? (
    <Outlet />
  ) : (
    <div className="container">401 - You are unauthorized to see this page</div>
  );
}

export default observer(AdminPageContainer);
