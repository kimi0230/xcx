// components/amount/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count: {
      type: Number,
      value: 1
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
    inputChangeHandle(e) {
      console.log(e);
      let value = e.detail.value;
      let myEventDetail = {
        val: value
      }
      // 事件傳遞 (傳給父 buy/index.wxml)
      this.triggerEvent('myevent', myEventDetail);

    },
    subtract(e) {
      // console.log(e);
      let count = this.data.count;

      if (count > 1) {
        count--;
      } else {
        count = 1;
      }

      this.setData({
        val: count
      })

      let myEventDetail = {
        val: count
      }
      // 事件傳遞 (傳給父 buy/index.wxml)
      this.triggerEvent('myevent', myEventDetail);

      // 點擊減號觸發
      this.triggerEvent('subevent');
    },
    add(e) {
      let count = this.data.count;
      count++;

      this.setData({
        val: count
      })

      let myEventDetail = {
        val: count
      }
      // 事件傳遞 (傳給父 buy/index.wxml)
      this.triggerEvent('myevent', myEventDetail);

      // 點擊加號觸發
      this.triggerEvent('addevent');
    }
  }
})