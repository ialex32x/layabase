
class WSSession {
    private id: number
    private handlers = []

    constructor (id: number) {
        this.id = id
    }

    dispatch(packet: IWSPacket) {
        if (packet) {
            let handler = this.handlers[packet.type]
            if (handler) {
                handler(packet.msg)
            }
        } else {
            let handler = this.handlers[0]
            if (handler) {
                handler()
            }
        }
    }

    close() {
        this.handlers = undefined
    }

    fail(fn: () => void) {
        this.handlers[0] = fn
    }

    on(type: any, fn: (msg: any) => void) {
        if (type == "fail") {
            this.handlers[0] = fn
        } else {
            this.handlers[type] = fn
        }
        return this
    }
}
