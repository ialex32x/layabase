

class WxPlatform extends BasePlatform {
    init(cb: Function) {
        //初始化微信小游戏
        Laya.MiniAdpter.init()
        Laya.MiniAdpter["getUrlEncode"] = WxPlatform.getUrlAndEncode
        this._storage = new WeixinStorageBackend()
        this._fs = new WeixinFileSystemBackend()
        let opts = wx.getLaunchOptionsSync()
        // 启动传参
        this._env.query = opts.query
        // console.log("launch", opts)

        wx.onShow(res => {
            // console.log("onshow", res)
            this._env.query = res.query
            this.dispatch("onShow")
        })
        wx.onHide(() => {
            // console.log("onhide")
            this.dispatch("onHide")
        })

        this._env.systemInfo = wx.getSystemInfoSync()
        wx.getUpdateManager().onCheckForUpdate(res => {
            console.log("check for update:", res.hasUpdate)
        })
        wx.getUpdateManager().onUpdateFailed(() => {
            console.log("check for update: failed")
        })
        wx.getUpdateManager().onUpdateReady(() => {
            wx.showModal({
                title: "更新提示",
                content: "有更新版本可用并已经准备好，是否重启应用？",
                // showCancel: false,
                success: res => {
                    if (res.confirm) {
                        wx.getUpdateManager().applyUpdate()
                    }
                }
            })
        })
        cb()
    }

    static getUrlAndEncode(url: string, type: string): string {
        console.log("getUrlEncode", url, type)
        if (url.indexOf(".fnt") >= 0) {
            return "utf8"
        }
        if (type == "arraybuffer") {
            return ""
        }
        return "ascii"
    }

    exit() {
        wx.exitMiniProgram()
    }

    login(cb: (status: boolean, errMsg?: string) => void) {
        wx.login({
            timeout: 5000,
            success: res => {
                let code = res.code
                this._userInfo.code = code
                console.log("wx.login", code)
                this.getUserInfo(cb)
            },
            fail: res => {
                cb(false, "fail")
            }
        })
    }

    // 获取用户信息，如果未授权，则创建按钮请求授权
    private getUserInfo(cb: (success: boolean, errMsg?: string) => void) {
        wx.getSetting({
            success: res => {
                if (res.authSetting["scope.userInfo"]) {
                    // 已经授权
                    wx.getUserInfo({
                        success: res => {
                            console.log("wx.getUserInfo = ", res.userInfo)
                            this.setUserInfo(res.userInfo)
                            cb(true)
                        },
                        fail: () => {
                            cb(false, "wx.getUserInfo fail")
                        }
                    })
                } else {
                    // 未授权
                    if (!this._env["userInfoButtonDef"]) {
                        cb(false, "no env.userInfoButtonDef")
                    } else {
                        let button = wx.createUserInfoButton(this._env["userInfoButtonDef"])
                        console.log("wx.createUserInfoButton", this._env["userInfoButtonDef"])
                        console.log("button object", button)
                        button.onTap(res => {
                            console.log("userInfoButton.tap: res = ", res.userInfo)
                            if (this.setUserInfo(res.userInfo)) {
                                cb(true)
                                button.destroy()
                            } else {
                                cb(false, "userInfoButton tap: rejected")
                            }
                        })
                        button.show()
                    }
                }
            },
            fail: () => {
                cb(false, "wx.getSetting fail")
            }
        })
    }

    private setUserInfo(userInfo: WXUserInfoObject) {
        if (!!userInfo) {
            this._userInfo.name = userInfo.nickName
            this._userInfo.photo = userInfo.avatarUrl
            return true
        }
        return false
    }

    share(title: string, imageUrl: string, payload?: any, cb?: (status: boolean) => void) {
        wx.shareAppMessage({
            title: title,
            imageUrl: imageUrl,
            query: HttpRequest.QUERY(payload),
            success: res => {
                if (!!cb) {
                    cb(true)
                }
            },
            fail: res => {
                if (!!cb) {
                    cb(false)
                }
            }
        })
    }

    prompt(title: string, text: string, buttonText: string, cb: Function) {
        wx.showModal({
            title: title,
            content: text,
            confirmText: buttonText,
            showCancel: false,
            cancelText: "cancel",
            success: res => {
                cb()
            },
        })
    }

    showLoading(title?: string) {
        wx.showLoading({
            title: title || "加载中"
        })
    }

    hideLoading() {
        wx.hideLoading()
    }
}