class KeyUtil {
    static codeMap = {}

    static keyCode(ch: string) {
        let cache = this.codeMap[ch]
        if (!cache) {
            cache = ch.charCodeAt(0)
            this.codeMap[ch] = cache
        }
        return cache
    }

    static iskey(keyCode: number, ch: string) {
        return this.keyCode(ch) == keyCode || this.keyCode(ch.toUpperCase()) == keyCode
    }
}