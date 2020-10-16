// 1. 组合继承
function Parent(value) {
  this.value = value;
}
Parent.prototype.getValue = function () {
  console.log(this.value);
};
function Child(value) {
  Parent.call(this, value);
}
Child.prototype = new Parent();
const child = new Child(1);
child.getValue(); // 1
console.log(child instanceof Parent); // true

// 2. 寄生组合继承
Child.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child,
    enumerable: false,
    writable: true,
    configurable: true,
  },
});
const child2 = new Child(2);

console.log(Child.prototype.constructor);
child2.getValue(); // 2
console.log(child2 instanceof Parent); // true
