// pages/online/online.js
var util = require('../../utils/util.js')
var app = getApp();
Page({
  data: {
    dates: '2019-1-1',
    times: '12:00',
    index: 0,
    array: ["水稻","大豆","玉米","土豆","小麦","果树","其他作物",],
    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,
    notice_str: '',
    index: 0,
    modalHidden3:true,
    name:"",
    phone:"",
    mu:0,
    server:[],
    modalHiddenMu:true,
    modalHiddenName: true,
    modalHiddenServer: true,
    modalHiddenPhone: true,
    hide:true,
    // 省市区三级联动初始化
    region: ["辽宁省", "沈阳市", "沈河区"]
  },
  // 选择省市区函数
  changeRegin(e) {
    this.setData({ region: e.detail.value });
  },
  // 选择三级联动
  changeMultiPicker3(e) {
    this.setData({ multiIndex3: e.detail.value })
  },
  //  点击时间组件确定事件  
  bindTimeChange: function (e) {
    console.log("谁哦按")
    this.setData({
      times: e.detail.value
    })
  },
  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },
  toast1Change: function (e) {
    this.setData({ toast1Hidden: true });
  },
  //弹出提示框
  modalTap2: function (e) {
    this.setData({
      modalHidden2: false
    })
  },
  modalTap3: function (e) {
    this.setData({
      modalHidden3: false
    })
  },
  modalChange3: function (e) {
    this.setData({
      modalHidden3: true
    })
  },
  modalChange2: function (e) {
    this.setData({
      modalHidden2: true
    })
  },
  //确定提示名字不为空
  modalChangeName: function (e) {
    this.setData({
      modalHiddenName: true
    })
  },
  modalChangePhone: function (e) {
    this.setData({
      modalHiddenPhone: true
    })
  },
  //确定提示土地面积不为0
  modalChangeMu: function (e) {
    this.setData({
      modalHiddenMu: true
    })
  },
  modalChangeServer: function (e) {
    this.setData({
      modalHiddenServer: true
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  changeName: function (e) {
    this.setData({ name: e.detail.value })
    console.log(e.detail.value)
  },
  changePhone: function (e) {
    this.setData({ phone: e.detail.value })
    console.log(e.detail.value)
  },
  changeMu:function(e){
    this.setData({mu: e.detail.value })
    console.log(e.detail.value)
  },
  changeServer: function (e) {
    this.setData({ server: e.detail.value })
    console.log(e.detail.value)
  },
  hideChange: function () {
    this.setData({
      hide: true
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  formSubmit:function(e){
    var that = this;
    var reg = new RegExp("^[0-9]*$");
    var formData = e.detail.value;
    console.log(formData);
    var price;
    var mu = that.data.mu;
    var name = that.data.name;
    var server = that.data.server;
    var phone = that.data.phone;
    if (name == "" && name.trim() == "") {
      that.setData({
        modalHiddenName: false
      })
      return false;
    }
    if (phone == "") {
      that.setData({
        modalHiddenPhone: false
      })
      return false;
    }
    if(that.data.region == ""){
      that.setData({
        hide: false,
        message: "请选择服务地点！"
      })
      return false
    }
    if (that.data.dates == "" || that.data.times == "") {
      that.setData({
        hide: false,
        message: "请选择预约时间！"
      })
      return false
    }
    if(mu == 0 || mu == ""){
      that.setData({
        modalHiddenMu:false
      })
      return false;
    }
    if (server.length == 0) {
      that.setData({
        modalHiddenServer: false
      })
      return false;
    }
    if (!reg.test(that.data.mu)) {
      that.setData({
        hide: false,
        message: "土地面积请输入数字！"
      })
      return false
    }
    if (mu >= 0 && mu <= 100) {
      price = mu * 8;
    }
    if (mu > 100 && mu <= 500) {
      price = mu * 7;
    }
    if (mu > 500) {
      price = mu * 6;
    }
    that.setData({
      price: price
    })
    console.log(price)
    wx.navigateTo({
      url: "../submit/submit?data=" + JSON.stringify(formData)+"&price="+price,
    });

  },
  formReset: function () {
    this.setData({
      name:"",
      phone: "",
      region:"",
      dates:"",
      times:"",
      mu:0,
      server: [],
      index: 0
    })
    console.log('form发生了reset事件');
    this.modalTap2();
  },

})
