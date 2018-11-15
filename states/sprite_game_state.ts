class SpriteGameState extends BaseGameState {
    protected body: Laya.Sprite

    public addChild(sprite: Laya.Sprite) {
        this.body.addChild(sprite)
        return this
    }

    protected onInit() {
        this.body = new Laya.Sprite()
        Laya.stage.addChild(this.body)
        this.body.size(Laya.stage.width, Laya.stage.height)
    }

    protected onShow() {
        super.onShow()
        this.body.visible = true
    }
    
    protected onHide() {
        super.onHide()
        this.body.visible = false
    }

    protected onDestroy() {
        super.onDestroy()
        this.body.removeSelf()
    }
}