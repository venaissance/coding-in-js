function debounce(fn, delay) {
  // 到点一起上车
  let timeout;
  return function () {
    if (timeout) window.clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}

const debounced = debounce(() => console.log("hi"), 3000); // 3秒后输出hi
debounced();
debounced();
