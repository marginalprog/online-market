import { makeAutoObservable } from "mobx";

export default class UserStore {
  setIsA;

  constructor() {
    this._isAuth = false;
    this._user = {};
    makeAutoObservable(this); // отслеживание переменных в this и обновление mobx
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }

  setUser(user) {
    this._user = user;
  }
}
