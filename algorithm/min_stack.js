class Stack {
  stack = [];
  minStack = [];
  push(val) {
    this.stack.push(val);
    const len = this.minStack.length;
    if (val <= this.minStack[len - 1]) {
      this.minStack.push(val);
    }
  }
  pop() {
    const val = this.stack.pop();
    if (val === this.minStack[this.minStack.length - 1]) {
      this.minStack.pop();
    }
    return val;
  }
  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}
