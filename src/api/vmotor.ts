import { SeverMessage, conduitApi } from "./common";
import * as config from "@/config";

interface Cmd {
  action: string;
  position?: MotorParam;
  speed?: MotorParam;
}

export interface MotorParam {
  x?: number;
  y?: number;
  z?: number;
}

export interface Status {
  c_position: MotorParam;
  t_position: MotorParam;
  is_run: MotorParam;
  speed: MotorParam;
}

interface Response {
  message: SeverMessage;
  position?: MotorParam;
  status?: Status;
}

export async function action(cmd: Cmd) {
  const response = await conduitApi.post(config.apiBaseUrl + "/vmotor", cmd, {
    timeout: config.timeOutMs,
    headers: { "Content-Type": "application/json" },
  });
  // console.log(response.data);
  // debugger;

  return response.data as Response;
}

export async function getPosition() {
  let cmd: Cmd = {
    action: "getPosition",
  };
  // console.log('snap!');
  return await action(cmd);
}

export async function setPosition(position: MotorParam) {
  let cmd: Cmd = {
    action: "goto",
    position: position,
  };
  // debugger;
  return await action(cmd);
}

export async function setSpeed(speed: MotorParam) {
  let cmd: Cmd = {
    action: "setSpeed",
    speed: speed,
  };
  return await action(cmd);
}

export async function getStatus() {
  let cmd: Cmd = {
    action: "getStatus",
  };
  return await action(cmd);
}
