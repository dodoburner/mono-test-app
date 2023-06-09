import { makeAutoObservable, runInAction } from "mobx";
import VehiclesService from "../common/services/VehiclesService";

class VehiclesStore {
  vehicles = [];
  makes = [];
  currentPage = 1;
  totalRecords = 0;
  vehicle = null;
  error = null;
  successMsg = null;
  sort = null;
  filter = null;

  constructor() {
    makeAutoObservable(this);
  }

  clearVehicle() {
    this.vehicle = null;
    this.error = null;
    this.successMsg = null;
  }

  async fetchVehicles(page, sort, filter) {
    try {
      const vehiclesService = new VehiclesService();
      const data = await vehiclesService.fetchVehicles(page, sort, filter);
      runInAction(() => {
        this.vehicles = data.item;
        this.totalRecords = data.totalRecords;
        this.currentPage = page;
        this.sort = sort;
        this.filter = filter;
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
      const vehiclesService = new VehiclesService();
      const data = await vehiclesService.fetchMakes();
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
    try {
      const vehiclesService = new VehiclesService();
      const data = await vehiclesService.fetchVehicle(id);
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
      const vehiclesService = new VehiclesService();
      const res = await vehiclesService.updateVehicle(data, token, id);
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

  async deleteVehicle(token, id) {
    this.error = null;

    try {
      const vehiclesService = new VehiclesService();
      const res = await vehiclesService.deleteVehicle(token, id);
      if (res.status === 204) {
        runInAction(() => {
          this.successMsg =
            "Successfully deleted the vehicle! Redirecting you to the main page";
        });
      }
    } catch (err) {
      console.log("Error: ", err);
      runInAction(() => {
        this.error = err.message;
      });
    }
  }

  async addVehicle(data, token) {
    this.error = null;

    try {
      const vehiclesService = new VehiclesService();
      const res = await vehiclesService.addVehicle(data, token);
      if (res.status === 201) {
        runInAction(() => {
          this.successMsg = "Successfully added the vehicle!";
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
