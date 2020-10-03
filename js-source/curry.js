function sum(a, b, c, d, e) {
  return a + b + c + d + e;
}
const sumAny = (...args) => args.reduce((sum, n) => sum + n, 0);

function curry(fn) {
  console.log(fn.length);
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return function (...args2) {
        return curried(...args.concat(args2));
      };
    }
  };
}

const currify = (fn, params = []) => (...args) =>
  params.length + args.length === fn.length
    ? fn(...params, ...args)
    : currify(fn, [...params, ...args]);

let newSum = currify(sum);
console.log(newSum(1)(2)(3, 4, 5));
