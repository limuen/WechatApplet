// components/search/index.js
import {
  KeywordModel
} from '../../models/keyword.js'
import {
  BookModel
} from '../../models/book.js'
const keywordModel = new KeywordModel()
const bookModel = new BookModel()



Component({
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer: "load_more"
    }
  },



  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    dataArray: [],
    searching: false,
    q: ""
  },

  attached() {
    // const historyWords = keywordModel.getHistory()
    // console.log(historyWords)
    // const hotWords = keywordModel.getHot()
    this.setData({
      historyWords: keywordModel.getHistory()
    })
    keywordModel.getHot().then(res => {
      console.log(res)
      this.setData({
        hotWords: res.data.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadMore() {
      if (!this.data.q) {
        return
      }
      if (this.isLocked()) {
        return
      }
      if (this.hasMore()) {
        this.locked()
        bookModel.search(this.getCurrentStart(), this.data.q)
          .then(res => {
            this.setMoreData(res.data.books)
            this.unLocked()
          }, () => {
            this.unLocked()
          })
        // 死锁
      }
    },
    onCancel(event) {
      this.triggerEvent('cancel', {}, {})
    },
    onDelete(event) {
      this.setData({
        searching: false
      })
    },
    onConfirm(event) {

      this.setData({
        searching: true
      })

      const q = event.detail.value || event.detail.text
      bookModel.search(0, q)
        .then(res => {
          console.log(res)
          this.setData({
            dataArray: res.data.books,
            q
          })
          keywordModel.addToHistory(q)
        })
    },
    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },

    _showResult() {
      this.setData({
        searching: true
      })
    },

    _closeResult() {
      this.setData({
        searching: false,
        q: ''
      })
    }
  }
})