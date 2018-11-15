
abstract class FileSystemBackend {
    abstract read(path: string): any
    abstract write(path: string, obj: any)
}

class NullFileSystemBackend extends FileSystemBackend {
    private _fs: any = {}

    read(path: string): any {
        return this._fs[path]
    }

    write(path: string, obj: any) {
        this._fs[path] = obj
    }
}
