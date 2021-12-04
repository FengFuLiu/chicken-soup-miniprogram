"use strict";
Page({
    data: {
        content: '',
        contentBoy: '',
        isBoyContent: true,
        nowDate: ''
    },
    onLoad: function () {
        var date = new Date();
        var nowMonth = date.getMonth() + 1;
        var strDate = date.getDate();
        this.setData({
            nowDate: nowMonth + '-' + strDate + '日'
        });
        console.log(this.data.nowDate);
    },
    onShow: function () {
        if (this.data.isBoyContent) {
            this.getBoyContent();
        }
        else {
            this.getContent();
        }
    },
    toggleEvent: function () {
        this.setData({
            isBoyContent: !this.data.isBoyContent
        });
        if (this.data.isBoyContent) {
            this.getBoyContent();
        }
        else {
            this.getContent();
        }
    },
    getContent: function () {
        var that = this;
        wx.showLoading({
            title: '加载中',
        });
        wx.request({
            url: 'https://api.qinor.cn/soup/',
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                that.setData({
                    content: res.data
                });
            },
            complete: function () {
                wx.hideLoading();
            }
        });
    },
    getBoyContent: function () {
        var that = this;
        wx.showLoading({
            title: '加载中',
        });
        wx.request({
            url: 'https://www.somekey.cn/tiangou/random.php',
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                that.setData({
                    contentBoy: res.data.data || ''
                });
            },
            complete: function () {
                wx.hideLoading();
            }
        });
    },
    jumpUrl: function () {
        wx.navigateToMiniProgram({
            appId: 'wx413b24db816ca6bf',
            path: 'pages/index/index',
            success: function (res) {
            }
        });
    },
    setClipboardData: function () {
        var data = '';
        if (this.data.isBoyContent) {
            data = this.data.nowDate + this.data.contentBoy.weather + this.data.contentBoy.content;
        }
        else {
            data = this.data.content;
        }
        wx.setClipboardData({
            data: data,
            success: function (res) {
                wx.getClipboardData({
                    success: function (res) {
                        console.log(res.data);
                    }
                });
            }
        });
    },
    onShareAppMessage: function () {
        var that = this;
        return {
            title: that.data.content,
        };
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBTUEsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osT0FBTyxFQUFFLEVBQVM7UUFDbEIsVUFBVSxFQUFFLEVBQVM7UUFDckIsWUFBWSxFQUFFLElBQWU7UUFDN0IsT0FBTyxFQUFDLEVBQVM7S0FDbEI7SUFDRCxNQUFNO1FBQ0osSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN0QixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ25DLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBUSxDQUFDO1lBQ1osT0FBTyxFQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUcsT0FBTyxHQUFDLEdBQUc7U0FDckMsQ0FBQyxDQUFBO1FBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ2hDLENBQUM7SUFDRCxNQUFNO1FBQ0osSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUMxQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7U0FDckI7YUFBTTtZQUNMLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtTQUNsQjtJQUNILENBQUM7SUFDRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLE9BQVEsQ0FBQztZQUNaLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWTtTQUN0QyxDQUFDLENBQUE7UUFDRixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQzFCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQTtTQUNyQjthQUFNO1lBQ0wsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO1NBQ2xCO0lBQ0gsQ0FBQztJQUNELFVBQVUsRUFBVjtRQUNFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixFQUFFLENBQUMsV0FBVyxDQUFDO1lBQ2IsS0FBSyxFQUFFLEtBQUs7U0FDYixDQUFDLENBQUE7UUFDRixFQUFFLENBQUMsT0FBTyxDQUFDO1lBQ1QsR0FBRyxFQUFFLDRCQUE0QjtZQUNqQyxNQUFNLEVBQUU7Z0JBQ04sY0FBYyxFQUFFLGtCQUFrQjthQUNuQztZQUNELE9BQU8sWUFBQyxHQUFHO2dCQUNULElBQUksQ0FBQyxPQUFRLENBQUM7b0JBQ1osT0FBTyxFQUFFLEdBQUcsQ0FBQyxJQUFJO2lCQUNsQixDQUFDLENBQUE7WUFDSixDQUFDO1lBQ0QsUUFBUTtnQkFDTixFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7WUFDbEIsQ0FBQztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxhQUFhLEVBQWI7UUFDRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUNiLEtBQUssRUFBRSxLQUFLO1NBQ2IsQ0FBQyxDQUFBO1FBQ0YsRUFBRSxDQUFDLE9BQU8sQ0FBQztZQUNULEdBQUcsRUFBRSwyQ0FBMkM7WUFDaEQsTUFBTSxFQUFFO2dCQUNOLGNBQWMsRUFBRSxrQkFBa0I7YUFDbkM7WUFDRCxPQUFPLFlBQUMsR0FBUTtnQkFDZCxJQUFJLENBQUMsT0FBUSxDQUFDO29CQUNaLFVBQVUsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFO2lCQUNoQyxDQUFDLENBQUE7WUFDSixDQUFDO1lBQ0QsUUFBUTtnQkFDTixFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7WUFDbEIsQ0FBQztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxPQUFPLEVBQUU7UUFDUCxFQUFFLENBQUMscUJBQXFCLENBQUM7WUFDdkIsS0FBSyxFQUFFLG9CQUFvQjtZQUMzQixJQUFJLEVBQUUsbUJBQW1CO1lBQ3pCLE9BQU8sWUFBQyxHQUFHO1lBRVgsQ0FBQztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxnQkFBZ0I7UUFDZCxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQzFCLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFBO1NBQ3ZGO2FBQU07WUFDTCxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7U0FDekI7UUFDRCxFQUFFLENBQUMsZ0JBQWdCLENBQUM7WUFDbEIsSUFBSSxFQUFFLElBQUk7WUFDVixPQUFPLFlBQUMsR0FBRztnQkFDVCxFQUFFLENBQUMsZ0JBQWdCLENBQUM7b0JBQ2xCLE9BQU8sWUFBQyxHQUFHO3dCQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO29CQUN2QixDQUFDO2lCQUNGLENBQUMsQ0FBQTtZQUNKLENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsaUJBQWlCLEVBQWpCO1FBQ0UsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLE9BQU87WUFDTCxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPO1NBQ3pCLENBQUE7SUFDSCxDQUFDO0NBRUYsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy9pbmRleC5qc1xuLy/ojrflj5blupTnlKjlrp7kvotcbi8vIGltcG9ydCB7IElNeUFwcCB9IGZyb20gJy4uLy4uL2FwcCdcblxuLy8gY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKVxuXG5QYWdlKHtcbiAgZGF0YToge1xuICAgIGNvbnRlbnQ6ICcnIGFzIGFueSxcbiAgICBjb250ZW50Qm95OiAnJyBhcyBhbnksXG4gICAgaXNCb3lDb250ZW50OiB0cnVlIGFzIGJvb2xlYW4sXG4gICAgbm93RGF0ZTonJyBhcyBhbnlcbiAgfSxcbiAgb25Mb2FkKCl7XG4gICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIHZhciBub3dNb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XG4gICAgdmFyIHN0ckRhdGUgPSBkYXRlLmdldERhdGUoKTtcbiAgICB0aGlzLnNldERhdGEhKHtcbiAgICAgIG5vd0RhdGU6bm93TW9udGggKyAnLScgKyBzdHJEYXRlKyfml6UnXG4gICAgfSlcbiAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEubm93RGF0ZSlcbiAgfSxcbiAgb25TaG93KCkge1xuICAgIGlmICh0aGlzLmRhdGEuaXNCb3lDb250ZW50KSB7XG4gICAgICB0aGlzLmdldEJveUNvbnRlbnQoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmdldENvbnRlbnQoKVxuICAgIH1cbiAgfSxcbiAgdG9nZ2xlRXZlbnQoKSB7XG4gICAgdGhpcy5zZXREYXRhISh7XG4gICAgICBpc0JveUNvbnRlbnQ6ICF0aGlzLmRhdGEuaXNCb3lDb250ZW50XG4gICAgfSlcbiAgICBpZiAodGhpcy5kYXRhLmlzQm95Q29udGVudCkge1xuICAgICAgdGhpcy5nZXRCb3lDb250ZW50KClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nZXRDb250ZW50KClcbiAgICB9XG4gIH0sXG4gIGdldENvbnRlbnQoKTogdm9pZCB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcbiAgICB9KVxuICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnaHR0cHM6Ly9hcGkucWlub3IuY24vc291cC8nLFxuICAgICAgaGVhZGVyOiB7XG4gICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgLy8g6buY6K6k5YC8XG4gICAgICB9LFxuICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgdGhhdC5zZXREYXRhISh7XG4gICAgICAgICAgY29udGVudDogcmVzLmRhdGFcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjb21wbGV0ZSgpIHtcbiAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIGdldEJveUNvbnRlbnQoKTogdm9pZCB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcbiAgICB9KVxuICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnaHR0cHM6Ly93d3cuc29tZWtleS5jbi90aWFuZ291L3JhbmRvbS5waHAnLFxuICAgICAgaGVhZGVyOiB7XG4gICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgLy8g6buY6K6k5YC8XG4gICAgICB9LFxuICAgICAgc3VjY2VzcyhyZXM6IGFueSkge1xuICAgICAgICB0aGF0LnNldERhdGEhKHtcbiAgICAgICAgICBjb250ZW50Qm95OiByZXMuZGF0YS5kYXRhIHx8ICcnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgY29tcGxldGUoKSB7XG4gICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICBqdW1wVXJsOiBmdW5jdGlvbiAoKSB7XG4gICAgd3gubmF2aWdhdGVUb01pbmlQcm9ncmFtKHtcbiAgICAgIGFwcElkOiAnd3g0MTNiMjRkYjgxNmNhNmJmJyxcbiAgICAgIHBhdGg6ICdwYWdlcy9pbmRleC9pbmRleCcsXG4gICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICAvLyDmiZPlvIDmiJDlip9cbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICBzZXRDbGlwYm9hcmREYXRhKCkge1xuICAgIGxldCBkYXRhID0gJyc7XG4gICAgaWYgKHRoaXMuZGF0YS5pc0JveUNvbnRlbnQpIHtcbiAgICAgIGRhdGEgPSB0aGlzLmRhdGEubm93RGF0ZSArIHRoaXMuZGF0YS5jb250ZW50Qm95LndlYXRoZXIgKyB0aGlzLmRhdGEuY29udGVudEJveS5jb250ZW50IFxuICAgIH0gZWxzZSB7XG4gICAgICBkYXRhID0gdGhpcy5kYXRhLmNvbnRlbnRcbiAgICB9XG4gICAgd3guc2V0Q2xpcGJvYXJkRGF0YSh7XG4gICAgICBkYXRhOiBkYXRhLFxuICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgd3guZ2V0Q2xpcGJvYXJkRGF0YSh7XG4gICAgICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKSAvLyBkYXRhXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIG9uU2hhcmVBcHBNZXNzYWdlKCk6IG9iamVjdCB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogdGhhdC5kYXRhLmNvbnRlbnQsXG4gICAgfVxuICB9XG5cbn0pXG4iXX0=