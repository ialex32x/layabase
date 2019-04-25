
class WSConnection {
    public static readonly EVT_CLOSE = "close"
    public static readonly EVT_OPEN = "open"
    public static readonly EVT_ERROR = "error"

    private url: string
    private socket: Laya.Socket
    // private byte: Laya.Byte
    private packet: IWSPacket = {}

    protected events = new Laya.EventDispatcher()

    private msghandlers: Function[] = []

    private session_id_gen: number = 0
    private sessions: WSSession[] = []
    private sessions_pool: WSSession[] = []

    // 是否已连接
    get connected() {
        return this.socket && this.socket.connected
    }

    constructor(url: string) {
        this.url = url
        // this.byte = new Laya.Byte() 
        // this.byte.endian = Laya.Byte.BIG_ENDIAN 
        this.socket = new Laya.Socket()
        this.socket.endian = Laya.Byte.LITTLE_ENDIAN
        this.socket.on(Laya.Event.OPEN, this, this._onopen)
        this.socket.on(Laya.Event.MESSAGE, this, this._onmessage)
        this.socket.on(Laya.Event.CLOSE, this, this._onclose)
        this.socket.on(Laya.Event.ERROR, this, this._onerror)
    }

    // 发起连接
    // "ws://localhost:8080/echo"
    connect(url: string) {
        this.url = url;
        this.socket.connectByUrl(this.url)
    }

    close() {
        this.socket.close()
    }

    private newSession(): WSSession {
        let session_id = ++this.session_id_gen
        let size = this.sessions_pool.length
        if (size > 0) {
            let old = this.sessions_pool.splice(size - 1)[0]
            old.reset(session_id)
            return old
        }
        return new WSSession(session_id)
    }

    // 发请求, 返回session, 可以注册回调
    request(msg) {
        if (Object.getPrototypeOf(msg).hasOwnProperty("requestid")) {
            let session = this.newSession()
            do {
                msg["requestid"] = session.id
                if (this.post(msg)) {
                    this.sessions[session.id] = session
                    break
                }
                session.close()
                this.sessions_pool.push(session)
            } while (false)
            return session
        } else {
            this.post(msg)
        }
    }

    // 发消息 (返回是否执行发送)
    post(msg) {
        if (this.connected) {
            let payload = CProtocols.serialize(msg)
            if (payload) {
                this.socket.send(payload)
                this.socket.flush()
                return true
            }
        }
        return false
    }

    onsocket(evt: "close" | "open", fn: () => void, self?: any)
    onsocket(evt: "error", fn: (err: Event) => void, self?: any)
    onsocket(evt: "close" | "open" | "error" | string, fn: Function, self?: any) {
        this.events.on(evt, self, fn)
    }

    private _onopen(evt) {
        // console.log("[ws] open")
        this.events.event(WSConnection.EVT_OPEN)
    }

    _dispatch(msg: any) {
        if (msg) {
            let handler = this.msghandlers[Object.getPrototypeOf(msg).constructor]
            if (handler) {
                handler(msg)
            }
        }
    }

    on<T>(type: { new (): T }, fn: (msg: T) => void) {
        let tp: any = type
        this.msghandlers[tp] = fn
        return this
    }

    private _onmessage(message) {
        // console.log(`[ws] receive ${message}`)
        if (CProtocols.deserialize(message, this.packet)) {
            let msg = this.packet.msg
            if (Object.getPrototypeOf(msg).hasOwnProperty("requestid")) {
                let session = this.sessions[msg.requestid]
                if (session) {
                    this.sessions[msg.requestid] = undefined
                    session.dispatch(msg)
                    session.close()
                    this.sessions_pool.push(session)
                } else {
                    console.error(`receive unknown response message: ${msg}`)
                }
            } else {
                this._dispatch(msg)
            }
        }
    }

    private _onclose() {
        this.events.event(WSConnection.EVT_CLOSE)
        // console.log("[ws] close")
    }

    private _onerror(err: Event) {
        // console.log("[ws] error", err: Event)
        this.events.event(WSConnection.EVT_ERROR, err)
    }
}