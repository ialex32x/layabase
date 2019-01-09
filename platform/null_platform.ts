class NullPlatform extends BasePlatform {
    init(cb: Function) {
        console.log("null platform init")
        this._storage = Laya.LocalStorage.support ? new LocalStorageBackend() : new StorageBackend()
        this._fs = new NullFileSystemBackend()
        cb()
    }

    exit() {
        console.log("null platform exit")
    }

    login(cb: (status: boolean, errMsg?: string) => void) {
        cb(true)
    }

    share(title: string, imageUrl: string, payload?: any, cb?: (status: boolean) => void) {
        console.log("null platform share", title, imageUrl)
        if (!!cb) {
            cb(true)
        }
    }

    prompt(title: string, text: string, buttonText: string, cb: Function) {
        console.log(title, text, buttonText)
        cb()
    }
}