import React from 'react';
import vehiclesStore from '../stores/VehiclesStore';

const VehiclesContext = React.createContext(null);

export function VehiclesProvider({ children }) {
  return (
    <VehiclesContext.Provider value={vehiclesStore}>
      {children}
    </VehiclesContext.Provider>
  );
}

export default VehiclesContext;
