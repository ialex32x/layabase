/*
let payload = Protocols.serialize(pb_xgame.MX_Echo.create({
    val1: 123, 
    val2: 456, 
    val3: "789.hello, world!!!"
}), 0)

let packet = Protocols.deserialize(payload)
console.log(`${packet.id} ${packet.session} ${packet.msg.val1} ${packet.msg.val2} ${packet.msg.val3}`)
*/

interface IWSPacket { 
    id: number
    session: number
    msg: any
    type: any
}

class WSProtocols {
    private static _id2tp = []
    private static _tp2id = []
    private static _bytes: laya.utils.Byte
    private static _pbw: protobuf.Writer

    static getWriter(): protobuf.Writer {
        if (!this._pbw) {
            this._pbw = protobuf.Writer.create()
        }
        this._pbw.reset()
        return this._pbw
    }

    static getBytes(): laya.utils.Byte {
        if (!this._bytes) {
            this._bytes = new laya.utils.Byte()
            this._bytes.endian = laya.utils.Byte.BIG_ENDIAN
        }
        this._bytes.clear()
        return this._bytes
    }

    static register(msg_id: number, msg_type: any) {
        this._id2tp[msg_id] = msg_type
        this._tp2id[msg_type] = msg_id
        console.log(`[proto] register protocol ${msg_id}: ${msg_type.name}`)
    }

    static serialize(msg: any, session?: number): ArrayBuffer {
        // console.log(msg.constructor)
        let msg_id = this._tp2id[msg.constructor]
        let msg_type = this._id2tp[msg_id]
        if (msg_type) {
            let writer = this.getWriter()
            if (msg) {
                msg_type.encode(msg, writer)
            }
            let payload = this.getBytes()
            payload.writeUint32(msg_id)
            if (session == null || session == undefined) {
                payload.writeUint32(0)
            } else {
                payload.writeUint32(session)
            }
            payload.writeArrayBuffer(writer.finish())
            return payload.buffer
        } else {
            console.error(`serialize: 指定协议没有注册 ${msg} ${msg_id} ${msg.constructor}`)
        }
    }

    static deserialize(payload: ArrayBuffer): IWSPacket {
        let bytes = new laya.utils.Byte(payload)
        bytes.endian = laya.utils.Byte.BIG_ENDIAN
        let msg_id = bytes.getUint32()
        let msg_type = this._id2tp[msg_id]

        if (msg_type) {
            let session_id = bytes.getUint32()
            let rawobj: any = bytes.buffer.slice(bytes.pos)
            let reader = protobuf.Reader.create(protobuf.util.newBuffer(rawobj))
            // let reader = protobuf.Reader.create(rawobj)
            let msg_obj = msg_type.decode(reader)
            return {
                id: msg_id, 
                session: session_id, 
                msg: msg_obj, 
                type: msg_type,
            }
        } else {
            console.error(`deserialize: 指定协议没有注册 ${msg_id} ${payload.byteLength}`)
        }
    }
}