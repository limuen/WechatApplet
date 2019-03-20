import {HTTP} from '../util/http.js'

class ClassicModel extends HTTP{
  getLatest(sCallback){
    this.request({
      url: '/classic/latest',
      success: (res) => {
        sCallback(res)
        this._setLatestIndex(res.data.index)
        let key = this._getKey(res.data.index)
        wx.setStorageSync(key, res.data)
      }
    })
  }
  // 获取当前一期的上一期
  // getPrev(index, sCallback){
  //   this.request({
  //     url: '/classic/' + index + '/previous',
  //     success: (res) => {
  //       sCallback(res)
  //     }
  //   })
  // }

  getClassic(index,nextOrPreious,sCallBack){
    // 先从缓存从寻找 or 请求数据 写入到缓存中
    // key 确定key
    let key = nextOrPreious == 'next'? this._getKey(index +1) :this._getKey(index-1)
    let classic = wx.getStorageSync(key);
    // console.log(key)
    if(!classic){
      this.request({
        url: `/classic/${index}/${nextOrPreious}`,
        success: (res) => {
          wx.setStorageSync(this._getKey(res.data.index), res.data)
          sCallBack(res.data)
        }
      })
    }else{
      sCallBack(classic)
    }
    
  }

  isFirst(index){
    return index ==1 ? true : false
  }

  isLatest(index){
    let latestIndex = this._getLatestIndex()
    return latestIndex == index ? true : false
  }

  getMyFavor(success) {
    const params = {
      url: '/classic/favor',
      success: success
    }
    this.request(params)
  }

  getById(cid, type, success) {
    let params = {
      url: `/classic/${type}/${cid}`,
      success: success
    }
    this.request(params)
  }

  _setLatestIndex(index){
    wx.setStorageSync('Latest', index);
  }

  _getLatestIndex(){
    let index = wx.getStorageSync('Latest')
    return index
  }

  _getKey(index){
    let key = 'classic-' + index
    return key
  }
   
}

export { ClassicModel}