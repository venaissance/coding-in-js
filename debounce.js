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

const debounced = debounce(() => console.log("hi"), 3000);
debounced();
debounced();

window.scroll = debounce(() => {
  console.log("on");
}, 1000);

function debounce(fn, delay) {
  let timeout;
  return function () {
    if (timeout) window.clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}
