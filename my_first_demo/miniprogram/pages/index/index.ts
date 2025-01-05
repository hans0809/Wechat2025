// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    userInfo: {
      avatarUrl: '',
      nickName: ''
    },
    previewImage: '',
    currentStyle: 1,
    styleList: [
      { 
        id: 1, 
        thumb: '/images/style1_thumb.png',
        image: '/images/style1.png'
      },
      { 
        id: 2, 
        thumb: '/images/style2_thumb.png',
        image: '/images/style2.png'
      },
      { 
        id: 3, 
        thumb: '/images/style3_thumb.png',
        image: '/images/style3.png'
      }
    ]
  },

  // 选择样式
  selectStyle(e: any) {
    const styleId = e.currentTarget.dataset.id
    this.setData({
      currentStyle: styleId,
      previewImage: ''  // 清除之前的预览图
    })
    
    // 可以添加选中效果的提示
    wx.showToast({
      title: `已选择样式${styleId}`,
      icon: 'none'
    })
  },

  // 获取用户头像
  onChooseAvatar(e: any) {
    const { avatarUrl } = e.detail
    this.setData({
      'userInfo.avatarUrl': avatarUrl,
      previewImage: ''
    })
  },

  // 生成头像
  async generateAvatar() {
    if (!this.data.userInfo.avatarUrl) {
      wx.showToast({ title: '请先选择头像', icon: 'none' })
      return
    }

    wx.showLoading({ title: '生成中...' })

    try {
      // 获取画布节点
      const query = wx.createSelectorQuery()
      const canvas = await new Promise<WechatMiniprogram.Canvas>((resolve, reject) => {
        query.select('#avatarCanvas')
          .fields({ node: true, size: true })
          .exec((res) => {
            if (!res[0]?.node) {
              reject(new Error('获取画布失败'))
              return
            }
            resolve(res[0].node)
          })
      })

      const ctx = canvas.getContext('2d')
      
      // 设置画布尺寸
      canvas.width = 300
      canvas.height = 300

      // 加载头像图片
      const avatarImg = canvas.createImage()
      await new Promise((resolve, reject) => {
        avatarImg.onload = resolve
        avatarImg.onerror = reject
        avatarImg.src = this.data.userInfo.avatarUrl
      })

      // 加载装饰图片
      const currentStyle = this.data.styleList.find(item => item.id === this.data.currentStyle)
      if (!currentStyle) {
        throw new Error('找不到选中的样式')
      }

      const styleImg = canvas.createImage()
      await new Promise((resolve, reject) => {
        styleImg.onload = resolve
        styleImg.onerror = reject
        styleImg.src = currentStyle.thumb
      })

      // 清空画布
      ctx.clearRect(0, 0, 300, 300)

      // 绘制圆形头像
      ctx.save()
      ctx.beginPath()
      ctx.arc(150, 150, 150, 0, Math.PI * 2)
      ctx.clip()
      ctx.drawImage(avatarImg, 0, 0, 300, 300)
      ctx.restore()

      // 绘制装饰
      ctx.drawImage(styleImg, 0, 0, 300, 300)

      // 生成图片
      wx.canvasToTempFilePath({
        canvas: canvas,
        width: 300,
        height: 300,
        destWidth: 600,
        destHeight: 600,
        success: (res) => {
          this.setData({
            previewImage: res.tempFilePath
          })
          wx.hideLoading()
        },
        fail: (error) => {
          console.error('生成预览图失败:', error)
          wx.hideLoading()
          wx.showToast({ title: '生成失败', icon: 'none' })
        }
      })

    } catch (error) {
      console.error('生成头像失败:', error)
      wx.hideLoading()
      wx.showToast({ 
        title: '生成失败，请重试',
        icon: 'none',
        duration: 2000
      })
    }
  },

  // 保存图片
  saveImage() {
    if (!this.data.previewImage) {
      wx.showToast({ title: '请先生成头像', icon: 'none' })
      return
    }

    wx.saveImageToPhotosAlbum({
      filePath: this.data.previewImage,
      success: () => {
        wx.showToast({ title: '保存成功', icon: 'success' })
      },
      fail: () => {
        wx.showToast({ title: '保存失败', icon: 'none' })
      }
    })
  }
})
