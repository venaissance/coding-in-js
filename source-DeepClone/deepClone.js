class DeepClone {
  constructor() {
    this.cacheList = [];
  }
  clone(source) {
    if (source instanceof Object) {
      const cache = this.findCache(source);
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
        }
        this.cacheList.push([source, target]);
        for (let key in source) {
          if (source.hasOwnProperty(key)) {
            target[key] = this.clone(source[key]);
          }
        }
        return target;
      }
    }
    return source;
  }
  findCache(source) {
    for (let i = 0; i < this.cacheList.length; ++i) {
      if (this.cacheList[i][0] === source) {
        return this.cacheList[i][1];
      }
    }
    return undefined;
  }
}
