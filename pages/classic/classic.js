import {
  ClassicModel
} from '../../models/classic.js'
import {
  LikeModel
} from '../../models/like.js'
let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
    
  },
  onLike: function(event) {
    console.log(event);
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },
  onNext: function(event) {
    this._updataClassic('next')
  },
  // 获取当前一期的上一期
  onPrevious: function(event) {
    // console.log(this.data)
    this._updataClassic('previous')
  },

  _updataClassic: function(nextOrPrevious) {
    let index = this.data.classic.index
    classicModel.getClassic(index, nextOrPrevious, (res) => {
      // console.log(res)
      this._getLikeStatus(res.id, res.type)
      this.setData({
        classic: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },

  _getLikeStatus: function(artID, category) {
    likeModel.getClassicLikeStatus(artID, category,
      (res) => {
        this.setData({
          likeStatus: res.data.like_status,
          likeCount: res.data.fav_nums
        })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    classicModel.getLatest((res) => {
      // console.log(res)
      this.setData({
        classic: res.data,
        likeCount: res.data.fav_nums,
        likeStatus: res.data.like_status
      })

    })
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