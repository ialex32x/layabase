
interface PlatformUserInfo {
    name?: string
    photo?: string
    code?: string
    [prop: string]: any
}

interface PlatformEnv {
    query?: any // 启动参数
    systemInfo?: any
    [prop: string]: any
}

abstract class BasePlatform {
    protected _storage: StorageBackend
    protected _fs: FileSystemBackend
    protected _env: PlatformEnv = {}
    protected _userInfo: PlatformUserInfo = {}
    protected _callbacks = new Laya.EventDispatcher()

    get env() {
        return this._env
    }

    get userInfo() {
        return this._userInfo
    }

    get storage(): StorageBackend {
        return this._storage
    }

    get fileSystem(): FileSystemBackend {
        return this._fs
    }

    // 初始化 （可能是异步执行回调）
    abstract init(cb: Function)

    // 退出
    abstract exit()

    // 登陆
    abstract login(cb: (status: boolean, errMsg?: string) => void)

    // 分享
    abstract share(title: string, imageUrl: string, payload?: any, cb?: (status: boolean) => void)

    // 弹出框（单选项）
    abstract prompt(title: string, text: string, buttonText: string, cb: Function)

    on(type: string, caller: any, listener: Function) {
        this._callbacks.on(type, caller, listener)
    }

    once(type: string, caller: any, listener: Function) {
        this._callbacks.once(type, caller, listener)
    }

    off(type: string, caller: any, listener: Function) {
        this._callbacks.off(type, caller, listener)
    }

    protected dispatch(type: string, ...params: any[]) {
        this._callbacks.event(type, params)
    }

    showLoading(title?: string) { }
    hideLoading() { }
}

let platform: BasePlatform = null
