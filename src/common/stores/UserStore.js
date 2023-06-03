/* eslint-disable */
import { makeAutoObservable } from 'mobx';

class UserStore {
  user = null;
  isAdmin = false;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(userData) {
    this.user = userData;
    this.isAdmin = userData.roles.includes('Administrators');
  }

  removeUser() {
    this.user = null;
    this.isAdmin = false;
  }
}

const userStore = new UserStore();

export default userStore;
