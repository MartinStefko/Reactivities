import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IUser, IUserFormValues } from "../models/user";
import agent from "../layout/api/agent";
import { history } from "../..";
import { toast } from "react-toastify";

export default class UserStore {
  @observable user: IUser | null = null;

  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action login = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.login(values);
      this.user = user;
    } catch (error) {
      console.log(error);
    }
  };
}
