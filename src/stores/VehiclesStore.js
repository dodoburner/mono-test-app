import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import API_URL from "../common/data";

class VehiclesStore {
  vehicles = [];
  makes = [];
  currentPage = 1;
  totalRecords = 0;
  // filterBy = null;
  // sortBy = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchVehicles(page) {
    try {
      const res = await axios.get(`${API_URL}resources/VehicleModel?page=${page}&rpp=8`);
      runInAction(() => {
        this.vehicles = res.data.item;
        this.totalRecords = res.data.totalRecords;
        this.currentPage = page;
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
