/* eslint-disable */
import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import API_URL from './data';

class VehiclesStore {
  vehicles = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchVehicles() {
    try {
      const res = await axios.get(`${API_URL}resources/VehicleModel`);
      runInAction(() => {
        this.vehicles = res.data.item;
      });
    } catch (e) {
      console.log(e);
    }
  }
}

const vehiclesStore = new VehiclesStore();

export default vehiclesStore;
