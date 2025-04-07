import { makeAutoObservable } from "mobx";

class UserStore {
  token: string | null = null;
  isLoggedIn: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setToken(token: string) {
    this.token = token;
    this.isLoggedIn = true;
  }

  logout() {
    this.token = null;
    this.isLoggedIn = false;
  }
}

const userStore = new UserStore();
export default userStore;
