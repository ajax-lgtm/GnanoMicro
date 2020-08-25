import { SeverMessage, conduitApi } from "./common";
import * as config from "@/config";

export interface Cmd {
  action: string;
  scanId?: number | number[];
  scanParam?: ScanParam;
}

export interface ScanParam {
  cellName: string;
  comment: string;
  createTime: string;
  imageNum: number;
  isFavorite: boolean;
  isManual: boolean;
  plateId: number;
  plateName: string;
  scanId: number;
  storage: string;
  thumbImageUrl: string;
  userAvatarUrl: string;
  userId: number;
  userName: string;
}

export interface Response {
  message?: SeverMessage;
  scanId?: number;
  scanNum?: number;
  scanParam?: ScanParam;
  scanList?: ScanParam[];
}

export async function action(cmd: Cmd) {
  const response = await conduitApi.post(config.apiBaseUrl + "/scan", cmd, {
    timeout: config.timeOutMs,
    headers: { "Content-Type": "application/json" }
  });
  return response.data as Response;
}

export function create(scanFeatures: ScanParam) {
  let cmd: Cmd = {
    action: "create",
    scanParam: scanFeatures
  };

  return action(cmd);
}

export function update(scanId: number, scanFeatures: ScanParam) {
  let cmd: Cmd = {
    action: "update",
    scanId: scanId,
    scanParam: scanFeatures
  };
  // debugger;
  return action(cmd);
}

export function show(scanId: number) {
  let cmd: Cmd = {
    action: "showInfo",
    scanId: scanId
  };
  return action(cmd);
}

export function list() {
  let cmd: Cmd = {
    action: "list"
  };
  return action(cmd);
}
