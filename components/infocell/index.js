// components/infocell/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 左側標題
    title: { //屬性名
      type: String, //類型(必填) String, Number, Boolean, Object, Array, null
      value: '' // 屬性初始值(可選)
    },
    desc: {
      type: String,
      value: ''
    }
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
    popView: function () {
      console.log("popView");
      // 註冊事件
      this.triggerEvent('popView')
    }
  }
})