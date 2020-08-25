import { SeverMessage, conduitApi } from "./common";
import * as config from "@/config";

export interface MotorParam {
  axis: string;
  pos?: number;
  motorStatus?: {
    current_pos?: number;
    target_pos?: number;
    isMoving?: boolean;
  };
  param?: {
    acc?: number;
    posMax?: number;
    posMin?: number;
    speed?: number;
    stepPerMM?: number;
  };
}

export interface MotorData {
  x?: number;
  y?: number;
  z?: number;
}

export interface Cmd {
  action: string;
  motorParam?: MotorParam[];
}

export interface Response {
  message: SeverMessage;
  motorParam?: MotorParam[];
}

export async function action(cmd: Cmd) {
  const response = await conduitApi.post(config.apiBaseUrl + "/motor", cmd, {
    timeout: config.timeOutMs,
    headers: { "Content-Type": "application/json" },
  });
  return response.data as Response;
}

export async function getPosition(axisList: string[]) {
  let motorParam: MotorParam[] = [];
  axisList.forEach((axis) => {
    motorParam.push({
      axis: axis,
    });
  });

  let cmd: Cmd = {
    action: "getPos",
    motorParam: motorParam,
  };
  // console.log('snap!');
  let res = await action(cmd);
  let retPos: MotorData = {};
  if (res.motorParam) {
    res.motorParam.forEach((motor) => {
      if (motor.axis === "X") retPos.x = motor.pos;
      if (motor.axis === "Y") retPos.y = motor.pos;
      if (motor.axis === "Z") retPos.z = motor.pos;
    });
  }
  return retPos;
}

export async function goto(position: MotorData) {
  let motorParam: MotorParam[] = [];
  if (position.x !== undefined)
    motorParam.push({
      axis: "X",
      pos: position.x,
    });
  if (position.y !== undefined)
    motorParam.push({
      axis: "Y",
      pos: position.y,
    });
  if (position.z !== undefined)
    motorParam.push({
      axis: "Z",
      pos: position.z,
    });

  let cmd: Cmd = {
    action: "goto",
    motorParam: motorParam,
  };
  // debugger;
  return await action(cmd);
}

export async function move(position: MotorData) {
  let motorParam: MotorParam[] = [];
  if (position.x !== undefined)
    motorParam.push({
      axis: "X",
      pos: position.x,
    });
  if (position.y !== undefined)
    motorParam.push({
      axis: "Y",
      pos: position.y,
    });
  if (position.z !== undefined)
    motorParam.push({
      axis: "Z",
      pos: position.z,
    });

  let cmd: Cmd = {
    action: "move",
    motorParam: motorParam,
  };
  // debugger;
  return await action(cmd);
}

export async function setSpeed(speed: MotorData) {
  let motorParam: MotorParam[] = [];
  if (speed.x !== undefined)
    motorParam.push({
      axis: "X",
      param: {
        speed: speed.x,
      },
    });
  if (speed.y !== undefined)
    motorParam.push({
      axis: "Y",
      param: {
        speed: speed.y,
      },
    });
  if (speed.z !== undefined)
    motorParam.push({
      axis: "Z",
      param: {
        speed: speed.z,
      },
    });

  let cmd: Cmd = {
    action: "setParam",
    motorParam: motorParam,
  };
  // debugger;
  return await action(cmd);
}

export async function stop(axisList: string[]) {
  let motorParam: MotorParam[] = [];
  axisList.forEach((axis) => {
    motorParam.push({
      axis: axis,
    });
  });

  let cmd: Cmd = {
    action: "stop",
    motorParam: motorParam,
  };
  return await action(cmd);
}

export async function getStatus() {
  let cmd: Cmd = {
    action: "getStatus",
  };
  return await action(cmd);
}
