function debounce(fn, delay) {
  // 防抖就是等待一起做
  let timeout;
  return function () {
    if (timeout) window.clearTimeout();
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}

window.scroll = debounce(() => {
  console.log("on");
}, 1000);
