import { observable, action, computed, runInAction } from "mobx";
import { IUser, IUserFormValues } from "../models/user";
import agent from "../layout/api/agent";
import { RootStore } from "./rootStore";
import { error } from "console";

export default class UserStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable user: IUser | null = null;

  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action login = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.login(values);
      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      console.log(error);
    }
  };
}
