import axios from "axios";
import API_URL from "../data";

export default class ApiService {
  async fetchVehicles(page) {
    const res = await axios.get(
      `${API_URL}resources/VehicleModel?page=${page}&rpp=8`
    );
    return res.data;
  }
  async fetchMakes() {
    const res = await axios.get(`${API_URL}resources/VehicleMake?rpp=100`);
    return res.data;
  }

  async fetchVehicle(id) {
    const res = await axios.get(`${API_URL}resources/VehicleModel/${id}`);
    return res.data;
  }
}
