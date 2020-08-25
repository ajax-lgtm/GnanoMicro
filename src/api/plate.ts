import { SeverMessage, conduitApi } from "./common";
import * as config from "@/config";
// import * as P from "@/ts/modules/plate";

export interface PlateParam {
  plateId?: number;
  plateName: string;
  company: string;
  comment: string;
  imageUrl: string;
  buyUrl: string;
  svgImageUrl: string;
  isFavorite: boolean;
  createTime?: string;
  updateTime?: string;
  totalHoles: number;
  isHolePlate: boolean;
  xSize: number;
  ySize: number;
  xHolesNum?: number;
  yHolesNum?: number;
  xOffset?: number;
  yOffset?: number;
  xHoleSize?: number;
  yHoleSize?: number;
  rHoleSize?: number;
  bottomThickness?: number;
}

export interface Cmd {
  action: string;
  plateId?: number;
  plateParam?: PlateParam;
}

export interface Response {
  message?: SeverMessage;
  plateId?: number;
  plateParam?: PlateParam;
  plateList?: PlateParam[];
}

export async function action(cmd: Cmd) {
  const response = await conduitApi.post(config.apiBaseUrl + "/plate", cmd, {
    timeout: config.timeOutMs,
    headers: { "Content-Type": "application/json" }
  });
  return response.data as Response;
}

export async function create(plateParam: PlateParam) {
  // plateParam = P;

  let cmd: Cmd = {
    action: "create",
    plateParam: plateParam
  };
  return action(cmd);
}

export async function update(plateId: number, plateParam: PlateParam) {
  let cmd: Cmd = {
    action: "update",
    plateId: plateId,
    plateParam: plateParam
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
    action: "list"
  };

  return action(cmd);
}

export async function del(plateId: number) {
  let cmd: Cmd = {
    action: "delete",
    plateId: plateId
  };
  return action(cmd);
}
