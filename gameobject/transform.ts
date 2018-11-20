
class Transform extends BaseComponent {
    private _parent: Transform = null
    private _children = new Array<Transform>()
    private _node: Laya.Sprite = null
    private _changed = false

    get sprite() {
        return this._node
    }

    get graphics() {
        return this._node.graphics
    }

    get parent() {
        return this._parent
    }

    set parent(value: Transform) {
        if (this._parent != value) {
            this._detach()
            this._parent = value
            if (!!value) {
                value._children.push(this)
                value._node.addChild(this._node)
            }
            this._changed = true
        }
    }

    get changed() {
        return this._changed
    }

    get localX() {
        return this._node.x
    }

    get localY() {
        return this._node.y
    }

    get scaleX() {
        return this._node.scaleX
    }

    get scaleY() {
        return this._node.scaleY
    }

    get localPosition() {
        return new Laya.Point(this._node.x, this._node.y)
    }

    set localPosition(pos: Laya.Point) {
        this._node.pos(pos.x, pos.y)
        this._changed = true
    }

    // 移动指定位置
    translate(ox: number, oy: number) {
        this._node.pos(this._node.x + ox, this._node.y + oy)
        this._changed = true
    }

    setLocalPosition(x: number, y: number) {
        this._node.pos(x, y)
        this._changed = true
    }

    get scale() {
        return new Laya.Point(this._node.scaleX, this._node.scaleY)
    }

    set scale(scale: Laya.Point) {
        this._node.scale(scale.x, scale.y)
        this._changed = true
    }

    setScale(x: number, y: number) {
        this._node.scale(x, y)
        this._changed = true
    }

    _postframe() {
        this._changed = false
    }

    get childCount() {
        return this._children.length
    }

    getChild(index: number) {
        return this._children[index]
    }

    private _detach() {
        let theparent = this._parent
        if (!!theparent) {
            this._parent = null
            for (let i = 0; i < theparent._children.length; i++) {
                let child = theparent._children[i]
                if (child == this) {
                    theparent._children.splice(i, 1)
                    break
                }
            }
            this._node.removeSelf()
        }
    }

    protected onAwake() {
        super.onAwake()
        this._node = new Laya.Sprite()
        Laya.stage.addChild(this._node)
    }

    protected onEnable() {
        this._node.visible = true
    }

    protected onDisable() {
        this._node.visible = false
    }

    protected onDestroy() {
        this._detach()
    }
}
