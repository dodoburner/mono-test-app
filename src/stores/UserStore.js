import { makeAutoObservable, runInAction } from "mobx";
import UserService from "../common/services/UserService";

class UserStore {
  user = null;
  isAdmin = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUser(token) {
    try {
      const userService = new UserService();
      const data = await userService.fetchUser(token);
      runInAction(() => {
        this.user = data;
        this.isAdmin = data.roles.includes("Administrators");
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
