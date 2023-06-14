import axios from "axios";
import API_URL from "../data";

export default class UserService {
  async login(data) {
    const { username, password } = data;

    const config = {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };
    const body = {
      username,
      password,
      grant_type: "password",
    };
    const res = await axios.post(`${API_URL}login`, body, config);
    return res;
  }

  async signup(data) {
    const { username, email, password, confirmPassword } = data;

    const body = {
      username,
      email,
      password,
      confirmPassword,
      activationUrl:
        "http://localhost:3000/activate?activationToken={activationToken}",
    };
    const res = await axios.post(`${API_URL}register`, body);
    return res;
  }

  async fetchUser(token) {
    const config = {
      headers: { Authorization: token },
    };
    const res = await axios.get(`${API_URL}login`, config);
    return res.data;
  }
}
