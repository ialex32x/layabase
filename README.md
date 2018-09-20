# layabase
一些简单的功能

比如简化的 behaviour tree, astar pathfinding 等


```typescript
        let prl = new BehaveParallel()
        // 只执行一轮的序列 (无限执行不传参即可)
        let seq1 = new BehaveSequence(1) 
        seq1.addChild(new BehaveWait(3000))
        // 执行指定函数动作的行为节点
        seq1.addChild(new BehaveAction(ctx => {
            console.log("bt.action1", Laya.timer.currTimer / 1000)
        }))
        prl.addChild(seq1)
        let seq2 = new BehaveSequence(6)
        seq2.addChild(new BehaveWait(1000))
        seq2.addChild(new BehaveAction(ctx => {
            console.log("bt.action2", Laya.timer.currTimer / 1000)
        }))
        prl.addChild(seq2)

        let mgr = new BehaveManager()
        mgr.add("test", prl)

        let runner1 = mgr.run("test", null)
        // let runner2 = mgr.run(null, "test")
        let restart = true
        Laya.timer.loop(1, this, () => {
            if (!runner1.update(Laya.timer.delta)) {
                if (restart) {
                    // 执行结束后可以重启
                    runner1.restart()
                    restart = false
                }
            }
            // runner2.update(Laya.timer.delta)
        })
```