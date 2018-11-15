class GameObject {
    private _name: string
    private _transform: Transform
    private _components = new Array<BaseComponent>()
    private _actived = true
    private _destroy = false

    get name() {
        return this._name
    }

    set name(value: string) {
        if (this._name != value) {
            this._name = value
        }
    }

    get actived() {
        return this._actived
    }

    set actived(value: boolean) {
        if (this._actived != value) {
            this._actived = value
            if (value) {
                this.onActive()
            } else {
                this.onDeactive()
            }
            for (let i = 0; i < this._components.length; i++) {
                let it = this._components[i]
                it.notifyActiveChanged()
            }
        }
    }

    get transform() {
        return this._transform
    }

    constructor(name: string = "New GameObject") {
        this._name = name
        this._transform = this.addComponent(Transform)
    }

    addComponent<T extends BaseComponent>(type: Component<T>): T {
        let component = new type(this)
        this._components.push(component)
        component.awake()
        return component
    }

    getComponent<T extends BaseComponent>(type: Component<T>): T {
        for (let i = 0; i < this._components.length; i++) {
            let it = this._components[i]
            if (it instanceof type) {
                return it as T
            }
        }
        return null
    }

    removeComponent<T extends BaseComponent>(component: T): T {
        for (let i = 0; i < this._components.length; i++) {
            let it = this._components[i]
            if (it == component) {
                this._components.splice(i, 1)
                if (it instanceof Transform) {
                    this._transform = null
                }
                return component
            }
        }
    }

    update(dt: number) {
        if (this._actived) {
            for (let i = 0; i < this._components.length; i++) {
                let it = this._components[i]
                it.update(dt)
            }
            if (!!this._transform) {
                this._transform._postframe()
                let childCount = this._transform.childCount
                for (let i = 0; i < this._transform.childCount; i++) {
                    let child = this._transform.getChild(i)
                    child.gameObject.update(dt)
                }
            }
        }
    }

    destroy() {
        if (!this._destroy) {
            this._destroy = true
            if (this._actived) {
                this._actived = false
                this.onDeactive()
            }
            this.onDestroy()
        }
    }

    protected onDestroy() {
        let copy = new Array<BaseComponent>(...this._components)
        for (let i = 0; i < copy.length; i++) {
            let it = copy[i]
            it.destroy()
        }
        this._transform = null
    }

    protected onActive() {

    }

    protected onDeactive() {

    }
}
