export default class RectObserver {
  #observed = new Map();

  constructor(callback) {
    this.#init(callback);
  }

  static ontick(callback) {
    callback();
    requestIdleCallback(() => this.ontick(callback));
  }

  #init(callback) {
    RectObserver.ontick(
      () => {
        let changed = [];

        for(let entry of this.#observed.entries()) {
          let rect = entry[0].getBoundingClientRect();

          for(let key in entry[1]) {
            if(entry[1][key] != rect[key]) {
              changed.push(
                {
                  rect,
                  target: entry[0]
                }
              );

              this.#observed.set(
                entry[0],
                {
                  x: rect.x,
                  y: rect.y,
                  width: rect.width,
                  height: rect.height,
                  top: rect.top,
                  right: rect.right,
                  bottom: rect.bottom,
                  left: rect.left
                }
              );
              break;
            }
          }
        }

        if(changed.length)
          callback(changed);
      }
    );
  }

  observe(element) {
    this.#observed.set(
      element,
      {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    );
  }
};
