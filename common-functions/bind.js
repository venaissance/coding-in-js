// 初级：ES6 新语法
function bind_1(asThis, ...args) {
  const fn = this;
  return function (...args2) {
    return fn.apply(asThis, ...args, ...args2);
  };
}

// 中级：兼容 ES5
function bind_2(asThis) {
  var slice = Array.prototype.slice;
  var args = slice.call(arguments, 1);
  var fn = this;
  if (typeof fn !== "function") {
    throw new Error("cannot bind non_function");
  }
  return function () {
    var args2 = slice.call(arguments, 0);
    return fn.apply(asThis, args.concat(args2));
  };
}

// 高级：支持new
// const a = new Fn.bind(newThis, args)()
// new fn() 等价于：temp = {}, temp.__proto__ = fn.prototype, fn.apply(temp, ...args), return temp
function bind_3(asThis) {
  var slice = Array.prototype.slice;
  var args1 = slice.call(arguments, 1);
  var fn = this;
  if (typeof fn !== "function") {
    throw new Error("Must accept function");
  }
  function resultFn() {
    var args2 = slice.call(arguments, 0);
    return fn.apply(
      resultFn.prototype.isPrototypeOf(this) ? this : asThis,
      args1.concat(args2),
    );
  }
  resultFn.prototype = fn.prototype;
  return resultFn;
}
