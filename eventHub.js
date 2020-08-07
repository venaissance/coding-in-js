class EventHub {
  cache = {};
  on(eventName, fn) {
    this.cache[eventName] = this.cache[eventName] || [];
    this.cache[eventName].push(fn);
  }
  emit(eventName) {
    this.cache[eventName].forEach((fn) => fn());
  }
  off(eventName, fn) {
    const index = indexOf(this.cache[eventName], fn);
    if (index === -1) return;
    this.cache[eventName].splice(index, 1);
  }
}

function indexOf(arr, item) {
  if (arr === undefined) return -1;
  let index = -1;
  for (let i = 0; i < arr.length; ++i) {
    if (arr[i] === item) {
      index = i;
      break;
    }
  }
  return index;
}

// Test
const t1 = () => {
  const eh = new EventHub();
  let called = false;
  const fn1 = () => {
    called = true;
    console.log("called");
    console.assert(called);
  };
  const fn2 = () => {
    called = true;
    console.log("called2");
    console.assert(called);
  };
  eh.on("eat", [fn1, fn2]);
  eh.emit("eat");
};

const t2 = () => {
  const eh = new EventHub();
  const fn1 = () => {
    console.log("hi");
  };
  eh.on("hello", fn1);
  eh.off("hello", fn1);
  eh.emit("hello");
};

t1();
t2();
