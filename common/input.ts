class Input {
    static x: number
    static y: number
    static deltaX: number
    static deltaY: number
    static startX: number
    static startY: number
    static mousepress = false

    static init() {
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onmousedown)
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onmousemove)
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onmouseup)
        Laya.stage.on(Laya.Event.KEY_DOWN, this, this.onkeydown)
        Laya.stage.on(Laya.Event.KEY_UP, this, this.onkeyup)
        Laya.stage.on(Laya.Event.KEY_PRESS, this, this.onkeypress)
    }

    static deinit() {
        Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.onmousedown)
        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onmousemove)
        Laya.stage.off(Laya.Event.MOUSE_UP, this, this.onmouseup)
        Laya.stage.off(Laya.Event.KEY_DOWN, this, this.onkeydown)
        Laya.stage.off(Laya.Event.KEY_UP, this, this.onkeyup)
        Laya.stage.off(Laya.Event.KEY_PRESS, this, this.onkeypress)
    }

    static update() {
    }

    private static onmousedown(e: Laya.Event) {
        this.mousepress = true
        this.x = e.stageX
        this.y = e.stageY
        this.startX = this.x
        this.startY = this.y
        this.deltaX = 0
        this.deltaY = 0
    }

    private static onmousemove(e: Laya.Event) {
        if (this.mousepress) {
            let x = this.x
            let y = this.y
            this.x = e.stageX
            this.y = e.stageY
            this.deltaX = this.x - x
            this.deltaY = this.y - y
        }
    }

    private static onmouseup(e: Laya.Event) {
        this.mousepress = false
    }

    private static onkeydown(e: Laya.Event) {
    }

    private static onkeyup(e: Laya.Event) {
    }

    private static onkeypress(e: Laya.Event) {
    }
}
