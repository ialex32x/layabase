class DragHelper {
    x: number
    y: number

    begin(e: Laya.Event) {
        this.x = e.stageX
        this.y = e.stageY
    }

    move(e: Laya.Event) {

    }

    end(e: Laya.Event) {

    }
}