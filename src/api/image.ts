import { SeverMessage, conduitApi } from './common';
import * as config from '@/config';

interface Cmd {
  action: string;
  scanId?: number;
  imageId?: number;
  imageParam?: ImageParam;
  filter?: Filter;
  comment?: string;
}

export interface Filter {
  isAll: boolean;
  isAscend: boolean;
  userIds?: number[];
  timeRange?: TimeRange;
  number?: number;
}

export interface TimeRange {
  start: string;
  end: string;
}

interface Response {
  message: SeverMessage;
  imageParam?: ImageParam;
  imageList?: ImageParam[];
  imageNum?: number;
}

export interface ImagePath {
  L: string;
  M: string;
  S: string;
}

export interface ImageParam {
  // comment: string;
  // createTime: string;
  // createTimeStamp: number;
  // imageFilePath: string;
  // imageId: number;
  // imageName: string;
  // isImage: boolean;
  // motorXPosition: number;
  // motorYPosition: number;
  // motorZPosition: number;
  // plateHoleNum: number;
  // plateHoleSubNum: number;
  // scanId: number;
  // status: number;
  // updateTime: string;
  // updateTimeStamp: number;
  // userId: number;
  // videoId: number;
  // well?: string;
  comment: string;
  createTime: number;
  imageFilePath: string;
  imageId: number;
  imageName: string;
  isImage: boolean;
  motorXPosition: number;
  motorYPosition: number;
  motorZPosition: number;
  plateHoleNum: number;
  plateHoleSubNum: number;
  scanId: number;
  updateTime: number;
  userId: number;
  videoId: number;
  well: string;
}

export function getImagePath(image: ImageParam) {
  let imagePath: ImagePath = {
    L: '',
    M: '',
    S: ''
  };

  let before = config.imageDataBaseUrl + image.imageFilePath + '/';
  let after = '-' + image.imageName + '.jpg';
  imagePath = {
    L: before + 'L' + after,
    M: before + 'M' + after,
    S: before + 'S' + after
  };

  return imagePath;
}

export async function action(cmd: Cmd) {
  const response = await conduitApi.post(config.apiBaseUrl + '/image', cmd, {
    timeout: config.timeOutMs,
    headers: { 'Content-Type': 'application/json' }
  });
  return response.data as Response;
}

export async function snap(scanId: number) {
  let cmd: Cmd = {
    action: 'snap',
    scanId: scanId
  };
  // console.log('snap!');
  return await action(cmd);
}

export function update(imageId: number, comment: string) {
  let cmd: Cmd = {
    action: 'update',
    imageId: imageId,
    comment: comment
  };
  return action(cmd);
}

export function show(imageId: number) {
  let cmd: Cmd = {
    action: 'showInfo',
    imageId: imageId
  };
  return action(cmd);
}

export function list(
  scanId: number,
  filter: Filter = { isAll: true, isAscend: false }
) {
  let cmd: Cmd = {
    action: 'list',
    scanId: scanId,
    filter: filter
  };
  // debugger;
  // console.log(cmd);
  return action(cmd);
}

export function del(imageId: number) {
  let cmd: Cmd = {
    action: 'delete',
    imageId: imageId
  };
  return action(cmd);
}
