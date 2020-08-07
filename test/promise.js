class Promise {
  state = "pending";
  callbacks = [];
  constructor(fn) {
    if (typeof fn !== "function") {
      throw new Error("must accept function!");
    }
    fn(this.resolve.bind(this), this.reject.bind(this));
  }
  resolve(result) {
    if (this.state !== "pending") return;
    this.state = "fulfilled";
    process.nextTick(() => {
      this.callbacks.forEach((handle) => {
        if (typeof handle[0] === "function") {
          handle[0].call(undefined, result);
        }
      });
    });
  }
  reject(reason) {
    if (this.state !== "pending") return;
    this.state = "rejected";
    process.nextTick(() => {
      this.callbacks.forEach((handle) => {
        if (typeof handle[1] === "function") {
          handle[1].call(undefined, reason);
        }
      });
    });
  }
  then(succeed, fail) {
    const handle = [];
    if (typeof succeed === "function") {
      handle[0] = succeed;
    }
    if (typeof fail === "function") {
      handle[1] = fail;
    }
    this.callbacks.push(handle);
  }
}

function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) throw new Error("must accept Array");
    let cnt = 0;
    let resArr = new Array(promises.length);
    for (let i = 0; i < promises.length; ++i) {
      Promise.resolve(promises[i]).then(
        (result) => {
          cnt++;
          resArr[i] = result;
          if (cnt === promises.length) {
            return resolve(resArr);
          }
        },
        (reason) => {
          return reject(reason);
        },
      );
    }
  });
}

const p1 = Promise.resolve(1);
const p2 = Promise.reject(2);
const p2 = Promise.resolve(2);
promiseAll([p1, p2, p3]).then(
  (result) => {
    console.log(result);
  },
  (reason) => {
    console.log(reason);
  },
);
