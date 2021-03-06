// pages/posts/post.js
const { postList } = require('../../data/posts-data.js') 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postList: postList
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onPostTap: function (event) {
    const postId = event.currentTarget.dataset.postid
    console.log('获取到的postId'+ postId)
    wx.navigateTo({
      url: `post-detail/post-detail?id=${postId}`,
    })
  },
  onSwipperTap: function (event) {
    // target 和 currentTarget
    // taget指的是当前点击的组件 currentTarget指的是事件捕获的组件
    const postId = event.target.dataset.postid
    wx.navigateTo({
      url: `post-detail/post-detail?id=${postId}`,
    })
  },
  onLoad: function (options) {
    console.log('postList', postList)
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