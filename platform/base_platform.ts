
abstract class BasePlatform {
    protected _storage: StorageBackend
    protected _fs: FileSystemBackend

    get storage(): StorageBackend {
        return this._storage
    }
    
    get fileSystem(): FileSystemBackend {
        return this._fs
    }

    abstract init()

    // 退出
    abstract exit()

    // 登陆
    abstract login(cb: (status: boolean, res?: any) => void)

    // 分享
    abstract share(title: string, imageUrl: string, payload?: any, cb?: (status: boolean) => void)
}

let platform: BasePlatform = null
