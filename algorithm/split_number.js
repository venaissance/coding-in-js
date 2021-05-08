const readline = require('readline')
const cin = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

/**
 * 分数字 V1
将n分成若干个大于0的数的和，按照字典序输出所有方案。
最简单例子
输入：
2
输出：
1 1
2
 * @param {*} num 
 * @returns 
 */
// 递归公式：F(n) = i.concat(F(n-i))  (1 <= i <= n)
const s1_1 = (num) => {

    const res = []
    let temp = []

    const recur = (n) => {
        if (n === 0) {
            res.push([...temp])
            return
        }

        for (let i = 1; i <= n; ++i) {
            temp.push(i)
            recur(n - i)
            temp.pop()
        }
    }

    recur(num)

    return res.map(i => i.join(' ')).join('\n')
}

const s1_2 = (arr, num) => {
    if (num <= 0) return
    for (let i = 1; i <= num; ++i) {
        const newArr = [...arr, i]
        s1_2(newArr, num - i)
        if (num - i === 0) console.log(newArr.join(' '))
    }
}


/**
 * 分数字 V2
将n分成若干个大于0的数的和，1 2同 2 1 (同理1 3，3 1...）视作相同的划分。
按照字典序输出所有方案。
最简单例子
输入：
3
输出：
1 1 1
1 2
------2 1
3
 */
// 递归公式：F(n) = i.concat(F(n-i))  (1 <= i <= n)
// 新特征：输出按照非降序排列
// newArr[newArr.length - 1] >= arr[arr.length - 1]

const s2_1 = (arr, n) => {
    if (n <= 0) return
    for (let i = 1; i <= n; ++i) {
        const newArr = [...arr, i]
        if (newArr[newArr.length - 1] < arr[arr.length - 1]) continue
        s2_1(newArr, n - i)
        if (n - i === 0) console.log(newArr.join(' '))
    }
}

/**
 * 分数字 V3
将n分成m个大于0的不同数的和，1 2同 2 1 (同理1 3，3 1...）视作相同的划分。
按照字典序输出所有方案。数据保证存在解，即不会出现1+2+...m > n的情况
最简单例子
输入：
3 2
输出：
----1 1 1
1 2
----2 1
3
递归公式仍然是：F(n) = i.concat(F(n-i))  (1 <= i <= n)
排列顺序变更：输出升序排列
newArr[newArr.length - 1] > arr[arr.length - 1]
递归终止条件和输出条件变更：需要判断当前arr的length是否已经等于目标个数chunk
 */
const s3_1 = (arr, n, chunk) => {
    if (arr.length >= chunk || n <= 0) return
    for (let i = 1; i <= n; i++) {
        const newArr = [...arr, i]
        if (newArr[newArr.length - 1] <= arr[arr.length - 1]) continue
        s3_1(newArr, n - i, chunk)
        if (n - i === 0 && newArr.length === chunk) console.log(newArr.join(' '))
    }
}


cin.on('line', input => {
    // const num = parseInt(input.trim())
    // s1_2([], num)
    // s2_1([], num)
    const [n, chunk] = input.split(' ').map(i => parseInt(i))
    s3_1([], n, chunk)
    // process.exit(0)
})
