function bind_1(asThis, ...args1) {
  const fn = this;
  return function (...args2) {
    fn.apply(asThis, ...args1, ...args2);
  };
}

function bind_2(asThis) {
  var fn = this;
  if (typeof fn !== "function") {
    throw new Error("Must accept function!");
  }
  var slice = Array.prototype.slice;
  var args1 = slice.call(arguments, 1);
  return function () {
    var args2 = slice.call(arguments, 0);
    fn.apply(asThis, args1.concat(args2));
  };
}

function bind_3(asThis) {
  var fn = this;
  if (typeof fn !== "function") {
    throw new Error("Must accept function!");
  }
  var slice = Array.prototype.slice;
  var args1 = slice.call(arguments, 1);
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
