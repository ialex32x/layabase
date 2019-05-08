
class WSSession {
    private _id: number
    private handlers: Function[]
    private failhandler: Function

    get id() {
        return this._id
    }

    constructor(id: number) {
        this.reset(id)
    }

    reset(id: number) {
        this._id = id
        this.handlers = []
        this.failhandler = undefined
    }

    close() {
        this._id = 0
        this.handlers = undefined
        this.failhandler = undefined
    }

    fail(fn: () => void) {
        this.failhandler = fn
    }

    dispatch(msg: any) {
        if (msg) {
            let msg_type = Object.getPrototypeOf(msg).constructor
            if (msg_type) {
                let handler = this.handlers[msg_type.msg_id]
                if (handler) {
                    handler(msg)
                }
            }
        } else {
            if (this.failhandler) {
                this.failhandler()
            }
        }
    }

    on<T>(type: { new (): T }, fn: (msg: T) => void) {
        if (this._id != 0 && type) {
            let msg_id = (<any>type).msg_id
            if (msg_id) {
                this.handlers[msg_id] = fn
            }
        }
        return this
    }
}
