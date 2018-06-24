// pages/form/form.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    height:1200,
    currentTab: '',
    hiddenName:false,
    len:4,
    index:0,
    hide:true,
    form: [
      
    ],
    cart:[

    ],
    finish:[

    ],
    finish1:[

    ],
    loading:true
  },
  onPullDownRefresh:function(){
    wx.stopPullDownRefresh()
  },
  clearStorage:function(){
      wx.clearStorage()
      this.setData({
        form:[],
        cart:[]
      })
      console.log(this.data.form)
  },
  /*** 滑动切换tab***/
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  /*** 点击tab切换***/
  swichNav: function (e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current
    });
  },
  hideChange: function () {
    this.setData({
      hide: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

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
    var that = this
    var arr = []
    var height = 0
    wx.getStorage({
      key: 'cart',
      success: function (res) {
        var cart = res.data;
        that.setData({
          cart: cart
        })
      },
    })
    wx.getStorage({
      key: 'form',
      success: function (res) {
        var form = res.data;
        that.setData({
          form: form
        })
      },
    })
    //每次渲染页面时都将缓存数据存入finish数组用于渲染页面
    var finish = wx.getStorageSync('finish')
    that.setData({
      finish: finish
    })
    var finish1 = wx.getStorageSync('finish1')
    that.setData({
      finish1: finish1
    })
  },

  confirmFinish:function(e){
    var that = this
    wx.showModal({
      title: '提示',
      content: '确认该订单已经完成嘛？',
      success:function(res){
        if(res.confirm){
          //获取当前点击的索引值
          var index = e.currentTarget.dataset.index
          console.log(that.data.form)
          console.log(e.currentTarget.dataset.index)
          //获取待受理form
          var formValue = wx.getStorageSync('form')
          console.log(formValue)
          //用splice方法在数组里删除这一条并将这一条存入finishValue
          var finishValue = formValue.splice(index, 1)
          //获取finish缓存
          wx.getStorage({
            key: 'finish',
            //当有finfish缓存时
            success: function (res) {
              console.log(res.data)
              //将删除出来的数据对象遍历出来并存入finish缓存数组里
              for (var i = 0; i < finishValue.length; i++) {
                var obj = finishValue[i]
                res.data.push(obj)
              }
              var finish = res.data
              //存完后重新建立缓存
              wx.setStorageSync('finish', finish)
              //使得finish数组等于缓存里面的数据，也就是使之即刻生效
              that.setData({
                finish: res.data
              })
            },
            //获取失败也就是还没有finish缓存时
            fail: function (res) {
              //建立finish缓存，并把删除出来的那一条数据存入缓存
              wx.setStorageSync('finish', finishValue)
              var finish = wx.getStorageSync('finish')
              //将缓存数据存入finish数组
              that.setData({
                finish: finish
              })
            }
          })
          wx.setStorageSync('form', formValue)
          console.log(formValue)
          that.setData({
            form: formValue
          })
          console.log(that.data.form)
          console.log(that.data.finish)
          that.setData({
            message:"订单已完成",
            hide:false
          })
        }
      }
    })
  },


  confirmFinish1:function(e){
    var that = this
    wx.showModal({
      title: '提示',
      content: '确认已收货了嘛？',
      success:function(res){
        if(res.confirm){
          //获取当前点击的索引值
          var index = e.currentTarget.dataset.index
          //获取待受理cart
          var cartValue = wx.getStorageSync('cart')
          console.log(cartValue)
          //用splice方法在数组里删除这一条并将这一条存入finish1Value
          var finish1Value = cartValue.splice(index, 1)
          //获取finish1缓存
          wx.getStorage({
            key: 'finish1',
            //当有finfish缓存时
            success: function (res) {
              console.log(res.data)
              //将删除出来的数据对象遍历出来并存入finish1缓存数组里
              for (var i = 0; i < finish1Value.length; i++) {
                var obj = finish1Value[i]
                res.data.push(obj)
              }
              var finish1 = res.data
              //存完后重新建立缓存
              wx.setStorageSync('finish1', finish1)
              //使得finish1数组等于缓存里面的数据，也就是使之即刻生效
              that.setData({
                finish1: res.data
              })
            },
            //获取失败也就是还没有finish1缓存时
            fail: function (res) {
              //建立finish1缓存，并把删除出来的那一条数据存入缓存
              wx.setStorageSync('finish1', finish1Value)
              var finish1 = wx.getStorageSync('finish1')
              //将缓存数据存入finish1数组
              that.setData({
                finish1: finish1
              })
            }
          })
          wx.setStorageSync('cart', cartValue)
          console.log(cartValue)
          that.setData({
            cart: cartValue
          })
          console.log(that.data.cart)
          console.log(that.data.finish1)
          that.setData({
            message: "订单已完成",
            hide: false
          })
        }
      }
    })
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
    var that = this;
    wx.getStorage({
      key: 'form',
      success: function(res) {
        var len = res.data.length
        if (len >= that.data.len) {
          that.data.len += 1;
          console.log(that.data.len)
          setTimeout(function () {
            var height = that.data.height + 400;
            that.setData({
              height: height,
              loading: true
            })
          }, 0)
        }
      },
    })
    wx.getStorage({
      key: 'cart',
      success: function (res) {
        console.log(res.data.toString().split(',').length)
        var len = res.data.toString().split(',').length
        if (len >= that.data.len) {
          that.data.len += 1;
          console.log(that.data.len)
          setTimeout(function () {
            var height = that.data.height + 400;
            that.setData({
              height: height,
              loading: true
            })
          }, 0)
        }
      },
    })
    wx.getStorage({
      key: 'finish',
      success: function (res) {
        var len = res.data.length
        if (len >= that.data.len) {
          that.data.len += 1;
          console.log(that.data.len)
          setTimeout(function () {
            var height = that.data.height + 400;
            that.setData({
              height: height,
              loading: true
            })
          }, 0)
        }
      },
    })
    wx.getStorage({
      key: 'finish1',
      success: function (res) {
        console.log(res.data.toString().split(',').length)
        var len = res.data.toString().split(',').length
        if (len >= that.data.len) {
          that.data.len += 1;
          console.log(that.data.len)
          setTimeout(function () {
            var height = that.data.height + 400;
            that.setData({
              height: height,
              loading: true
            })
          }, 0)
        }
      },
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})