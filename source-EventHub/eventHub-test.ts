import EventHub from './eventHub'


const t1 = () => {
    const eh = new EventHub()
    let called = false
    const fn1 = () => {
        called = true
        console.log('called')
        console.assert(called)
    }
    const fn2 = () => {
        called = true
        console.log('called2')
        console.assert(called)
    }
    eh.on('eat', [fn1, fn2])
    eh.emit('eat')
}

const t2 = () => {
    const eh = new EventHub()
    const fn1 = () => {
        console.log('hi')
    }
    eh.on('hello', fn1)
    eh.off('hello', fn1)
    eh.emit('hello')
}

t1()
t2()
