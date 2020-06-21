import { RootStore } from "./rootStore";
import { observable, action } from "mobx";

class ModalStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  //   .shallow creates an observable which converst it's value[object,maps,arrays] into shallow observable structure
  @observable.shallow modal = {
    open: false,
    body: null,
  };

  @action openModal = (content: any) => {
    this.modal.open = true;
    this.modal.body = content;
  };

  @action closeModal = () => {
    this.modal.open = false;
    this.modal.body = null;
  };
}

export default ModalStore;
