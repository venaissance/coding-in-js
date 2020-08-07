function throttle(fn, delay) {
  let canUse = true;
  return function () {
    if (canUse) {
      canUse = false;
      setTimeout(() => {
        fn.apply(this, arguments);
        canUse = true;
      }, delay);
    }
  };
}

function sayHi(e) {
  console.log(e.target.innerWidth, e.target.innerHeight);
}
window.addEventListener("resize", throttle(sayHi, 500));
