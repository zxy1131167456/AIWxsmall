// pages/account/account.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ["辽宁省", "沈阳市", "沈河区"],
    hide: true,
    username:"",
    phone:"",
    address2:""
  },
  // 选择省市区函数
  changeRegin(e) {
    this.setData({ region: e.detail.value });
  },
  // 选择三级联动
  changeMultiPicker3(e) {
    this.setData({ multiIndex3: e.detail.value })
  },
  username: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  address1: function (e) {
    this.setData({
      address1: e.detail.value
    })
  },
  address2: function (e) {
    this.setData({
      address2: e.detail.value
    })
  },
  hideChange: function () {
    this.setData({
      hide: true
    })
  },
  formSubmitTap: function () {
    var that = this;
    var carts = []
    var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (that.data.username == "" || that.data.username == null) {
      that.setData({
        hide: false,
        message: "收货人姓名不能为空!"
      })
    }
    else if (that.data.phone == "" || that.data.phone == null) {
      that.setData({
        hide: false,
        message: "电话不能为空!"
      })
    }
    else if (that.data.region == "" || that.data.region == null) {
      that.setData({
        hide: false,
        message: "收获地址不能为空!"
      })
    }
    else if (that.data.address2 == "" || that.data.address2 == null) {
      that.setData({
        hide: false,
        message: "收获地址不能为空!"
      })
    }
    else if(!reg.test(that.data.phone)){
      that.setData({
        hide: false,
        message: "请输入正确的电话号码!"
      })
    }
    else {
      var message=[]
      message.push(that.data.username)
      message.push(that.data.phone)
      message.push(that.data.region)
      message.push(that.data.address2)
      wx.showModal({
        title: '提示',
        content: '确定绑定这些信息么？',
        success: function (res) {
          if (res.confirm) {
              wx.setStorage({
                key: 'message',
                data: message,
              })
              that.setData({
                hide: false,
                message: "绑定成功!"
              })
          } else {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  onShow:function(){
    var that = this
    wx.getStorage({
      key: 'message',
      success: function(res) {
        that.setData({
          username:res.data[0],
          phone:res.data[1],
          region:res.data[2],
          address2:res.data[3]
        })
        console.log(that.data.message)
      },
    })
  }
})
