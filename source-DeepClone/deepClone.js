class DeepClone {
  // 1. 递归克隆 2. 对象分类讨论 3. 缓存处理环
  constructor() {
    this.cacheList = [];
  }
  clone(source) {
    if (source instanceof Object) {
      const cache = this.findCache(source); // 如果找到缓存，直接返回
      if (cache) return cache;
      else {
        let target;
        if (target instanceof Array) {
          target = new Array();
        } else if (target instanceof Function) {
          target = function () {
            return source.apply(this, arguments);
          };
        } else if (target instanceof Date) {
          target = new Date(source);
        } else if (target instanceof RegExp) {
          target = new RegExp(source.source, source.flags);
        } else {
          target = new Object();
        }

        this.cacheList.push([source, target]); // 把原对象和新对象放进缓存列表
        for (let key in source) {
          if (source.hasOwnProperty(key)) {
            // 不拷贝原型上的属性，浪费内存
            target[key] = this.clone(source[key]); // 递归
          }
        }
        return target;
      }
    } else {
      return source;
    }
  }
  findCache(source) {
    for (let i = 0; i < this.cacheList.length; ++i) {
      if (this.cacheList[i][0] === source) {
        return this.cacheList[i][1];
      }
    }
  }
}

function test() {
  console.log("测试环");
  const obj = { name: "hh" };
  obj.self = obj;
  const obj2 = new DeepClone().clone(obj);
  console.assert(obj !== obj2);
  console.assert(obj.name === obj2.name);
  console.assert(obj.self !== obj2.self);
}
test();
