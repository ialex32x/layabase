class StringUtil {
    static prefix(num: number, length: number) {
        let n = num.toString()
        let p = length - n.length
        if (p <= 0) {
            return n
        }
        return Array(p + 1).join('0') + n
    }

    static time(deltaTime: number) {
        let nmsec = deltaTime % 999
        let fsec = Math.floor(deltaTime / 1000)
        let nsec = fsec % 60
        let fmin = Math.floor(fsec / 60)
        let text = fmin < 10 ? "0" + fmin : fmin.toString()
        text += nsec < 10 ? ":0" + nsec : ":" + nsec
        text += nmsec < 10 ? ".00" + nmsec : (nmsec < 100 ? ".0" + nmsec : "." + nmsec)
        return text
    }
}