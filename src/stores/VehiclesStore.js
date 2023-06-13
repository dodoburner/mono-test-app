import { makeAutoObservable, runInAction } from "mobx";
import ApiService from "../common/services/ApiService";

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
      const apiService = new ApiService();
      const data = await apiService.fetchVehicles(page);
      runInAction(() => {
        this.vehicles = data.item;
        this.totalRecords = data.totalRecords;
        this.currentPage = page;
      });
    } catch (e) {
      console.log(e);
    }
  }

  async fetchMakes() {
    try {
      const apiService = new ApiService();
      const data = await apiService.fetchMakes();
      runInAction(() => {
        this.makes = data.item;
      });
    } catch (e) {
      console.log(e);
    }
  }
}

const vehiclesStore = new VehiclesStore();

export default vehiclesStore;
