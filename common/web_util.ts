class WebUtil {
    static unfocus() {
        let e: any = document.activeElement
        if (!!e) {
            e.blur()
        }
    }
}