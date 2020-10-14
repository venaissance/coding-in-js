function currify(fn) {
  return function curried(...args) {
    if (args.length === fn.length) return fn(...args);
    else return (...args2) => curried(...args, ...args2);
  };
}

function sum(a, b, c, d, e) {
  return a + b + c + d + e;
}

const newSum = currify(sum);
console.log(newSum(1, 2)(3)(4, 5)); // 15
console.log(newSum(1)(2, 3)(4, 5)); // 15
console.log(newSum(1)(2, 3, 4, 5)); // 15
