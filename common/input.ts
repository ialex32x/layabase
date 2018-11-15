class Input {
    static x: number
    static y: number
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
    }

    private static onmousemove(e: Laya.Event) {
        if (this.mousepress) {
            this.x = e.stageX
            this.y = e.stageY
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
