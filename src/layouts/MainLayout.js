/* eslint-disable */
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { observer } from 'mobx-react-lite';
import { VehiclesProvider } from '../common/storeContext';

function MainLayout() {
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
