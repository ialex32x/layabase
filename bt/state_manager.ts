interface EntityStateActivator<T, P> {
    new (mgr: EntityStateManager<P>): T
}

abstract class EntityState<P> {
    protected mgr: EntityStateManager<P>

    constructor(mgr: EntityStateManager<P>) {
        this.mgr = mgr
    }

    onEnter() {
    }

    onExit() {
    }

    onUpdate(dt: number) { 
    }
}

class EntityStateManager<P> {
    private _entity: P
    private _running: EntityState<P>

    get state() {
        return this._running
    }

    get entity() {
        return this._entity
    }

    constructor(entity: P) {
        this._entity = entity
    }

    is<T extends EntityState<P>>(type: EntityStateActivator<T, P>) {
        return this._running instanceof type
    }

    not<T extends EntityState<P>>(type: EntityStateActivator<T, P>) {
        return !(this._running instanceof type)
    }

    enter<T extends EntityState<P>>(type: EntityStateActivator<T, P>) {
        if (!!this._running) {
            if (this._running instanceof type) {
                return false
            }
            this._running.onExit()
            this._running = null
        }
        this._running = new type(this)
        this._running.onEnter()
    }

    replace<T extends EntityState<P>>(state: T) {
        if (!!this._running) {
            this._running.onExit()
            this._running = null
        }
        this._running = state
        this._running.onEnter()
    }

    update(dt: number) {
        if (!!this._running) {
            this._running.onUpdate(dt)
        }
    }
}