abstract class BaseGameState {
    protected _visible = false
    private _mgr: GameStateManager

    init(mgr: GameStateManager) {
        this._mgr = mgr
        this.onInit()
    }

    pop() {
        this._mgr.remove(this)
    }

    get visible() {
        return this._visible
    }

    set visible(newValue: boolean) {
        if (newValue != this._visible) {
            this._visible = newValue
            if (newValue) {
                this.onShow()
            } else {
                this.onHide()
            }
        }
    }

    destroy() {
        this.onDestroy()
    }

    update(dt: number) {
    }

    protected onDestroy() { }

    protected onInit() { }

    protected onShow() { }

    protected onHide() { }
}
