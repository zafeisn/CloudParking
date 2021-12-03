// 计算距离的函数：
function rad(d) {
  return d * Math.PI / 180.0;
}
 function getDistance(lon1, lat1, lon2, lat2) {
  var EARTH_RADIUS=6378137;//赤道的半径
  var radLat1 = rad(lat1);
  var radLat2 = rad(lat2);
  var a = radLat1 - radLat2;
  var b = rad(lon1) - rad(lon2);
  var s = 2 * Math.asin(Math.sqrt(
    Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * EARTH_RADIUS;
   return s; 
}
// 计算方向的函数：罗盘
function getDirection( lat1,  lng1,  lat2,  lng2) {
   var jiaodu = getAngle(lat1, lng1, lat2, lng2);
  if ((jiaodu <= 10) || (jiaodu > 350))
    return "东";
  else if ((jiaodu > 10) && (jiaodu <= 80))
    return "东北";
  else if ((jiaodu > 80) && (jiaodu <= 100))
    return "北";
  else if ((jiaodu > 100) && (jiaodu <= 170))
    return "西北";
  else if ((jiaodu > 170) && (jiaodu <= 190))
    return "西";
  else if ((jiaodu > 190) && (jiaodu <= 260))
    return "西南";
  else if ((jiaodu > 260) && (jiaodu <= 280))
    return "南";
  else if ((jiaodu > 280) && (jiaodu <= 350))
    return "东南";
  return "";
}
function getAngle( lat1,  lng1,  lat2,  lng2) {
  var x1 = lng1;
  var y1 = lat1;
  var x2 = lng2;
  var y2 = lat2;
  var pi = Math.PI;
  var w1 = y1 / 180 * pi;
  var j1 = x1 / 180 * pi;
  var w2 = y2 / 180 * pi;
  var j2 = x2 / 180 * pi;
  var ret;
  if (j1 == j2) {
    if (w1 > w2)
      return 270; // 北半球的情况，南半球忽略
    else if (w1 < w2)
      return 90;
    else
      return -1;// 位置完全相同
  }
  ret = 4 * Math.pow(Math.sin((w1 - w2) / 2), 2) - Math.pow(
    Math.sin((j1 - j2) / 2) * (Math.cos(w1) - Math.cos(w2)), 2);
  ret = Math.sqrt(ret);
  var temp = (Math.sin(Math.abs(j1 - j2) / 2) * (Math.cos(w1) + Math
    .cos(w2)));
  ret = ret / temp;
  ret = Math.atan(ret) / pi * 180;
  if (j1 > j2) { // 1为参考点坐标
    if (w1 > w2)
      ret += 180;
    else
      ret = 180 - ret;
  } else if (w1 > w2)
    ret = 360 - ret;
  return ret;
}

module.exports = {
  getDistance: getDistance,
  getDirection: getDirection
}