import axios from "axios";
import API_URL from "../data";

export default class CommentsService {
  async fetchComments(id) {
    const searchQuery = `WHERE VehicleId = '${id}'`;
    const res = await axios.get(
      `${API_URL}resources/Comment/?searchQuery=${searchQuery}`
    );
    return res.data.item;
  }

  async deleteComment(id, token) {
    const config = {
      headers: { Authorization: token },
    };
    const res = await axios.delete(`${API_URL}resources/Comment/${id}`, config);
    return res;
  }

  async addComment(data, vehicleId, user, token) {
    const config = {
      headers: { Authorization: token },
    };
    const body = {
      Text: data.Text,
      UserId: user.id,
      VehicleId: vehicleId,
      Username: user.displayName,
    };
    const res = await axios.post(`${API_URL}resources/Comment`, body, config);
    return res;
  }
}
