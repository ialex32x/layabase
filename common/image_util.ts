class ImageUtil {
    static loadImageBase64(url: string, cb: Function) {
        let sprite = new laya.display.Sprite()
        console.log(`loadImageBase64.init ${url}`)
        sprite.loadImage(url, 0, 0, 0, 0, Laya.Handler.create(this, () => {
            let width = sprite.width
            let height = sprite.height
            console.log(`loadImageBase64.loaded ${url}:: ${width}x${height}`)
            let canvas = sprite.drawToCanvas(width, height, 0, 0)
            canvas.toBase64("image/png", 0.92, imageBase64 => {
                console.log(`loadImageBase64.encoded ${url}`)
                cb(imageBase64)
            })
        }))
    }
}
