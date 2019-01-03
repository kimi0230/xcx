// components/IOU/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hideBaitiao: {
      type: Boolean,
      value: true
    },
    baitiao: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideBaitiaoView(e) {
      // console.log(e);
      if (e.target.dataset.target == "self") {
        this.setData({
          hideBaitiao: true
        })
      }
    },
    selectItem(e) {
      // console.log(e);
      let index = e.currentTarget.dataset.index;
      let baitiao = this.data.baitiao;
      for (let i = 0; i < baitiao.length; i++) {
        baitiao[i].select = false;
      }
      baitiao[index].select = !baitiao[index].select;
      this.setData({
        baitiao: baitiao,
        selectIndex: index
      })
    },
    makeBaitiao() {
      this.setData({
        hideBaitiao: true,
      })

      const selectItem = this.data.baitiao[this.data.selectIndex];
      console.log(selectItem);

      // 事件傳遞 (傳給父 detail/index.wxml)
      this.triggerEvent('updateSelect', selectItem);
    }
  }
})