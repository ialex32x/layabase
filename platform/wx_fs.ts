
class WeixinFileSystemBackend extends FileSystemBackend {
    read(path: string): any {
        let filePath = `${wx.env.USER_DATA_PATH}/${path}`
        return this.readFile(filePath)
    }

    readFile(filePath: string): any {
        let fs = wx.getFileSystemManager()
        try {
            fs.accessSync(filePath)
            let str = fs.readFileSync(filePath, "utf8")
            if (str && typeof str == "string") {
                let obj = JSON.parse(str)
                console.log("read", filePath, obj)
                return obj
            } else {
                console.warn("read (wrong type)", filePath, str)
            }
        } catch (err) {
            console.warn('read file not found', filePath, err)
        }
    }

    write(path: string, obj: any) {
        let filePath = `${wx.env.USER_DATA_PATH}/${path}`
        return this.writeFile(filePath, obj)
    }

    writeFile(filePath: string, obj: any) {
        if (obj) {
            let fs = wx.getFileSystemManager()
            fs.writeFileSync(filePath, JSON.stringify(obj), "utf8")
            console.log("write", filePath, obj)
        } else {
            console.error("invalid obj to write", filePath, obj)
        }
    }

    files(cb: (file: WXFileItem[]) => void) {
        let fs = wx.getFileSystemManager()
        fs.getSavedFileList({
            success: res => {
                console.log('filelist', res.fileList)
                cb(res.fileList)
            },
            fail: (res) => {
                console.error(res)
                cb([])
            }
        })
    }
}
