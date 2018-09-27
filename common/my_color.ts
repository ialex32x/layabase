class MyColor {
    r = 0 // 0 ~ 255
    g = 0
    b = 0

    constructor(r: number = 0, g: number = 0, b: number = 0) {
        this.r = MathUtil.clamp(Math.ceil(r), 0, 255)
        this.g = MathUtil.clamp(Math.ceil(g), 0, 255)
        this.b = MathUtil.clamp(Math.ceil(b), 0, 255)
    }

    // 描述性字符串 rgb 整数形式返回
    description() {
        return `{${this.r}, ${this.g}, ${this.b}}`
    }

    // 十六进制颜色值形式返回
    toString() {
        return Laya.Utils.toHexColor((this.r << 16 & 0xff0000) | (this.g << 8 & 0x00ff00) | (this.b & 0xff))
    }

    static random() {
        return new MyColor(Math.random() * 255, Math.random() * 255, Math.random() * 255)
    }

    // 十六进制颜色转 MyColor
    static parse(color: string) {
        if (color.charAt(0) == '#') {
            color = color.substr(1)
        }
        let size = color.length
        if (size > 6) {
            color = color.substr(0, 6)
        } else if (size < 6) {
            for (let i = size; i < 6; ++i) {
                color = '0' + color
            }
        }
        let r = parseInt(color.substr(0, 2), 16)
        let g = parseInt(color.substr(2, 2), 16)
        let b = parseInt(color.substr(4, 2), 16)
        return new MyColor(r, g, b)
    }

    // 颜色插值
    static lerp(c1: MyColor, c2: MyColor, f: number) {
        return new MyColor(MathUtil.lerp(c1.r, c2.r, f), MathUtil.lerp(c1.g, c2.g, f), MathUtil.lerp(c1.b, c2.b, f))
    }

    // 颜色加
    static add(c1: MyColor, c2: MyColor) {
        return new MyColor(c1.r + c2.r, c1.g + c2.g, c1.b + c2.b)
    }

    // 颜色乘
    static mul(c1: MyColor, c2: MyColor) {
        return new MyColor(c1.r * c2.r, c1.g * c2.g, c1.b * c2.b)
    }
}
