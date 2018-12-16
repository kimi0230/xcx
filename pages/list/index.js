const interfaces = require("../../utils/urlconfig.js");

// pages/list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prolist: [],
    page: 1,
    size: 5,
    noData: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options);
    wx.setNavigationBarTitle({
      title: options.title
    });

    const self = this;

    wx.showLoading({
      title: "Loading...",
    })

    wx.request({
      url: interfaces.productionsList,
      header: {
        "content-type": "application/json"
      },
      success(res) {
        // console.log(res.data);
        // console.log(self);
        self.setData({
          prolist: res.data
        })
      }
    })

    wx.hideLoading();

  },
  switchProlistDetail: function(e) {
    console.log(e);
    let index = e.currentTarget.dataset.index;

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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

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
    //顯示加載狀態
    wx.showNavigationBarLoading();
    //下拉刷新
    const self = this;

    self.setData({
      page: 1,
      noData: false
    })
    
    wx.request({
      url: interfaces.productionsList,
      header: {
        "content-type": "application/json"
      },
      success(res) {
        self.setData({
          prolist: res.data
        })
        // 隱藏加載狀態
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    //上拉加載

    //停止下拉刷新
    wx.stopPullDownRefresh();
    wx.showNavigationBarLoading();

    const prolist = this.data.prolist;
    let page = this.data.page;

    this.setData({
      page: ++page
    });

    const self = this;
    wx.request({
      url: interfaces.productionsList + '/' + self.data.page + '/' + self.data.size,
      success(res) {
        if (res.data.length == 0) {
          self.setData({
            noData: true
          })
        } else {
          res.data.forEach(item => {
            prolist.push(item);
          })
          // prolist.push.apply(prolist,res.data);
          // console.log(res.data);
          // console.log(prolist);
          self.setData({
            prolist: prolist
          })
        }

        // 隱藏加載狀態
        wx.hideNavigationBarLoading();
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})