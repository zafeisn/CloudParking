// pages/home/home.js
var comm = require("../../utils/comm.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 24.57591,
    longitude: 118.09728,
    markers: [{
      latitude: 24.57591,
      longitude: 118.09728,
    }],
    covers: [{
      latitude: 24.57591,
      longitude: 118.09728,

    }, {
      latitude: 24.57591,
      longitude: 118.09728,
    }],
    result: []
  },
  // 跳转到空闲车位页面 
  jumpLocation: function(res){

    wx.navigateTo({
      url: '../location/location',
    })
    
  },
  // 跳转到天气页面
  jumpWeather: function(){
    wx.navigateTo({
      url: '../weather/weather',
    })
  },
  // 跳转到记录页面
  jumpRecord: function(){
    wx.navigateTo({
      url: '../record/record',
    })
  },
  // 跳转到商城页面
  junmStore: function(){
    wx.navigateTo({
      url: '../store/store',
    })
  },

  getLocation: function() {
    var that = this;
    // 经度
    var latitude = this.data.markers[0].latitude;
    // 纬度
    var longitude = this.data.markers[0].longitude;

    var result = this.data.result;
    for(var i=0; i<result.length; i++) {
      let weidu = result[i].latitude;
      let jingdu = result[i].longitude;
      var index = "markers["+(i+1)+"]";

      // 计算距离
      var dis = Math.floor(comm.getDistance(latitude, longitude, weidu, jingdu));
      // 计算角度
      var dir = comm.getDirection(latitude, longitude, weidu, jingdu);
      that.setData({
        
        [index]: {
              latitude: weidu,
              longitude: jingdu,
              iconPath: "../../pages/image/location/site.png",
              width: 30,
              height: 30,
              callout: {
                content: "距离：" + dir + dis + "米",
                color: 'black',
                fontSize: 15,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#A4A4A4',
                padding: 3,
                display: 'BYCLICK'
              }
        }
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      
      result: [
        {
          latitude: 24.604489,
          longitude: 118.084369
        },
        {
          latitude: 24.604889,
          longitude: 118.084769
        },
      ]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})