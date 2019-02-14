// pages/posts/post-detail/post-detail.js
const { postList } = require('../../../data/posts-data.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let globalData = app.globalData
    const postId = options.id
    this.data['postId'] = postId
    let postData = postList[postId]
    this.setData(postData)
    let postCollected = wx.getStorageSync('post-collected')
    if (postCollected) {
      let collected = postCollected[postId]
      this.setData({
        collected
      })
    } else {
      let postCollected = {}
      postCollected[postId] = false
      wx.setStorageSync('post-collected', postCollected)
    }
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId) {
      this.data.isPlayingMusic = true
    } 
    this.setAudioMonitor()
  },
  setAudioMonitor: function () {
    var that = this
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true
      app.globalData.g_currentMusicPostId = that.data.postId
    })
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false
      app.globalData.g_currentMusicPostId = null
    })
    wx.onBackgroundAudioStop(() => {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false
      app.globalData.g_currentMusicPostId = null
    })
  },
  onCollectionTap: function (event) {
    let postCollected = wx.getStorageSync('post-collected')
    let collected = postCollected[this.data.postId]
    collected = !collected
    postCollected[this.data.postId] = collected
    wx.setStorageSync('post-collected', postCollected)
    this.setData({collected})
    wx.showToast({
      title: collected ? '收藏成功' : '取消成功',
    })
  },
  onShareTap: function (event) {
    let itemList = ['分享给微信好友', '分享到朋友圈', '分享到QQ', '分享到微博']
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#405f80',
      success: function(res) {
        // res.cancel 用户是不是点击了取消按钮
        // res.tapIndex 数组元素的序号 从0开始
        wx.showModal({
          title: '用户'+ itemList[res.tapIndex],
          content: '现在还无法分享'
        })
      }
    })
  },
  onMusicTap: function (event) {
    let { music } = this.data
    let isPlayingMusic = this.data.isPlayingMusic
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio()
      this.setData({
        isPlayingMusic: false
      })
    } else {
      if (music) {
        wx.playBackgroundAudio({
          dataUrl: "http://music.163.com/song/media/outer/url?id=1335968314",
          title: '北京一夜',
          coverImgUrl: 'http://p1.music.126.net/WnUyz9DEueAka69kgEAMWA==/109951163753267720.jpg'
        })
        this.setData({
          isPlayingMusic: true
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})