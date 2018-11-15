class GameStateManager {
    private _states = new Array<BaseGameState>()

    push(newState: BaseGameState) {
        let size = this._states.length
        if (size > 0) {
            this._states[size - 1].visible = false
        }
        newState.init(this)
        newState.visible = true
        this._states.push(newState)
    }

    remove(delState: BaseGameState) {
        let size = this._states.length
        for (let index = size - 1; index >= 0; index--) {
            let state = this._states[index]
            if (state == delState) {
                this._states.splice(index, 1)
                state.visible = false
                state.destroy()
                if (index == size - 1) {
                    this._states[index - 1].visible = true
                }
                return state
            }
        }
    }

    pop() {
        let size = this._states.length
        if (size > 1) {
            let state = this._states[size - 1]
            this.remove(state)
        }
    }

    update(dt: number) {
        let size = this._states.length
        if (size > 1) {
            let state = this._states[size - 1]
            state.update(dt)
        }
    }
}