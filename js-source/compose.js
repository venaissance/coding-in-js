function compose(...fns) {
  return (arg) => fns.reduce((compose, f) => f(compose), arg);
}

var upper = function (x) {
  return x.toUpperCase();
};

var hello = function (x) {
  return "HELLO, " + x;
};

var greet = compose(hello, upper);
console.log(greet("varian")); // HELLO, VARIAN
