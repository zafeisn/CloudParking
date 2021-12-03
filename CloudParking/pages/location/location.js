// pages/home/home.js
var comm = require("../../utils/comm.js")
var WxGps = require("../../utils/wxGps.js")
var amapFile = require("../../lib/amap-wx.js")
var markersData = {
  latitude: '',  // 纬度
  longitude: '',  //经度
  key: "8b298c9c59d7488b6f5014d8784d4c87"
};

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 数组
    markers: [],
    platform: "",
    lat: "",
    lng: ""
  },

  // 点击标注点
  getDetail: function(res){

    console.log(res.detail.markerId);  // id
    console.log(this.data.markers);
    let markerId = res.detail.markerId;
    for(var i=0; i<this.data.markers.length; i++){
      if (this.data.markers[i] != null) {
        if (this.data.markers[i].id == markerId) {
          console.log(this.data.markers[i].id);
          this.data.lat = this.data.markers[i].latitude;
          this.data.lng = this.data.markers[i].longitude;
        }
      }
    }
  },

  // 没有标注点击弹出提示
  errorFun: function(){
    wx.showToast({
      title: '请先点击空闲位置吧',
      icon: 'none',
      duration: 2000
    });
  },
  
  confirmBrt: function(){
    wx.showModal({
      title: "是否导航",                                                                                                                                             
      content: "若点击确定，则会自动占用该位置\n同时一分钟内不能再使用其他位置，请谨慎选择哦",
      showCancel: true,
      success: (res)=> {
        if(res.confirm){
          // 确定
          wx.openLocation({
            latitude: this.data.lat,
            longitude: this.data.lng,
            name: "空闲位置"
          });
        } else {
          // 取消
          console.log("用户点击了取消");
        }
      },
    })
  },
 
  jumpNavigation: function(){
    if (this.data.lat != "" && this.data.lng != "") {
      console.log("打开地图");
      this.confirmBrt();
    } else{
      this.errorFun();
    }
  },

// // 设置markers
// setMarkers: void function(i){
//   // 赋值markers
//   var index = "markers[" + (i+1) + "]";
//   that.setData({
//     [index]:{
//       id: i,
//       latitude: res[1],
//       longitude: res[0],
//       iconPath: "../../pages/image/location/site.png",
//       width: 30,
//       height: 30,
//       title: result[i].time,
//       callout: {
//               content: result[0].time,
//               color: 'black',
//               fontSize: 15,
//               borderRadius: 5,
//               borderWidth: 1,
//               borderColor: '#A4A4A4',
//               padding: 3,
//               display: 'BYCLICK'
//       }
//     }
//   })
// },

  // 移动中心点
  moveCenter: function(res) {
    let index_lat = "markers[0].latitude";
    let index_lng = "markers[0].longitude";
    this.setData({
      [index_lat]: res.detail.latitude,
      [index_lng]: res.detail.longitude
    })
  },
  
  // 获取定位数据信息
  getMap: function() {
    var that = this;
    // 经度
    var latitude = this.data.markers[0].latitude;
    // 纬度
    var longitude = this.data.markers[0].longitude;

    wx.request({
      url: 'https://www.yunxiang.online/MyServer/getJson',
      type: 'gcj02',
      success:function(res){
        var result = res.data;
        console.log(result)
        for(var i=0; i<result.length-1; i++){

          var lat = Number.parseFloat(result[i].lat);
          var lng = Number.parseFloat(result[i].lng);
          console.log("纬度：" + lat + " 经度：" + lng);
          // 部署索引值为0的位置
          if(i == 0) {
            
            // 转换
            var res = WxGps.wgs84_to_gcj02(lng, lat);
            console.log("转换后的" + res[0] + " " + res[1])
            // 计算距离
            var dis = Math.floor(comm.getDistance(latitude, longitude, lat, lng));
            // 计算角度
            var dir = comm.getDirection(latitude, longitude, lat, lng);

            // 赋值markers
            var index = "markers[" + (1) + "]";
            that.setData({
              [index]:{
                id: 0,
                latitude: res[1],
                longitude: res[0],
                iconPath: "../../pages/image/location/site.png",
                width: 30,
                height: 30,
                title: result[i].time
              }
            })
          }

          var a = Math.abs(Number.parseFloat(result[i+1].lat) - lat);
          var b = Math.abs(Number.parseFloat(result[i+1].lng) - lng);
          var max = 0.00007;
          console.log("a= " + a + "b= " + b);
          
          /**
           * 优先标记第一个经纬度
           * 若后面的数据两者存在其一差阈值大于0.0001，则进行地图标记
           */
          if(a > max || b > max){
            console.log("部署")
            // 转换
            var res = WxGps.wgs84_to_gcj02(lng, lat);
            console.log("转换后的" + res[0] + " " + res[1])
            // 计算距离
            var dis = Math.floor(comm.getDistance(latitude, longitude, lat, lng));
            // 计算角度
            var dir = comm.getDirection(latitude, longitude, lat, lng);
  
            // 赋值markers
            var index = "markers[" + (i+1) + "]";
            that.setData({
              [index]:{
                id: i+1,
                latitude: res[1],
                longitude: res[0],
                iconPath: "../../pages/image/location/site.png",
                width: 30,
                height: 30,
                title: result[i].time
              }
            })
          }
        }
      }
    })   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        console.log(res);
        that.setData({
          markers: [
            {
              id: 99,
              latitude: res.latitude,
              longitude: res.longitude,
              iconPath: "../../pages/image/location/location.png",
              width: 30,
              height: 30,
              title: "当前位置"
            }
          ]
        })
        console.log(that.data.markers[0].latitude)
      },
    })
  },
})