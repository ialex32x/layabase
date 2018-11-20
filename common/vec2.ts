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

    rotate(radian: number) {
        let cos = Math.cos(radian)
        let sin = Math.sin(radian)
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

    cross(b: Vec2) {
        return this.x * b.y - this.y * b.x
    }

    dot(b: Vec2) {
        return this.x * b.x + this.y * b.y
    }

    static cross(a: Vec2, b: Vec2) {
        return a.x * b.y - a.y * b.x
    }

    static dot(a: Vec2, b: Vec2) {
        return a.x * b.x + a.y * b.y
    }

    static rotate(vec: Vec2, radian: number) {
        let cos = Math.cos(radian)
        let sin = Math.sin(radian)
        return new Vec2(
            vec.x * cos - vec.y * sin,
            vec.x * sin + vec.y * cos
        )
    }

    angle(v2: Vec2) {
        return Math.atan2(this.cross(v2), this.dot(v2))
    }

    slerp(v2: Vec2, p: number) {
        let theta = this.angle(v2)
        return Vec2.rotate(this, p)
    }

    static slerp(v1:Vec2, v2: Vec2, p: number) {
        let theta = v1.angle(v2)
        return Vec2.rotate(v1, theta * p)
    }

    static angle(v1: Vec2, v2: Vec2) {
        return Math.atan2(v1.cross(v2), v1.dot(v2))
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
