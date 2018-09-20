interface IPool<T> {
    alloc(): T;
    dealloc(obj: T);
}

class ObjectPool<T> implements IPool<T> {
    private objects = new Array<T>()
    ctor: (pool: IPool<T>) => T
    initer: (obj: T) => void
    corner: number
    limit: number

    create(ctor: { new (pool): T }) {
        return new ctor(this)
    }

    constructor(limit: number, ctor: (pool: IPool<T>) => T, initer: (obj: T) => void) {
        this.ctor = ctor
        this.initer = initer
        this.limit = limit
    }

    alloc() {
        let cs = this.objects.pop()
        if (!cs) {
            cs = this.ctor(this)
        }
        this.initer(cs)
        return cs
    }

    dealloc(cs: T) {
        if (this.objects.length < this.limit) {
            this.objects.push(cs)
        }
    }
}
