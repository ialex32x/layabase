class LayaUtil {
    static findChild(node: Laya.Node, name: string) {
        if (node.name == name) {
            return node
        }
        for (let index = 0; index < node.numChildren; index++) {
            let child = node.getChildAt(index)
            let match = this.findChild(child, name)
            if (!!match) {
                return match
            }
        }
    }
}
