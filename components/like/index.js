// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean
    },
    readOnly: {
      type: Number
    },
    count: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 数据绑定
    yesSrc: 'images/like.png',
    noSrc: 'images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLick: function(event) {
      if(this.properties.readOnly){
        return
      }
      // 获取到图片的状态 当前为false
      let like = this.properties.like
      // 获取到点赞的数量 默认为0
      let count = this.properties.count

      count = like ? count - 1 : count + 1

      this.setData({
        count: count,
        // 点击完以后 like默认的false改为true
        like: !like
      })
      // 激活
      let behavior = this.properties.like ? 'like' : 'cancel'
      this.triggerEvent('like', {
        behavior: behavior
      }, {})
    }
  }
})