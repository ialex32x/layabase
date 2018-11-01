interface QuadNodeObject {
    [prop: string]: any
    aabb: AABB
}

class QuadNode<T extends QuadNodeObject> {
    private static readonly MAX_DEPTH = 5

    private static __id_gen = 0
    private _id: number

    get id() { return this._id }
    get size() { return this.objects.length }
    get depth() { return this._depth }

    private parent: QuadNode<T>
    private aabb: AABB
    private _depth: number
    private children: Array<QuadNode<T>>
    private objects: Array<T>

    constructor(parent: QuadNode<T>, minX: number, minY: number, maxX: number, maxY: number) {
        this._id = QuadNode.__id_gen++
        this.objects = new Array<T>()
        this.children = new Array<QuadNode<T>>(4)
        this.parent = parent
        this._depth = !!parent ? parent._depth + 1 : 0
        this.aabb = new AABB(minX, minY, maxX, maxY)

        // let sprite = new Laya.Sprite()
        // GraphicsUtil.drawRoundRect(sprite.graphics, minX, minY, maxX - minX, maxY - minY, 5, MyColor.random().hex())
        // Laya.stage.addChild(sprite)
    }

    find(box: AABB, results: Array<T>, filter: (so: T) => boolean) {
        if (box.intersect(this.aabb)) {
            for (let i = 0; i < this.objects.length; ++i) {
                let so = this.objects[i]
                if (filter(so)) {
                    results.push(so)
                }
            }
            if (!!this.children[0]) this.children[0].find(box, results, filter)
            if (!!this.children[1]) this.children[1].find(box, results, filter)
            if (!!this.children[2]) this.children[2].find(box, results, filter)
            if (!!this.children[3]) this.children[3].find(box, results, filter)
        }
    }

    enclose(other: AABB) {
        return this.aabb.enclose(other)
    }

    clear() {
        this.objects.splice(0)
        for (let i = 0; i < 4; i++) {
            if (!!this.children[i]) { this.children[i].clear(); this.children[i] = null; }
        }
    }

    remove(so: T) {
        for (let i = 0; i < this.objects.length; ++i) {
            if (this.objects[i] === so) {
                this.objects.splice(i, 1)
                return
            }
        }
    }

    add(so: T): QuadNode<T> {
        if (this._depth < QuadNode.MAX_DEPTH && this.aabb.enclose(so.aabb)) {
            let centerX = this.aabb.centerX
            let centerY = this.aabb.centerY
            let posX = so.aabb.centerX
            let posY = so.aabb.centerY
            let index_x = 0
            let index_y = 0
            if (posX > centerX) index_x = 2
            if (posY > centerY) index_y = 1
            let index = index_x + index_y
            let child = this.children[index]
            if (!child) {
                let minX = this.aabb.minX
                let minY = this.aabb.minY
                let maxX = this.aabb.maxX
                let maxY = this.aabb.maxY
                if (index_x == 0) maxX = this.aabb.centerX
                else minX = this.aabb.centerX
                if (index_y == 0) maxY = this.aabb.centerY
                else minY = this.aabb.centerY
                child = this.children[index] = new QuadNode(this, minX, minY, maxX, maxY)
            }
            return child.add(so)
        }
        this.objects.push(so)
        return this
    }
}