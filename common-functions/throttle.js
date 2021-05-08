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

function outputSize(e) {
  console.log(e.target.innerWidth, e.target.innerHeight);
}
window.addEventListener("resize", throttle(outputSize, 1000)); // 不管触发频率多高，只在一秒内执行一次
