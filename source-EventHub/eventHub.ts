class EventHub {
    private cache = {}
    on(EventName, fn) {
        this.cache[EventName] = this.cache[EventName] || []
        if (fn instanceof Array) {
            fn.forEach(i => {
                this.cache[EventName].push(i)
            });
        } else {
            this.cache[EventName].push(fn)
        }
    }
    emit(EventName) {
        (this.cache[EventName] || []).forEach(fn => fn());
    }
    off(EventName, fn) {
        const index = indexOf(this.cache[EventName], fn)
        if (index === -1) return
        this.cache[EventName].splice(index, 1)
        console.log('off')
    }
}

export default EventHub

function indexOf(arr, item) {
    if (arr === undefined) return -1
    let index = -1
    for (let i = 0; i < arr.length; ++i) {
        if (arr[i] === item) {
            index = i
            break
        }
    }
    return index
}
