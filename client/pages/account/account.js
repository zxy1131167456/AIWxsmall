// pages/account/account.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart:[

    ],
    price:0,
    total:0,
    region: ["辽宁省", "沈阳市", "沈河区"],
    hide:true,
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
  username:function(e){
    this.setData({
      username:e.detail.value
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
  hideChange:function(){
    this.setData({
      hide:true
    })
  },
  formSubmit:function(){
      var that = this;
      var carts = []
      if(that.data.username == ""||that.data.username == null){
        that.setData({
            hide:false,
            message:"收货人姓名不能为空!"
        })
      }
      else if (that.data.phone == "" || that.data.phone == null){
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
      else{
        wx.showModal({
          title: '提示',
          content: '确定提交订单么？',
          success: function (res) {
            if (res.confirm) {
              var dateNow = util.formatTime(new Date);
              that.setData({
                dateNow: dateNow
              })
              console.log(that.data.region)
              console.log(JSON.stringify(that.data.cart))
              wx.getStorage({
                key: 'cart',
                success: function (res) {
                  var cart = res.data
                  cart.push(that.data.cart)
                  wx.setStorageSync('cart', cart)
                  console.log(res);
                },
                fail: function () {
                  carts.push(that.data.cart)
                  wx.setStorage({
                    key: 'cart',
                    data: carts,
                  })
                }
              })
              wx.showLoading({
                title: '提交中..',
              })
              wx.request({
                url: 'https://702745148.knag.xyz/weapp/cart',
                data: {
                  username: that.data.username,
                  phone: that.data.phone,
                  address1: that.data.region,
                  address2: that.data.address2,
                  cart: JSON.stringify(that.data.cart),
                  dateNow:that.data.dateNow
                },
                method: 'POST',
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                  wx.hideLoading();
                  console.log(res.data)
                  that.setData({
                    hide: false,
                    message: "提交成功！"
                  })
                  setTimeout(function () {
                    wx.switchTab({
                      url: '../form/form',
                    })
                  }, 1000)
                },
                fail:function(){
                  that.setData({
                    hide: false,
                    message: "请检查网络！"
                  })
                }
              })
            } else {
              console.log('用户点击取消')
            }
          }
        })
      }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var cart1 = []
    var price = 0;
    var total = 0;
    var that = this;
    console.log(JSON.parse(options.cart))
    //接受购物车数组
    var cart = JSON.parse(options.cart)
    //接受总价格
    price = options.price;
    //总数量
    total = options.num;
    if(cart[cart.length-1] == null){
      for (let i = 0; i < cart.length - 1; i++) {
        cart1.push(cart[i]);
      }
      that.setData({
        cart: cart1,
        price: price,
        total: total
      })
    }else{
      for (let i = 0; i < cart.length; i++) {
        cart1.push(cart[i]);
      }
      that.setData({
        cart: cart1,
        price: price,
        total: total
      })
    }
    wx.getStorage({
      key: 'message',
      success: function (res) {
        that.setData({
          username: res.data[0],
          phone: res.data[1],
          region: res.data[2],
          address2: res.data[3]
        })
        console.log(that.data.message)
      },
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
