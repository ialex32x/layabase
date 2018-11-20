interface Component<T> {
    new (go: GameObject): T
}

class BaseComponent extends ManagedObject {
    private _destroy: boolean = false
    private _enabled: boolean = true
    private _gameObject: GameObject

    constructor(gameObject: GameObject) {
        super()
        this._gameObject = gameObject
    }

    get transform() {
        return this._gameObject.transform
    }

    get gameObject() {
        return this._gameObject
    }

    get enabled() {
        return this._enabled
    }

    set enabled(value: boolean) {
        if (this._enabled != value) {
            this._enabled = value
            this._onEnableChanged()
        }
    }

    notifyActiveChanged() {
        this._onEnableChanged()
    }

    _onEnableChanged() {
        if (!this._destroy) {
            if (this._enabled && this._gameObject.actived) {
                this.onEnable()
            } else {
                this.onDisable()
            }
        }
    }

    awake() {
        this.onAwake()
        if (this._enabled && !this._destroy) {
            this.onEnable()
        }
    }

    update(dt: number) {
        if (this._enabled && this._gameObject.actived && !this._destroy) {
            this.onUpdate(dt)
        }
    }

    destroy() {
        if (!this._destroy) {
            this._destroy = true
            if (this._enabled) {
                this._enabled = false
                this.onDisable()
            }
            this.onDestroy()
            if (!!this._gameObject) {
                this._gameObject.removeComponent(this)
            }
        }
    }

    protected onAwake() {
    }

    protected onEnable() {
    }

    protected onDisable() {
    }

    protected onUpdate(dt: number) {
    }

    protected onDestroy() {
    }
}