// pages/weather/weather.js
var amapFile = require('../../lib/amap-wx');

Page({
  data: {
    city: "",
    humidity: "",
    temperature: "",
    weather: "",
    windpower: "",
    winddirection: ""

  },
  onLoad: function() {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({key:'8b298c9c59d7488b6f5014d8784d4c87'});
    myAmapFun.getWeather({
      success: function(data){
        that.setData({
          city: data.city.data,
          humidity: data.humidity.data,
          temperature: data.temperature.data + " ℃",
          weather: data.weather.data,
          windpower: data.windpower.data,
          winddirection: data.winddirection.data
        })
        //成功回调
        console.log(data)
        console.log(data.city.data);
      },
      fail: function(info){
        //失败回调
        console.log(info)
      }
    })
  }
})
