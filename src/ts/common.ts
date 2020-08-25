export function goto(p: any, toPath: string) {
  if (p.$route.path !== toPath)
    p.$router.push({
      path: toPath
    });
}

export function getTimeGap(beginTime: number) {
  let nowTime = new Date();
  let dateDiff = nowTime.getTime() - beginTime * 1000;
  let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));
  let leave1 = dateDiff % (24 * 3600 * 1000);
  let hours = Math.floor(leave1 / (3600 * 1000));
  let leave2 = leave1 % (3600 * 1000);
  let minutes = Math.floor(leave2 / (60 * 1000));
  let leave3 = leave2 % (60 * 1000);
  let seconds = Math.round(leave3 / 1000);
  let str = "";
  if (dayDiff > 0) str = dayDiff.toString() + "天前";
  else if (hours > 0) str = hours.toString() + "小时前";
  else if (minutes > 0) str = minutes.toString() + "分钟前";
  else if (seconds > 0) str = seconds.toString() + "秒前";
  return str;
}
