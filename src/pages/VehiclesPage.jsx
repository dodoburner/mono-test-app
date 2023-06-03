/* eslint-disable */
import { useContext, useEffect } from 'react';
import VehiclesContext from '../common/storeContext';
import { observer } from 'mobx-react-lite';

function VehiclesPage() {
  const vehiclesStore = useContext(VehiclesContext);
  const { vehicles } = vehiclesStore;

  useEffect(() => {
    vehiclesStore.fetchVehicles();
  }, []);

  return (
    <div>
      {vehicles.map((vehicle) => {
        return <div>{vehicle.Name}</div>;
      })}
    </div>
  );
}

export default observer(VehiclesPage);
