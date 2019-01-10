// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartArray: [],
    totalMoney: "0.00", // 總價
    totalCount: 0, // 商品數量
    selectAll: false //  是否全選
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    const self = this;
    wx.getStorage({
      key: 'cartInfo',
      success: function(res) {
        const cartArray = res.data;

        cartArray.forEach(function(cart) {
          cart.select = false;
        });

        self.setData({
          cartArray: cartArray,
          selectAll:false,
          totalMoney: "0.00",
          totalCount:0
        })
        // console.log(cartArray);

        // 設置tabbar 購物車圖標
        if (cartArray.length > 0) {
          wx.setTabBarBadge({
            index: 2,
            text: String(cartArray.length),
          })
        } else {
          wx.removeTabBarBadge({
            index: 2,
          })
        }

      },
    })
  },
  onGetCount: function(e) {
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;
    console.log(cartArray);
    cartArray[index].total = e.detail.val;

    // 更新data
    this.setData({
      cartArray: cartArray
    })
  },

  // 跳到商品detail
  switchGoodDetail: function(e) {
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;
    wx.navigateTo({
      url: '/pages/detail/index?id=' + cartArray[index].id,
    });
  },

  selectGood: function(e) {
    // console.log(e);
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;
    cartArray[index].select = !cartArray[index].select;

    console.log(cartArray);
    // 合計 數量
    let totalMoney = Number(this.data.totalMoney);
    let totalCount = this.data.totalCount;

    // 選中狀態
    let selectAll = this.data.selectAll;

    if (cartArray[index].select) {
      totalMoney += Number(cartArray[index].price) * cartArray[index].total;
      totalCount++;
    } else {
      totalMoney -= Number(cartArray[index].price) * cartArray[index].total;
      totalCount--;
      selectAll = false;
    }

    // 更新數據
    this.setData({
      cartArray: cartArray,
      totalMoney: String(totalMoney.toFixed(2)),
      totalCount: totalCount,
      selectAll: selectAll
    })
  },

  subCount: function(e) {
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;
    let totalMoney = Number(this.data.totalMoney);

    // 計算金額
    if (cartArray[index].select) {
      totalMoney -= Number(cartArray[index].price)
    }

    // 更新數據
    this.setData({
      totalMoney: String(totalMoney.toFixed(2))
    })
  },
  addCount: function(e) {
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;
    let totalMoney = Number(this.data.totalMoney);

    // 計算金額
    if (cartArray[index].select) {
      totalMoney += Number(cartArray[index].price)
    }

    // 更新數據
    this.setData({
      totalMoney: String(totalMoney.toFixed(2))
    })
  },

  // 全選
  selectAll: function() {
    const cartArray = this.data.cartArray;
    let totalMoney = 0;
    let totalCount = 0;
    let selectAll = this.data.selectAll;

    selectAll = !selectAll;
    cartArray.forEach(function(cart) {
      // 設置選中或不選中
      cart.select = selectAll;

      // 計算總金額與總數
      if (cart.select) {
        totalMoney += Number(cart.price * cart.total);
        totalCount++;
      } else {
        // 全不選
        totalMoney = 0
        totalCount = 0
      }
    });
    // 更新data
    this.setData({
      cartArray: cartArray,
      totalMoney: String(totalMoney.toFixed(2)),
      totalCount: totalCount,
      selectAll: selectAll
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    // 頁面離開時更新storage
    const cartArray = this.data.cartArray;
    wx.setStorage({
      key: 'cartInfo',
      data: cartArray,
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})