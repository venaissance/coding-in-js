class DeepCloner {
  constructor() {
    this.cacheList = [];
  }
  clone(source) {
    if (source instanceof Object) {
      const cache = this.findCache(this.cacheList, source);
      if (cache) return cache;
      else {
        let target;
        if (source instanceof Array) {
          target = new Array();
        } else if (source instanceof Function) {
          target = function () {
            return source.apply(this, arguments);
          };
        } else if (source instanceof Date) {
          target = new Date(source);
        } else if (source instanceof RegExp) {
          target = new RegExp(source.source, source.flags);
        } else {
          target = new Object();
        }
        this.cacheList.push([source, target]);
        for (let key in source) {
          if (source.hasOwnProperty(key)) {
            target[key] = this.clone(source[key]);
          }
        }
        return target;
      }
    } else {
      return source;
    }
  }
  findCache(list, source) {
    for (let i = 0; i < list.length; ++i) {
      if (list[i][0] === source) {
        return list[i][1];
      }
    }
  }
}
