// components/buy/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hideBuy: {
      type: Boolean,
      value: true
    },
    partData: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideBuyView(e) {
      if (e.target.dataset.target == "self") {
        this.setData({
          hideBuy: true
        })
      }
    },
    getCount(e) {
      // 事件傳遞 (傳給父 detail/index.wxml)
      this.triggerEvent('onGetCount', e.detail);
    },
    buy(e){
      this.setData({
        hideBuy:true
      })

      // 事件傳遞 (傳給父 detail/index.wxml)
      this.triggerEvent('buyEvent');
    }
  }
})