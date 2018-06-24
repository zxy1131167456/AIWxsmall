//index.js
var util = require('../../utils/util.js')
var app = getApp();
Page({
    data: {
        requestResult: '',
        toast1Hidden: true,
        toastHiddenDate: true,
        modalHidden:true,
        flag:false
    },
    onLoad: function (option) {
      var price = "price";
      var data = JSON.parse(option.data)
      this.setData({
        price: option.price,
        data:data,
        username:data.username,
        phone: data.phone,
        adress1: data.adress1,
        adress:data.adress,
        date:data.date,
        times:data.times,
        mu: data.mu,
        addr: data.addr,
        server: data.server
      });
      //将预估价格加入到data对象中
      this.data.data[price] = option.price;
    },
    //弹出确认框
    modalTap: function (e) {
      this.setData({
        modalHidden: false
      })
    },
    toast1Change: function (e) {
      this.setData({ toast1Hidden: true });
    },
    toastChangeDate: function (e) {
      this.setData({ toastHiddenDate: true });
       wx.switchTab({
             url: '../form/form',
           })
    },
    formReset: function () {
      console.log('form发生了reset事件');
    },
    onShow:function(){

    },
    formSubmit: function (e) {
      var that = this;
      wx.showModal({
        title: '提示',
        content: '确定提交预约嘛？',
        success: function (res) {
          if (res.confirm) {
            var forms = []
            // app.globalData.data1 = that.data;
            console.log(util.formatTime(new Date));
            var dateNow = util.formatTime(new Date);
            that.setData({
              dateNow: dateNow
            })
            // this.modalTap()
            var formData = e.detail.value;
            console.log(formData);
            //建立本地缓存键为点击那一刻的时间(为了确定唯一标识)
            //值为所有预约信息加上预估价格
            wx.getStorage({
              key: 'form',
              success: function (res) {
                var form = res.data
                form.push(that.data.data)
                wx.setStorageSync('form', form)
                console.log(res);
              },
              fail: function () {
                forms.push(that.data.data)
                wx.setStorage({
                  key: 'form',
                  data: forms,
                })
              }
            })
            wx.showLoading({
              title: '提交中...',
            })
            wx.request({
              url: 'https://702745148.knag.xyz/weapp/form',
              data: {
                username: that.data.username,
                phone: that.data.phone,
                adress1: that.data.adress1,
                adress: that.data.adress,
                date: that.data.date,
                times: that.data.times,
                mu: that.data.mu,
                addr: that.data.addr,
                server: that.data.server,
                dateNow: that.data.dateNow
              },
              method: 'POST',
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {
                wx.hideLoading()
                console.log(res.data)
                console.log(res.data.dateNow)
                var dateNow = res.data.dateNow;
                that.setData({
                  toastHiddenDate: false,
                  dateNow: dateNow
                })
                setTimeout(function () {
                  wx.switchTab({
                    url: '../form/form',
                  })
                }, 1000)
              },
              error: function (res) {
                console.log(res);
              }
            })
          } else {
            console.log('用户点击取消')
          }

        }
      })
    },
})
