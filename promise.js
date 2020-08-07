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
