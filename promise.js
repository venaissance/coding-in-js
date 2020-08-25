class Promise2 {
  state = "pending";
  callbacks = [];
  constructor(fn) {
    if (typeof fn !== "function") {
      throw new Error("must pass function");
    }
    fn(this.resolve.bind(this), this.reject.bind(this));
  }
  resolve(result) {
    if (this.state !== "pending") return;
    this.state = "fulfilled";
    nextTick(() => {
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
    nextTick(() => {
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

function nextTick(fn) {
  if (process !== undefined && typeof process.nextTick === "function") {
    return process.nextTick(fn);
  } else {
    // 实现浏览器上的nextTick
    var counter = 1;
    var observer = new MutationObserver(fn);
    var textNode = document.createTextNode(String(counter));

    observer.observe(textNode, {
      characterData: true,
    });
    counter += 1;
    textNode.data = String(counter);
  }
}

function PromiseAll(promises) {
  let results = [];
  let len = promises.length;
  return new Promise((resolve, reject) => {
    for (let i = 0; i < len; ++i) {
      promises[i].then(
        (res) => {
          results[i] = res;
          if (++i === len) resolve(results);
        },
        (err) => reject(err),
      );
    }
  });
}

Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let results = [];
    let len = promises.length;
    for (let i = 0; i < len; ++i) {
      promises[i].then(
        (res) => {
          results[i] = res;
          if (++i === len) {
            resolve(results);
          }
        },
        (reason) => {
          reject(reason);
        },
      );
    }
  });
};

const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

const p4 = Promise.reject(4);
const p5 = Promise.reject(5);
const p6 = Promise.reject(6);

Promise.all([p1, p2, p3]).then((i) => console.log(i));

Promise.race = function (arr) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < arr.length; i++) {
      arr[i].then(resolve, reject);
    }
  });
};
Promise.race([p4, p5, p6]).then((data) => {
  // 谁快就是谁
  console.log(data); // 4
});
