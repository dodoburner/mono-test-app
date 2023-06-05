import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import API_URL from "../common/data";

class VehiclesStore {
  vehicles = [];
  makes = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchVehicles() {
    try {
      const res = await axios.get(`${API_URL}resources/VehicleModel?rpp=10000`);
      runInAction(() => {
        this.vehicles = res.data.item;
      });
    } catch (e) {
      console.log(e);
    }
  }

  async fetchMakes() {
    try {
      const res = await axios.get(`${API_URL}resources/VehicleMake`);
      runInAction(() => {
        this.makes = res.data.item;
      });
    } catch (e) {
      console.log(e);
    }
  }
}

const vehiclesStore = new VehiclesStore();

export default vehiclesStore;
