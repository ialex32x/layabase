class Vec2 {
    x: number
    y: number

    static get left() {
        return new Vec2(-1, 0)
    }

    static get up() {
        return new Vec2(0, -1)
    }

    static get right() {
        return new Vec2(1, 0)
    }

    static get down() {
        return new Vec2(0, 1)
    }

    constructor(x: number = 0, y: number = 0) {
        this.x = x
        this.y = y
    }

    clone() {
        return new Vec2(this.x, this.y)
    }

    normalize() {
        let rlen = 1 / this.length
        this.x *= rlen
        this.y *= rlen
    }

    get normalized() {
        let rlen = 1 / this.length
        return new Vec2(this.x * rlen, this.y * rlen)
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    rotate(radAngle: number) {
        let cos = Math.cos(radAngle)
        let sin = Math.sin(radAngle)
        this.x = this.x * cos - this.y * sin
        this.y = this.x * sin + this.y * cos
        return this
    }

    zero() {
        this.x = 0
        this.y = 0
        return this
    }

    set(x: number, y: number) {
        this.x = x
        this.y = y
        return this
    }

    add(b: Vec2) {
        this.x += b.x
        this.y += b.y
        return this
    }

    sub(b: Vec2) {
        this.x -= b.x
        this.y -= b.y
        return this
    }

    mul(v: number) {
        this.x *= v
        this.y *= v
        return this
    }

    div(v: number) {
        this.x /= v
        this.y /= v
        return this
    }

    static rotate(vec: Vec2, radAngle: number) {
        let cos = Math.cos(radAngle)
        let sin = Math.sin(radAngle)
        return new Vec2(
            vec.x * cos - vec.y * sin,
            vec.x * sin + vec.y * cos
        )
    }

    static angle(v1: Vec2, v2: Vec2) {
        let len1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y)
        let len2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y)
        let m = v1.x * v2.x + v1.y * v2.y
        let a = Math.acos(m / (len1 * len2))
        return a
    }

    static signedAngle(v1: Vec2, v2: Vec2) {
        let len1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y)
        let len2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y)
        let p1 = v1.x * v2.x
        let p2 = v1.y * v2.y
        let m = p1 + p2
        let s = p1 - p2
        let a = Math.acos(m / (len1 * len2))
        return s > 0 ? a : -a
    }

    static add(a: Vec2, b: Vec2): Vec2 {
        return new Vec2(a.x + b.x, a.y + b.y)
    }

    static sub(a: Vec2, b: Vec2): Vec2 {
        return new Vec2(a.x - b.x, a.y - b.y)
    }

    static mul(a: Vec2, b: number): Vec2 {
        return new Vec2(a.x * b, a.y * b)
    }

    static div(a: Vec2, b: number): Vec2 {
        return new Vec2(a.x / b, a.y / b)
    }
}
