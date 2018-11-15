interface IStorageBackend {
    load()
    save()
    getValue(key: string, value?: any): any
    setValue(key: string, value: any)
}

class StorageBackend implements IStorageBackend {
    protected static readonly STORE_TIMESTAMP = "!player_prefs.timestamp"
    protected static readonly STORE_KEY = "!player_prefs.key"

    protected _timestamp: number  // 记录配置修改的时间戳
    protected _loaded = false
    protected _dirty = false
    protected _values: { [k: string]: any } = null

    load() {
        if (!this._loaded) {
            this._loaded = true
            this._timestamp = 0
            this._values = {}
            try {
                this.onload()
            } catch (e) {
                console.error(e)
            }
        }
    }

    save() {
        if (this._dirty) {
            this._dirty = false
            try {
                this.onsave()
            } catch (e) {
                console.error(e)
            }
        }
    }

    protected onload() {
    }

    protected onsave() {
    }

    getValue(key: string, value?: any): any {
        this.load()
        return this._values[key] || value
    }

    setValue(key: string, value: any) {
        this.load()
        let oldValue = this._values[key]
        if (oldValue != value) {
            this._values[key] = value
            if (!this._dirty) {
                this._dirty = true
                this._timestamp = Date.now().valueOf()
                Laya.timer.once(1, this, this.save)
            }
        }
    }
}

class LocalStorageBackend extends StorageBackend {
    protected onsave() {
        let ts = this._timestamp.toString()
        let str = JSON.stringify(this._values)
        Laya.LocalStorage.setItem(StorageBackend.STORE_KEY, str)
        Laya.LocalStorage.setItem(StorageBackend.STORE_TIMESTAMP, ts)
        console.log("save prefs:", str, ts)
    }

    protected onload() {
        let ts = Laya.LocalStorage.getItem(StorageBackend.STORE_TIMESTAMP)
        let str = Laya.LocalStorage.getItem(StorageBackend.STORE_KEY)
        if (str) {
            this._values = JSON.parse(str)
        }
        if (ts) {
            this._timestamp = parseInt(ts)
        }
        console.log("load prefs:", str, ts)
    }
}
