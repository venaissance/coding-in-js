class EventHub {
  callbacks = {};
  on(EventName, fn) {
    this.callbacks[EventName] = this.callbacks[EventName] || [];
    this.callbacks[EventName].push(fn);
  }
  emit(EventName) {
    this.callbacks[EventName].forEach((fn) => fn());
  }
  off(EventName, fn) {
    const index = indexOf(this.callbacks[EventName], fn);
    if (index !== -1) {
      this.callbacks[EventName].splice(index, 1);
    }
  }
}

function indexOf(arr, item) {
  let index = -1;
  if (arr === undefined || !(arr instanceof Array)) {
    return index;
  }
  for (let i = 0; i < arr.length; ++i) {
    if (arr[i] === item) {
      index = i;
      break;
    }
  }
  return index;
}
