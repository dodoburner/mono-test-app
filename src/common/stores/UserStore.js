import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import API_URL from '../data';

class UserStore {
  user = null;
  isAdmin = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUser(token) {
    try {
      const config = {
        headers: { Authorization: token },
      };
      const res = await axios.get(`${API_URL}login`, config);
      const { data } = res;
      runInAction(() => {
        this.user = data;
        this.isAdmin = data.roles.includes('Administrators');
      });
    } catch (e) {
      console.log(e);
    }
  }

  removeUser() {
    this.user = null;
    this.isAdmin = false;
  }
}

const userStore = new UserStore();

export default userStore;
