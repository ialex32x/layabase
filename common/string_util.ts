class StringUtil {
    static prefix(num: number, length: number) {
        let n = num.toString()
        if (n.length >= length) {
            return n
        }
        return Array(length).join('0') + n.slice(-length)
    }
}