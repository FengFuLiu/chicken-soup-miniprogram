//index.js
//获取应用实例
type BoyContentProps = {
  date: string;
  weather: string;
  content: string
}

type ListProps = {
  uri: string;
  soup: string,
  said: string,
}

const monthEnglish = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Spt", "Oct", "Nov", "Dec"]
const request = (params: { url: any, responseType?: any }) => {
  const { url, responseType = 'text' } = params
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      responseType,
      success: function (res) {
        resolve(res)
      }, fail(err) {
        reject({
          msg: '请求失败',
          url,
          err,
        })
      }
    })
  })
}

Page({
  data: {
    soup: '',
    said: '',
    contentBoy: {} as BoyContentProps,
    isBoyContent: true,
    nowDate: '',
    wallpaper: '',
    day: 0,
    year: 0,
    month: '',
    list: [] as ListProps[],
    wallpaperList: []
  },
  async onLoad() {
    this.getDate();
    var date = new Date();
    var nowMonth = date.getMonth() + 1;
    var strDate = date.getDate();
    this.setData!({
      nowDate: nowMonth + '-' + strDate + '日'
    })
    try {
      const value = wx.getStorageSync('wallpaperList');
      if (value) {
        this.setData({
          wallpaperList: value
        }, async () => {
          await Promise.all(new Array(3).fill(1).map(_item => this.combineData()));
        })
      } else {
        await Promise.all(new Array(3).fill(1).map(_item => this.combineData()));
        await this.getOtherWallpaper();
      }
    } catch (e) {
      await this.getOtherWallpaper();
      await Promise.all(new Array(3).fill(1).map(_item => this.combineData()));
    }
  },
  onShow() {
  },
  handleSwiper(e) {
    const { current } = e.detail;
    if (current >= this.data.list.length - 2) {
      this.combineData()
    }
  },
  async combineData() {
    await Promise.all([this.getOneSaidContent(), this.getSoupContent()]);
    const index = randomNum(0, this.data.wallpaperList.length - 1)
    this.setData({
      list: [...this.data.list, { uri: this.data.wallpaperList[index].url, soup: this.data.soup, said: this.data.soup }]
    }, () => { console.log(this.data.list) })
  },
  getDate() {
    const date = new Date();
    console.log(new Date().getDay())
    this.setData({
      day: date.getDate(),
      month: monthEnglish[Number(date.getMonth())],
      year: date.getFullYear()
    })
  },
  async getOtherWallpaper() {
    try {
      const res = await request({
        // url: 'https://bing.biturl.top/?resolution=1366&format=json&index=1&mkt=zh-CN',
        url: 'https://wallpaper-api.smartisan.com/app/index.php?r=paperapi/index/list&client_version=2&limit=2470'
      })
      console.log(res);
      try {
        wx.setStorageSync('wallpaperList', res.data.data)
      } catch (e) { }
      this.setData({
        wallpaperList: res.data.data
      })
    } catch (error) {
      this.getOtherWallpaper()
    }
  },
  async getWallpaper() {
    try {
      const res = await request({
        url: 'https://bing.ioliu.cn/v1/rand?w=720&h=1280',
        responseType: 'arraybuffer',
      })
      if (res.statusCode === 403) {
        await this.getOtherWallpaper()
      } else {
        let url = 'data:image/png;base64,' + wx.arrayBufferToBase64(res.data as ArrayBuffer);
        this.setData({
          wallpaper: url
        })
      }
    } catch (error) {
      this.getWallpaper()
    }
  },
  toggleEvent() {
    this.setData!({
      isBoyContent: !this.data.isBoyContent
    })
    if (this.data.isBoyContent) {
      this.getDogContent()
    } else {
      this.getSoupContent()
    }
  },
  async getSoupContent() {
    try {
      const res = await request({
        url: 'https://api.qinor.cn/soup/',
      })
      this.setData({
        soup: res.data as string
      })
    } catch (error) {
      this.getSoupContent()
    }
  },
  async getOneSaidContent() {
    try {
      const res = await request({
        url: 'https://api.guaqb.cn/v1/onesaid/',
      })
      this.setData({
        said: res.data
      })
    } catch (error) {
      this.getOneSaidContent()
    }
  },
  async getDogContent() {
    try {
      const res = await request({
        url: 'https://www.somekey.cn/tiangou/random.php',
      })
      this.setData({
        contentBoy: res.data.data
      })
    } catch (error) {
      this.getDogContent()
    }
  },

  setClipboardData() {
    let data = '';
    if (this.data.isBoyContent) {
      data = this.data.nowDate + this.data.contentBoy.weather + this.data.contentBoy.content
    } else {
      data = this.data.soup
    }
    wx.setClipboardData({
      data: data,
      success(res) {
        wx.hideToast()
        wx.getClipboardData({
          success(res) {
          }
        })
      }
    })
  },
  onShareAppMessage(): object {
    let that = this;
    return {
      title: that.data.soup,
    }
  }

})
//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;
    default:
      return 0;
      break;
  }
}