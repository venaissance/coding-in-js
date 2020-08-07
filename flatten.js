function flatten(arr) {
  return arr.reduce((pre, curr) => {
    return pre.concat(Array.isArray(curr) ? flatten(curr) : curr);
  }, []);
}

Array.prototype.myFlat = function (num = 1) {
  if (Array.isArray(this)) {
    let arr = [];
    if (!Number(num) || Number(num) < 0) {
      return this;
    }
    this.forEach((item) => {
      if (Array.isArray(item)) {
        let count = num;
        arr = arr.concat(item.myFlat(--count));
      } else {
        arr.push(item);
      }
    });
    return arr;
  } else {
    throw this + ".flat is not a function";
  }
};

const arr = [1, 2, 3, [4, [5, 6]], "aaa"];

const res = flatten(arr);
console.log(res);
