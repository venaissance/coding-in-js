// 1. 手写Promise
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

// 2. 手写 promise.all
Promise.all = function (promises) {
  let results = [];
  let len = promises.length;
  return new Promise((resolve, reject) => {
    for (let i = 0; i < len; ++i) {
      promises[i].then(
        (res) => {
          results[i] = res;
          if (++i === len) resolve(results);
        },
        (err) => {
          reject(err);
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

// 3. 手写Promise.race
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

// 4. Promise 实现超时判断
const uploadFile = (url, params) => {
  return Promise.race([
    uploadFilePromise(url, params),
    uploadFileTimeout(3000),
  ]);
};
function uploadFilePromise(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, {
        // headers: {...}
      })
      .then((res) => {
        if (res.statusCode === 200 && res.data.code === 0) {
          resolve(res.data.result);
        } else {
          reject(res.data);
        }
      });
  });
}

function uploadFileTimeout(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject({ msg: "超时" });
    }, delay);
  });
}

// 4. 实现 Promise.retry，成功后 resolve 结果，失败后重试，尝试超过一定次数才真正的 reject

Promise.retry = function (fn, num) {
  return new Promise(async function (resolve, reject) {
    while (num) {
      try {
        const res = await fn;
        resolve(res);
        num = 0;
      } catch (e) {
        if (!num) reject(e);
      }
      num--;
    }
  });
};
