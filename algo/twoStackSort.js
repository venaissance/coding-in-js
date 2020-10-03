function sort(stack) {
  const _sort = () => {
    if (stack.length <= 1) return;
    let num = stack.pop();
    if (num < stack[stack.length - 1]) {
      let temp = stack.pop();
      stack.push(num);
      num = temp;
      _sort(stack);
    } else {
      _sort(stack);
    }
    stack.push(num);
  };
  let index = stack.length;
  while (index > 0) {
    _sort();
    index--;
  }
  return stack;
}

function stackSort(stack) {
  const assist = [];
  while (stack.length) {
    let tmp = stack.pop();
    while (assist.length && assist[assist.length - 1] > tmp) {
      stack.push(assist.pop());
    }
    assist.push(tmp);
    console.log("assist", assist);
  }
  return assist;
}
const assist = [];
while (stack.length) {
  let tmp = stack.pop();
  while (assist.length && assist[assist.length - 1] > tmp) {
    stack.push(assist.pop())
  }
  assist.push(tmp)
}

function stackSort2(stack) {
  const assist = [];
  while (stack.length) {
    let tmp = stack.pop();
    while (assist.length && tmp < assist[assist.length - 1]) {
      stack.push(assist.pop());
    }
    assist.push(tmp);
  }
  return assist;
}

const stack = [2, 5, 6, 1, 23, 7];
const stack2 = [2, 5, 6, 1, 23, 7];
// console.log(sort(stack));
console.log(stackSort2(stack2));
