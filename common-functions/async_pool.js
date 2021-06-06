// 对 Promise.all 做并发限制
// https://github.com/rxaviers/async-pool/blob/master/lib/es7.js
async function asyncPool(poolLimit, array, iteratorFn) {
    const results = []
    const excuting = []

    for (const item of array) {
        const p = Promise.resolve().then(() => iteratorFn(item, array))
        results.push(p)

        if (poolLimit <= array.length) {
            const e = p.then(() => excuting.splice(excuting.indexOf(e), 1))
            excuting.push(e)
            if (excuting.length >= poolLimit) {
                await Promise.race(excuting)
            }
        }
    }
    return Promise.all(results)
}

const timeout = i => new Promise(resolve => setTimeout(() => { console.log(i); resolve(i) }, i))
asyncPool(2, [1000, 5000, 3000, 2000], timeout).then(results => console.log(results))

