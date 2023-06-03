/* eslint-disable */
import { makeAutoObservable } from 'mobx';

class VehiclesStore {
  vehicles = [];

  constructor() {
    makeAutoObservable(this);
  }
}

const vehiclesStore = new VehiclesStore();

export default vehiclesStore;
