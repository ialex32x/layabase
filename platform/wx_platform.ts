

class WxPlatform extends BasePlatform {
    init() {
        //初始化微信小游戏
        Laya.MiniAdpter.init()
        Laya.MiniAdpter["getUrlEncode"] = WxPlatform.getUrlAndEncode
        this._storage = new WeixinStorageBackend()
        this._fs = new WeixinFileSystemBackend()
        wx.onHide(() => {
            console.log("onhide")
        })
        let opts = wx.getLaunchOptionsSync()
        console.log("launch", opts)
        wx.onShow(res => {
            console.log("onshow", res)
        })
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

    /*
    let button = wx.createUserInfoButton({
        type: 'text',
        text: '获取用户信息',
        style: {
            left: 10,
            top: 76,
            width: 200,
            height: 40,
            lineHeight: 40,
            backgroundColor: '#ff0000',
            color: '#ffffff',
            textAlign: 'center',
            fontSize: 16,
            borderRadius: 4
        }
    })
    button.onTap((res) = > {
        console.log(res)
    })
     */
    login(cb: (status: boolean, res?: any) => void) {
        wx.login({
            timeout: 5000,
            success: res => {
                let code = res.code
                wx.authorize({
                    scope: "scope.userInfo",
                    success: () => {
                        wx.getUserInfo({
                            success: res => {
                                let photo = res.userInfo.avatarUrl
                                console.log("wx.getUserInfo", photo, res.userInfo)
                                HttpRequest.GET("/colors/game/login", {
                                    platform: myAppConfig.platform,
                                    photo: photo,
                                    code: code,
                                }, (status, res) => {
                                    if (status) {
                                        if (res.status == 0) {
                                            cb(true, res)
                                        } else {
                                            cb(false, "reject")
                                        }
                                    } else {
                                        cb(false, "timeout")
                                    }
                                })
                            },
                            fail: () => {
                                cb(false, "getUserInfo failed")
                            },
                        })
                    },
                    fail: () => {
                        cb(false, "no auth")
                    },
                })
            },
            fail: res => {
                cb(false, "fail")
            }
        })
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
}