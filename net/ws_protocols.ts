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
    id?: number
    type?: any
    msg?: any 
}

class CProtocols {
    static magic: number
    static maxPayloadSize: number 
    private static _id2tp = []

    static register(msg_id: number, msg_type: any) {
        this._id2tp[msg_id] = msg_type
        Object.defineProperty(msg_type, "msg_id", { value: msg_id })
    }

    static writer = protobuf.Writer.create()

    static writeUintBE(val, buf, pos) {
        buf[pos] = val >>> 24;
        buf[pos + 1] = val >>> 16 & 255;
        buf[pos + 2] = val >>> 8 & 255;
        buf[pos + 3] = val & 255;
    }

    static readUintBE(buf, pos) {
        return (buf[pos] << 24
            | buf[pos + 1] << 16
            | buf[pos + 2] << 8
            | buf[pos + 3]) >>> 0;
    }

    static serialize(msg) {
        let msg_type = Object.getPrototypeOf(msg).constructor
        if (!!msg_type) {
            let id = msg_type.msg_id
            if (!!id) {
                // let writer = protobuf.Writer.create()
                let writer = this.writer
                writer.fixed32(0) // msg id stub
                msg_type.encode(msg, writer)
                let payload = writer.finish()
                this.writeUintBE(id, payload, 0)
                writer.reset()
                return payload.buffer.slice(payload.byteOffset, payload.byteOffset + payload.byteLength)
            }
        }
    }

    static deserialize(payload: any, out_packet: IWSPacket) {
        let reader = protobuf.Reader.create(protobuf.util.newBuffer(payload))
        let msg_id = this.readUintBE(reader.buf, reader.pos)
        reader.skip(4)
        let msg_type = this._id2tp[msg_id]

        if (msg_type) {
            let msg_obj = msg_type.decode(reader)
            out_packet.id = msg_id
            out_packet.type = msg_type
            out_packet.msg = msg_obj
            return true
        }
        return false
    }
}