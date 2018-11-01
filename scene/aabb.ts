class AABB {
    minX: number
    minY: number
    maxX: number
    maxY: number
    sizeX: number
    sizeY: number
    hsizeX: number
    hsizeY: number
    centerX: number
    centerY: number

    constructor(minX: number, minY: number, maxX: number, maxY: number) {
        this.minX = Math.min(minX, maxX)
        this.minY = Math.min(minY, maxY)
        this.maxX = Math.max(minX, maxX)
        this.maxY = Math.max(minY, maxY)
        this.sizeX = this.maxX - this.minX
        this.sizeY = this.maxY - this.minY
        this.hsizeX = this.sizeX * 0.5
        this.hsizeY = this.sizeY * 0.5
        this.centerX = this.minX + this.hsizeX
        this.centerY = this.minY + this.hsizeY
    }

    static fromRect(x: number, y: number, w: number, h: number) {
        return new AABB(x, y, x + w, y + h)
    }

    static fromSphere(x: number, y: number, radius: number) {
        return new AABB(x - radius, y - radius, x + radius, y + radius)
    }

    // 按照半径修改包围盒
    setRadius(radius: number) {
        this.minX = this.centerX - radius
        this.minY = this.centerY - radius
        this.maxX = this.centerX + radius
        this.maxY = this.centerY + radius
        this.sizeX = this.maxX - this.minX
        this.sizeY = this.maxY - this.minY
        this.hsizeX = this.sizeX * 0.5
        this.hsizeY = this.sizeY * 0.5
    }

    // 按照中心修改包围盒
    setOrigin(x: number, y: number) {
        let dx = x - this.centerX
        let dy = y - this.centerY
        this.minX += dx
        this.minY += dy
        this.maxX += dx
        this.maxY += dy
        this.centerX = x
        this.centerY = y
    }

    // 坐标点是否在aabb内部
    contains(x: number, y: number) {
        return x >= this.minX && x <= this.maxX 
            && y >= this.minY && y <= this.maxY
    }

    // 与另一个aabb存在接触
    intersect(other: AABB) {
        if (this.maxX < other.minX || this.minX > other.maxX) return false
        if (this.maxY < other.minY || this.minY > other.maxY) return false
        return true
    }

    // 完全包含另一个aabb
    enclose(other: AABB) {
        return other.minX >= this.minX && other.minY >= this.minY 
            && other.maxX <= this.maxX && other.maxY <= this.maxY
    }
}