// 1.实现一个sleep函数
function sleep(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

sleep(1000);

// 2. 实现一个红绿灯循环变换的函数lightChange
const red = () => console.log("red");
const green = () => console.log("green");
const yellow = () => console.log("yellow");
const onLight = (cb, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      cb();
      resolve();
    }, delay);
  });
};
const lightChange = () => {
  Promise.resolve()
    .then(() => onLight(red, 1000))
    .then(() => onLight(green, 2000))
    .then(() => onLight(yellow, 3000))
    .then(lightChange);
};
// lightChange();

// 3.实现一个promisify函数
// const newFsReadFile = promisify(fs.readFile);
// newFsReadFile(path, "utf-8")
//   .then((data) => {})
//   .catch((err) => {});
function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, data) => (err ? reject(err) : resolve(data)));
    });
  };
}

// 4.实现一个并发请求控制函数，限制并发数
function concurrentLimitRequest(urls, limit) {
  const asyncPool = [];
  const queue = [...urls];

  const pipe = () => {
    return new Promise((resolve, reject) => {
      queue.shift();
      resolve();
    }).then(() => {
      if (queue.length) pipe();
      else console.log("done");
    });
  };

  while (limit--) {
    asyncPool.push(pipe());
  }

  return Promise.all(asyncPool);
}

// 5.实现一个异步超时器
function timeoutPromise(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("TIMEOUT");
    }, delay);
  });
}

Promise.race([() => console.log("win"), timeoutPromise(3000)]).then(
  () => console.log("Succeed"),
  (err) => console.log("Reject"),
);

// 6. 实现一个异步求和函数
function asyncAdd(a, b, callback) {
  setTimeout(function () {
    callback(null, a + b);
  }, 500);
}

async function asyncSum(...args) {
  if (args.length > 1) {
    const result = await new Promise((resolve, reject) => {
      asyncAdd(args[0], args[1], (err, data) =>
        err ? reject(err) : resolve(data),
      );
    });
    return asyncSum(result, ...args.slice(2));
  }
  return args[0];
}

asyncSum(1, 2, 3, 4, 5, 6).then((data) => console.log(data));

// 7. 实现一个限流调度器（最大支持2个并发）
function Scheduler() {
  this.list = [];
  this.add = function (promiseCreator) {
    this.list.push(promiseCreator);
  };
  this.maxCount = 2;
  var tempRunIndex = 0;
  this.taskStart = function () {
    for (var i = 0; i < this.maxCount; i++) {
      request.bind(this)();
    }
  };
  function request() {
    if (!this.list || !this.list.length || tempRunIndex >= this.maxCount) {
      return;
    }
    tempRunIndex++;
    this.list
      .shift()()
      .then(() => {
        tempRunIndex--;
        request.bind(this)();
      });
  }
}
function timeout(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
var scheduler = new Scheduler();
function addTask(time, order) {
  scheduler.add(() => timeout(time).then(() => console.log(order)));
}
addTask(1000, 1);
addTask(500, 2);
addTask(300, 3);
addTask(400, 4);
scheduler.taskStart();
