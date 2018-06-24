// pages/our/our.js
const app = getApp()

Page({
  data: {
    userInfo: {},
    phoneNum: '15946565183',
  },
  messageEvent:function(){
      wx.navigateTo({
        url: '../message/message',
      })
  },
  callEvent: function (e) {
    console.log(e)
    wx.makePhoneCall({
      phoneNumber: this.data.phoneNum
    })
  },
  clearStorage:function(){
    wx.showModal({
      title: '提示',
      content: '确认清除已经完成的订单么？',
      success:function(res){
        if(res.confirm){
          wx.removeStorage({
            key: 'finish1',
            success: function (res) {
              console.log(res)
            },
          })
          wx.removeStorage({
            key: 'finish',
            success: function (res) {
              console.log(res)
            },
          })
          wx.removeStorage({
            key: 'message',
            success: function (res) {
              console.log(res)
            },
          })
          wx.showToast({
            title: '清除成功！',
          })
        }
      }
    })
     
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据  
    app.getUserInfo(function (userInfo) {
      //更新数据  
      that.setData({
        userInfo: userInfo
      })
    })
  }
})
