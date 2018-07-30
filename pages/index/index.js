//index.js
//获取应用实例
const app = getApp()
var numAi = 0
var timer
Page({
  data: {
   btnState: false,
   winNum: 0,
   gameOfPlay: '',
   imageUserScr: '/pages/image/wenhao.png',
   imageAiScr: '',
   srcs: [
     '/pages/image/shitou.png',
     '/pages/image/jiandao.png',
     '/pages/image/bu.png'
   ]
  },
  //生命周期，刚进来
  onLoad: function () {
    var oldWinNum = wx.getStorageSync('winNum')
    if (oldWinNum !== null && oldWinNum !== '') {
      this.data.winNum = oldWinNum
    }
    this.timerGo()
  
  },
  //点击按钮
  changeForChoose (e) {
    if (this.data.btnState === true) {
      return true
    }
    //获取数组中用户的剪刀石头布相应的图片
    this.setData({
      imageUserScr: this.data.srcs[e.currentTarget.id]
    })
    //清除计数器
    clearInterval(timer)
    
    //获取数据资源
    var user = this.data.imageUserScr
    var ai = this.data.imageAiScr
    var num = this.data.winNum
    var str = '0.0~\nYou Lost'

    //判断是否获胜
    if (user === '/pages/image/shitou.png' && ai === '/pages/image/jiandao.png') {
      num++
      str = 'Ho~\n You Win!'
      wx.setStorageSync('winNum', num)
    }
    if (user === '/pages/image/jiandao.png' && ai === '/pages/image/bu.png') {
      num++
      str = 'Ho~\n You Win!'
      wx.setStorageSync('winNum', num)
    }
    if (user === '/pages/image/bu.png' && ai === '/pages/image/shitou.png') {
      num++
      str = 'Ho~\n You Win!'
      wx.setStorageSync('winNum', num)
    }
    if (user === ai) {
      str = 'Game Draw!'
    }
    this.setData({
      winNum: num,
      gameOfPlay: str,
      btnState: true
    })
  },
  //开始计时器
  timerGo () {
    timer = setInterval(this.move, 100)
  },
  move () {
    if (numAi >= 3) {
      numAi = 0
    }
    this.setData({
      imageAiScr: this.data.srcs[numAi]
    })
    numAi ++
  },
  again () {
    if (this.data.btnState === false) {
      return true
    }
    this.timerGo()
    this.setData({
      btnState: false,
      gameOfPlay: '',
      imageUserScr: '/pages/image/wenhao.png'
    })
  },
})