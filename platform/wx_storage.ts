class WeixinStorageBackend extends StorageBackend {
    protected onsave() {
        let ts = this._timestamp.toString()
        let str = JSON.stringify(this._values)
        wx.setStorageSync(StorageBackend.STORE_KEY, str)
        wx.setStorageSync(StorageBackend.STORE_TIMESTAMP, ts)
        console.log("save prefs:", str, ts)
    }

    protected onload() {
        let ts = wx.getStorageSync(StorageBackend.STORE_TIMESTAMP)
        let str = wx.getStorageSync(StorageBackend.STORE_KEY)
        if (str) {
            this._values = JSON.parse(str)
        }
        if (ts) {
            this._timestamp = parseInt(ts)
        }
        console.log("load prefs:", str, ts)
    }
}
