interface IBehaveNode {
    setContext(ctx: any)
    init()
    update(dt: number): BehaveState
    deinit()
    clone(): IBehaveNode
}

enum BehaveState {
    RUN,
    END,
}

abstract class BehaveNode implements IBehaveNode {
    protected ctx: any

    setContext(ctx: any) {
        this.ctx = ctx
    }

    init() {
    }

    abstract update(dt: number): BehaveState

    deinit() {
    }

    abstract clone(): IBehaveNode
}

class BehaveManager {
    private _kv: { [name: string]: Array<IBehaveNode> } = {}

    add(name: string, node: IBehaveNode) {
        let list = this._kv[name]
        if (!list) {
            list = new Array<IBehaveNode>()
            list.push(node)
            this._kv[name] = list
        }
        return this
    }

    alloc(name: string): IBehaveNode {
        let list = this._kv[name]
        if (!!list) {
            let size = list.length
            if (size > 1) {
                let node = list.splice(size - 1)[0]
                console.log("behave manager load", list.length, node)
                return node
            }
            let node = list[0].clone()
            console.log("behave manager load", list.length, node)
            return node
        }
    }

    dealloc(name: string, node: IBehaveNode) {
        let list = this._kv[name]
        if (!!list) {
            list.push(node)
            console.log("behave manager save", list.length)
        }
    }

    run(name: string, ctx?: any): BehaveRunner {
        let runner = new BehaveRunner(ctx, name, this)
        return runner
    }
}

class BehaveRunner {
    private _ctx: any
    private _running = false
    private _name: string
    private _manager: BehaveManager
    private _root: IBehaveNode

    constructor(ctx: any, name: string, manager: BehaveManager) {
        this._name = name
        this._manager = manager
        this._ctx = ctx
        this.restart()
    }

    stop() {
        if (!!this._root) {
            this._root.deinit()
            this._root.setContext(null)
            this._manager.dealloc(this._name, this._root)
            this._root = null
            this._running = false
            // console.log("behave stop")
        }
    }

    restart() {
        this.stop()
        this._root = this._manager.alloc(this._name)
        if (!!this._root) {
            this._root.setContext(this._ctx)
            this._root.init()
            this._running = true
            // console.log("behave restart")
        }
    }

    update(dt: number): boolean {
        if (this._running) {
            let state = this._root.update(dt)
            if (state == BehaveState.END) {
                this.stop()
            }
        }
        return this._running
    }
}

abstract class BehaveComposite extends BehaveNode {
    protected childs = new Array<IBehaveNode>()

    addChild(node: IBehaveNode) {
        this.childs.push(node)
    }

    setContext(ctx: any) {
        for (let child of this.childs) {
            child.setContext(ctx)
        }
    }
}

class BehaveSequence extends BehaveComposite {
    protected _index: number // 当前执行索引
    protected _round: number // 需要执行多少轮
    protected _run: number   // 已经执行多少轮

    constructor(round: number = Infinity) {
        super()
        this._round = round
    }

    init() {
        this._index = -1
        this._run = 0
    }

    update(dt: number) {
        let node = this.childs[this._index]
        if (!!node) {
            // 存在当前运行节点, 执行
            let state = node.update(dt)
            // console.log("seq update", this._index, this._run, this._round)
            if (state == BehaveState.RUN) {
                return BehaveState.RUN
            }
            // console.log("seq end", this._index, this._run, this._round)
            node.deinit()
        }
        // 选出下一个节点执行
        this._index++
        node = this.childs[this._index]
        if (!node) {
            // 没有更多节点, 一轮跑完
            this._index = -1
            this._run++
            // console.log("seq round", this._index, this._run, this._round)
            if (this._run >= this._round) {
                // 所有轮跑完, 结束执行序列
                return BehaveState.END
            }
        } else {
            // 初始化将执行的节点
            node.init()
            // console.log("seq next", this._index, this._run, this._round)
        }
        return BehaveState.RUN
    }

    clone() {
        let seq = new BehaveSequence(this._round)
        for (let child of this.childs) {
            seq.addChild(child.clone())
        }
        return seq
    }
}

class BehaveParallel extends BehaveComposite {
    private running = new Array<IBehaveNode>()

    init() {
        this.running.splice(0, this.running.length, ...this.childs)
        for (let child of this.running) {
            child.init()
        }
    }

    update(dt: number) {
        for (let index = 0; index < this.running.length;) {
            let child = this.running[index]
            let state = child.update(dt)
            if (state == BehaveState.END) {
                child.deinit()
                this.running.splice(index, 1)
            } else {
                index++
            }
        }
        return this.running.length > 0 ? BehaveState.RUN : BehaveState.END
    }

    deinit() {
        for (let child of this.running) {
            child.deinit()
        }
    }

    clone() {
        let prl = new BehaveParallel()
        for (let child of this.childs) {
            prl.addChild(child.clone())
        }
        return prl
    }
}

class BehaveWait extends BehaveNode {
    private _time: number
    private _elapsed: number

    constructor(time: number) {
        super()
        this._time = time
    }

    init() {
        this._elapsed = 0
    }

    update(dt: number) {
        this._elapsed += dt
        // console.log("??? ", this._elapsed, dt, this._time)
        return this._elapsed < this._time ? BehaveState.RUN : BehaveState.END
    }

    clone() {
        return new BehaveWait(this._time)
    }
}

class BehaveAction extends BehaveNode {
    protected cb: (ctx: any) => void
    constructor(cb: (ctx: any) => void) {
        super()
        this.cb = cb
    }

    update(dt: number) {
        this.cb(this.ctx)
        return BehaveState.END
    }

    clone() {
        return new BehaveAction(this.cb)
    }
}
