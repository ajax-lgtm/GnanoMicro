import {
  Module,
  VuexModule,
  getModule,
  Mutation
} from "vuex-module-decorators";
import store from "@/store";

import { User } from "@/api/user.ts";
// import { deviceStates } from "@/ts/data/device.ts";

export interface DeviceStates {
  isFreeTesting?: boolean;
  isAutoTesting?: boolean;
  isShared?: boolean;
  authorUser?: User;
  otherUsers?: User[];
  scanId?: number;
}

@Module({
  dynamic: true,
  namespaced: true,
  name: "DeviceState",
  store
})
class DeviceStateModule extends VuexModule {
  isFreeTesting: boolean = false;
  isAutoTesting: boolean = false;
  isShared: boolean = false;
  authorUser?: User = undefined;
  otherUsers: User[] = [];
  scanId: number = -1;

  @Mutation
  setState(newState: DeviceStates) {
    if (newState.isFreeTesting !== undefined)
      this.isFreeTesting = newState.isFreeTesting;
    if (newState.isAutoTesting !== undefined)
      this.isAutoTesting = newState.isAutoTesting;
    if (newState.isShared !== undefined) this.isShared = newState.isShared;
    if (newState.authorUser !== undefined)
      this.authorUser = newState.authorUser;
    if (newState.otherUsers !== undefined)
      this.otherUsers = newState.otherUsers;
    if (newState.scanId !== undefined) this.scanId = newState.scanId;
  }

  get states() {
    let nowState: DeviceStates = {
      isFreeTesting: this.isFreeTesting,
      isAutoTesting: this.isAutoTesting,
      isShared: this.isShared,
      authorUser: this.authorUser,
      otherUsers: this.otherUsers,
      scanId: this.scanId
    };
    return nowState;
  }
}

export default getModule(DeviceStateModule);
