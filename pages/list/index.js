const interfaces = require("../../utils/urlconfig.js");

// pages/list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prolist:[]
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
  switchProlistDetail:function(e){
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