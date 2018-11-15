class NullPlatform extends BasePlatform {
    init() {
        console.log("null platform init")
        this._storage = Laya.LocalStorage.support ? new LocalStorageBackend() : new StorageBackend()
        this._fs = new NullFileSystemBackend()
    }

    exit() {
        console.log("null platform exit")
    }

    login(cb: (status: boolean, res?: any) => void) {
        cb(true)
    }

    share(title: string, imageUrl: string, payload?: any, cb?: (status: boolean) => void) {
        console.log("null platform share", title, imageUrl)
        if (!!cb) {
            cb(true)
        }
    }
}