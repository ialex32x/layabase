class ManagedObject {
    private static _id = 0
    private _id: number

    get id() {
        return this._id
    }

    constructor() {
        this._id = ++ManagedObject._id
    }
}