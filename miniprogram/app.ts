//app.ts
export interface IMyApp {
    userInfoReadyCallback?(res: wx.UserInfo): void
    globalData: {
        StatusBar?: number,
        Custom?: any,
        CustomBar?: any
    }
}

App<IMyApp>({
    onLaunch: function () {
        wx.getSystemInfo({
            success: e => {
                this.globalData.StatusBar = e.statusBarHeight;
                let custom = wx.getMenuButtonBoundingClientRect();
                this.globalData.Custom = custom;
                this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
            }
        })
    },
    onShow() {

    },

    globalData: {
    }
})