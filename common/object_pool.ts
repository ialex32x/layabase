interface IPool<T> {
    alloc(): T;
    dealloc(obj: T);
}

interface RefCountObject {
    retain()
    release()
}

class ObjectPool<T extends RefCountObject> implements IPool<T> {
    private count = 0
    private objects = new Array<T>()
    ctor: (pool: IPool<T>) => T
    initer: (obj: T) => void
    corner: number
    limit: number

    create(ctor: { new (pool): T }) {
        return new ctor(this)
    }

    constructor(limit: number, ctor: (pool: IPool<T>) => T, initer?: (obj: T) => void) {
        this.ctor = ctor
        this.initer = initer
        this.limit = limit
    }

    alloc() {
        let cs = this.objects.pop()
        if (!cs) {
            cs = this.ctor(this)
        } else {
            cs.retain()
        }
        if (!!this.initer) {
            this.initer(cs)
        }
        this.count++
        return cs
    }

    dealloc(cs: T) {
        this.count--
        if (this.objects.length < this.limit) {
            this.objects.push(cs)
        }
    }

    print() {
        console.log("object pool", this.objects.length, this.count)
    }
}
