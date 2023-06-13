import { makeAutoObservable, runInAction } from "mobx";
import ApiService from "../common/services/ApiService";

class VehiclesStore {
  vehicles = [];
  makes = [];
  currentPage = 1;
  totalRecords = 0;
  vehicle = null;
  error = null;
  succesMsg = null;
  // filterBy = null;
  // sortBy = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchVehicles(page) {
    this.error = null;
    this.vehicle = null;

    try {
      const apiService = new ApiService();
      const data = await apiService.fetchVehicles(page);
      runInAction(() => {
        this.vehicles = data.item;
        this.totalRecords = data.totalRecords;
        this.currentPage = page;
      });
    } catch (err) {
      console.log("Error: ", err);
      runInAction(() => {
        this.error = err.message;
      });
    }
  }

  async fetchMakes() {
    try {
      const apiService = new ApiService();
      const data = await apiService.fetchMakes();
      runInAction(() => {
        this.makes = data.item;
      });
    } catch (err) {
      console.log("Error: ", err);
      runInAction(() => {
        this.error = err.message;
      });
    }
  }

  async fetchVehicle(id) {
    this.error = null;

    try {
      const apiService = new ApiService();
      const data = await apiService.fetchVehicle(id);
      runInAction(() => {
        this.vehicle = data;
      });
    } catch (err) {
      console.log("Error: ", err);
      runInAction(() => {
        this.error = err.message;
      });
    }
  }

  async updateVehicle(data, token, id) {
    this.error = null;

    try {
      const apiService = new ApiService();
      const res = await apiService.updateVehicle(data, token, id);
      if (res.status === 204) {
        runInAction(() => {
          this.successMsg = "Successfully updated the vehicle!";
        });
      }
    } catch (err) {
      console.log("Error: ", err);
      runInAction(() => {
        this.error = err.message;
      });
    }
  }
}

const vehiclesStore = new VehiclesStore();

export default vehiclesStore;
