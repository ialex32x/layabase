
class WSConnection {
    public static readonly EVT_MESSAGE = "message"
    public static readonly EVT_CLOSE = "close"
    public static readonly EVT_OPEN = "open"
    public static readonly EVT_ERROR = "error"

    private url: string
    private socket: Laya.Socket
    private byte: Laya.Byte
    private sendCount: number = 0

    protected events = new Laya.EventDispatcher()

    private sessions: WSSession[] = []
    private handlers: Laya.Handler[] = []

    // 是否已连接
    get connected() {
        return this.socket && this.socket.connected
    }
    
    constructor (url: string) {
        this.url = url
        this.socket = new Laya.Socket() 
        this.socket.endian = Laya.Byte.BIG_ENDIAN 
        this.socket.on(Laya.Event.OPEN, this, this.onopen) 
        this.socket.on(Laya.Event.MESSAGE, this, this.onmessage) 
        this.socket.on(Laya.Event.CLOSE, this, this.onclose) 
        this.socket.on(Laya.Event.ERROR, this, this.onerror) 
    }

    // 发起连接
    // "ws://localhost:8080/echo"
    connect() {
        console.log(`ws connect ${this.url}...`)
        this.socket.connectByUrl(this.url) 
    }

    close() {
        this.socket.close()
    }

    private _send(payload: ArrayBuffer) {
        if (payload && payload.byteLength > 0) {
            this.socket.send(payload)
            //this.socket.flush()
            return true
        }
        return false
    }

    // 发请求, 返回session, 可以注册回调
    request(msg) {
        let session_id = ++this.sendCount
        let session = new WSSession(session_id)
        do {
            if (this.connected) {
                let payload = WSProtocols.serialize(msg, session_id)
                if (this._send(payload)) {
                    this.sessions[session_id] = session
                    // console.log(`[ws] update (send)... len:${payload.byteLength}`)
                    break
                }
            }
            session.dispatch(undefined)
        } while (false)
        return session
    }

    // 发消息 (返回是否执行发送)
    post(msg) {
        if (this.connected) {
            let payload = WSProtocols.serialize(msg, 0)
            if (this._send(payload)) {
                // console.log(`[ws] update (send)... len:${payload.byteLength} msg ${msg.id}: ${msg.val1}, ${msg.val2}, ${msg.val3}`)
                return true
            }
        }
        return false
    }

    on(evt: "message", fn: (packet: IWSPacket) => void, self?: any)
    on(evt: "close" | "open", fn: () => void, self?: any)
    on(evt: "error", fn: (err: Event) => void, self?: any)
    on(evt: "message" | "close" | "open" | "error" | string, fn: Function, self?: any) {
        this.events.on(evt, self, fn)
    }

    private onopen(evt) {
        // console.log("[ws] open")
        this.events.event(WSConnection.EVT_OPEN)
    }

    // 处理指定类型的协议
    handle(type: any, handler: (msg: any) => void, thiz: any) {
        let h = new Laya.Handler(thiz, handler)
        this.handlers[type] = h
    }
    
    private onmessage(message) {
        // console.log(`[ws] receive ${message}`)
        let packet = WSProtocols.deserialize(message)
        
        if (packet) {
            // console.log(`[ws] recv ${packet.id}/${packet.session}`)
            if (packet.session > 0) {
                let session = this.sessions[packet.session]
                if (session) {
                    this.sessions[packet.session] = undefined
                    session.dispatch(packet)
                    session.close()
                } else {
                    console.error(`receive expired session message id:${packet.id} session:${packet.session}`)
                }
            } else {
                let method = this.handlers[packet.type]
                if (method) {
                    method.runWith(packet.msg)
                } 
                this.events.event(WSConnection.EVT_MESSAGE, packet)
            }
        }
    }

    private onclose() {
        this.events.event(WSConnection.EVT_CLOSE)
        // console.log("[ws] close")
    }

    private onerror(err: Event) {
        // console.log("[ws] error", err: Event)
        this.events.event(WSConnection.EVT_ERROR, err)
    }

    // test() {
    //     let ws = new WSConnection()
    //     ws.connect("ws://localhost:8080/echo")
    //     ws.on(WSConnection.EVT_CONNECT, () => {
    //         console.log("[ws] 已连接")
    //     })
    //     ws.on(WSConnection.EVT_CLOSE, () => {
    //         console.log("[ws] 已断开")
    //     })
    //     Laya.timer.loop(3000, ws, () => {
    //         ws.request(new pb_xgame.MX_Echo({ 
    //             val1: 12345, val2: 67890, val3: "有回复的消息" 
    //         })).on(pb_xgame.MX_Response, (msg) => {
    //             console.log(`[ws] echo 收到回复 ${msg.code}`)
    //         }).on(pb_xgame.MX_Echo, (msg) => {
    //             console.log(`[ws] echo 收到回复 echo ${msg.val1}, ${msg.val2}, ${msg.val3}`)
    //         }).fail(() => {
    //             console.log(`[ws] 发送失败`)
    //         })
    //         ws.post(new pb_xgame.MX_Echo({ 
    //             val1: 12345, val2: 67890, val3: "无回复消息" 
    //         }))
    //     })
    // }
}