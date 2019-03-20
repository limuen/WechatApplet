import {
  BookModel
} from '../../models/book.js'
import {
  random
} from '../../util/common.js'


const bookModel = new BookModel()
// pages/book/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching: false,
    more:0
  },

  onSeaching(event) {
    this.setData({
      searching: true
    })
  },
  onCancel(event){
    this.setData({
      searching:false
    })
  },
  onReachBottom(){
    this.setData({
      more:random(16)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    bookModel.getHotList()
      .then(res => {
        console.log(res)
        this.setData({
          books: res.data
        })
      })

    // const hotList = bookModel.getHotList()

    // hotList.then(
    //   res => {
    //     console.log(res)
    //     bookModel.getMyBookCount()
    //       .then(res => {
    //         console.log(res.count)
    //         bookModel.getMyBookCount()
    //           .then(res => {
    //             console.log(res.count)
    //           })
    //       })
    //   }
    // )


    // Promise第一步
    // 异步代码 写在promise的函数中 第二步
    // const promise = new Promise((resolve, reject) => {
    //   // pending  fulfiller rejected
    //   // 进行中     已成功    已失败  一旦修改凝固  就不能改变
    //   wx.getSystemInfo({
    //     success: res => resolve(res),
    //     fail: error => reject(error)
    //   })
    // })
    // // Promise的回调函数.then
    // promise.then(
    //   res => console.log(res),
    //   error => console.log(res)
    // )


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