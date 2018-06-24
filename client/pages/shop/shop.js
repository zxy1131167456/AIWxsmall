var app = getApp()
Page({
  data: {
    // input默认是1  
    num: 0,
    price:0,
    a:"暂无商品",
    // 使用data数据对象设置样式名  
    minusStatus: 'disabled' ,
    hidden: false,
    curNav: 1,
    curIndex: 0,
    hide:true,
    choose: false,
    animationData: {},
    cart: [

    ],
    cartTotal: 0,
    navList: [
      {
        id: 1,
        name: '化肥'
      },
      {
        id: 2,
        name: '农药'
      },
    ],
    dishesList: [
      [
        {
          name: "复合肥",
          prices: 28,
          num: 0,
          // id: 1,
          url: '/image/1.jpg'
        },
        {
          name: "速效复合肥",
          prices: 38,
          num: 0,
          // id: 29,
          url: '/image/2.jpg'
        },
        {
          name: "配方肥",
          prices: 58,
          num: 0,
          // id: 2,
          url: '/image/3.jpg'
        },
        {
          name: "通用型复合肥",
          prices: 68,
          num: 0,
          // id: 2,
          url: '/image/4.jpg'
        },
      ],
      [
        {
          name: "杀虫剂",
          prices: 18,
          num: 0,
          // id: 3,
          url: '/image/5.jpg'
        },
        {
          name: "甲维盐",
          prices: 58,
          num: 0,
          // id: 4,
          url: '/image/6.jpg'
        },
        {
          name: "强力杀虫剂",
          prices: 58,
          num: 0,
          // id: 4,
          url: '/image/7.jpg'
        },
        {
          name: "丰收灵",
          prices: 60,
          num: 0,
          // id: 4,
          url: '/image/8.jpg'
        }
      ],
    ],
    dishes: []
  },
  hideChange: function () {
    this.setData({
      hide: true
    })
  },
  loadingChange() {
    setTimeout(() => {
      this.setData({
        hidden: true
      })
    }, 2000)
  },
  selectNav(event) {
    let id = event.target.dataset.id,
      index = parseInt(event.target.dataset.index);
    self = this;
    this.setData({
      curNav: id,
      curIndex: index
    })
  },

  selectDish(event) {
    let dish = event.currentTarget.dataset.dish;
    console.log(dish)
    let flag = true;
    let cart = this.data.cart;
    if (cart.length > 0) {
      cart.forEach(function (item, index) {
        if (item == dish) {
          cart.splice(index, 1);
          flag = false;
        }
      })
    }
    if (flag) cart.push(dish);
    this.setData({
      cartTotal: cart.length
    })
    this.setStatus(dish)
  },
  setStatus(dishId) {
    let dishes = this.data.dishesList;
    for (let dish of dishes) {
      dish.forEach((item) => {
        if (item.id == dishId) {
          item.status = !item.status || false
        }
      })
    }

    this.setData({
      dishesList: this.data.dishesList
    })
  },

  getTotal:function(){
      var that = this
    //获取全局data里面的所有化肥农药数组
      var carts = that.data.dishesList;
      //各个农药化肥数量存入的数组
      var numAll=[];
      //各个价钱存入的数组
      var priceAll=[];
      //总数量
      var num = 0;
      //总价格
      var price = 0;
      //用户添加到购物车里面的商品
      var cart1 = [];
      // console.log(carts)
      //遍历所有的农药化肥
      for(let i = 0;i<2;i++){
        for(let j = 0; j<4;j++){
          console.log(carts[i][j]);
          console.log(carts[i][j].num);
          // console.log(carts[i][j].num * carts[i][j].price)
          //将所有的num存入数组
          numAll.push(carts[i][j].num);
          //将数量*价钱的总价格存入数组
          priceAll.push(carts[i][j].num * carts[i][j].prices);
          //如果这个农药化肥数量大于0则存入用户购物车数组
          if (carts[i][j].num > 0) {
            cart1.push(carts[i][j])
          }
        }
      }
      console.log(that.data.cart)
      //循环遍历相加数组里面的所有数
      for(var i=0;i<numAll.length;i++){
        num += parseInt(numAll[i]);
        price += priceAll[i];
      }
      console.log(that.data.cart)
      // console.log(num);
      // console.log(price);
      //将两个值存入data
      that.setData({
        num: num,
        price: parseInt(price)
      })
      console.log(that.data.cart)
      console.log(cart1)
      // console.log(cart);
      that.setData({
        cart:cart1
      })
      console.log(that.data.cart)
  },
  accountTap:function(){
      console.log(this.data.cart);
      wx.navigateTo({
        url: "../account/account?cart=" + JSON.stringify(this.data.cart) + "&price=" + this.data.price + "&num=" + this.data.num,
      });
  },

  /* 点击减号 */
  bindMinus: function (e) {
    // console.log(e);
    let index = e.currentTarget.dataset.index;
    // console.log(index);
    let carts = this.data.dishesList[this.data.curIndex];
    // console.log(carts);
    var num = carts[index].num;
    // 如果大于0时，才可以减  
    if (num > 0) {
      num = --carts[index].num;
    }
    this.getTotal();
  },
  /* 点击加号 */
  bindPlus: function (e) {
    // console.log(e);
    //获取到当前点击的索引值
    let index = e.currentTarget.dataset.index;
    // console.log(index);
    //取到化肥还是农药的对应的数组
    let carts = this.data.dishesList[this.data.curIndex];
    // console.log(carts);
    //根据索引index找到对应的num值
    if (carts[index].num < 1000){
    var num = ++carts[index].num;
    }else{
      carts[index].num = 1000
      this.setData({
        hide: false,
        message: "库存不足！"
      })
    }
    this.getTotal();
  },
  
  /* 输入框事件 */
  bindManual: function (e) {
    //获取输入的值
    var numInput = parseInt(e.detail.value);
    if(numInput == ""){
      numInput = 0
    }
    if (numInput >= 1000) {
      numInput = 1000
      this.setData({
        hide: false,
        message: "库存不足！"
      })
    }
    // console.log(e);
    let index = e.currentTarget.dataset.index;
    let index1 = this.data.curIndex
    // console.log(index);
    let carts = this.data.dishesList[this.data.curIndex];
    // console.log(carts);
    //使对应num值等于输入的值
    carts[index].num = numInput;
    //为了使失去焦点后立即生效，拼接字符串，使得data里面的二维数组中也就是商品中的num值立即改变
    var up = "dishesList[" + index1 + "][" + index +"].num"
    this.setData({
      [up]:numInput
    })
    this.getTotal();
  },
  cartInout: function (e) {
    // 用that取代this，防止不必要的情况发生
    var that = this;
    if(!that.data.choose){
      // 创建一个动画实例
      var animation = wx.createAnimation({
        // 动画持续时间
        duration: 100,
        // 定义动画效果，当前是匀速
        timingFunction: 'linear'
      })
      // 将该变量赋值给当前动画
      that.animation = animation
      // 先在y轴偏移，然后用step()完成一个动画
      animation.translateY(200).step()
      // 用setData改变当前动画
      that.setData({
        // 通过export()方法导出数据
        animationData: animation.export(),
        // 改变view里面的Wx：if
        choose: true
      })
      // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
      setTimeout(function () {
        animation.translateY(0).step()
        that.setData({
          animationData: animation.export()
        })
      }, 200)
    }else{
      that.hideModal()
    }
  },
  hideModal: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      animationData: animation.export()

    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        choose: false
      })
    }, 50)
  },
  onLoad() {
    this.loadingChange()
  }
})