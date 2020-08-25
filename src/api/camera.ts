import { SeverMessage, conduitApi } from "./common";
import * as config from "@/config";

export interface CameraPara {
  expoAutoEnable?: boolean;
  expoGain?: number;
  expoTime?: number;
  frameRate?: number;
  imgBrightness?: number;
  imgGamma?: number;
  imgHue?: number;
  imgSaturation?: number;
  imgTemp?: string;
  imgTint?: number;
  imgWBGain?: number;
}

export interface Cmd {
  action: string;
  cameracfgId?: number;
  cameraPara?: CameraPara;
}

export interface Response {
  message?: SeverMessage;
  cameracfgId?: number;
  cameraPara?: CameraPara;
}

export async function action(cmd: Cmd) {
  const response = await conduitApi.post(
    config.apiBaseUrl + "/cameracfg",
    cmd,
    {
      timeout: config.timeOutMs,
      headers: { "Content-Type": "application/json" }
    }
  );
  return response.data as Response;
}

export async function create(cameraPara: CameraPara) {
  // plateParam = P;

  let cmd: Cmd = {
    action: "create",
    cameraPara: cameraPara
  };
  return action(cmd);
}

export async function update(cameraPara: CameraPara) {
  let cmd: Cmd = {
    action: "update",
    // cameracfgId: cameracfgId,
    cameraPara: cameraPara
  };
  return action(cmd);
}

export async function list() {
  let cmd: Cmd = {
    action: "list"
  };
  return action(cmd);
}

export async function show() {
  let cmd: Cmd = {
    action: "showInfo"
  };
  return action(cmd);
}

export async function del(cameracfgId: number) {
  let cmd: Cmd = {
    action: "delete",
    cameracfgId: cameracfgId
  };
  return action(cmd);
}
