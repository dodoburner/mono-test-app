import axios from "axios";
import API_URL from "../data";

export default class VehiclesService {
  async fetchVehicles(page, sort, filter) {
    const searchQuery = `WHERE MakeId = '${filter}'`;
    let res;
    if (filter) {
      res = await axios.get(
        `${API_URL}resources/VehicleModel?page=${page}&rpp=8&sort=${sort}&searchQuery=${searchQuery}`
      );
    } else {
      res = await axios.get(
        `${API_URL}resources/VehicleModel?page=${page}&rpp=8&sort=${sort}`
      );
    }
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

  async updateVehicle(data, token, id) {
    const config = {
      headers: { Authorization: token },
    };
    const res = await axios.put(
      `${API_URL}resources/VehicleModel/${id}`,
      data,
      config
    );
    return res;
  }

  async deleteVehicle(token, id) {
    const config = {
      headers: { Authorization: token },
    };
    const res = await axios.delete(
      `${API_URL}resources/VehicleModel/${id}`,
      config
    );
    return res;
  }

  async addVehicle(data, token) {
    const config = {
      headers: { Authorization: token },
    };
    const res = await axios.post(
      `${API_URL}resources/VehicleModel`,
      data,
      config
    );
    return res;
  }
}
