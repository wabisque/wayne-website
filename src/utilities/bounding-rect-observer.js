import { animationTick } from './timing.js';

export default class BoundingRectObserver {
  #callback;
  #changed = [];
  #hasTick = false;
  #observed = new Map();

  constructor(callback) {
    this.#callback = callback;
  }

  #tick(clear) {
    if(this.#observed.size == 0) {
      this.#hasTick = false;
      clear();
    }

    for(const entry of this.#observed) {
      const [ target, boundingRect ] = entry;
      const newBoundingRect = target.getBoundingClientRect();

      for(const key in boundingRect) {
        const value = boundingRect[key];
        const newValue = newBoundingRect[key];

        if(value != newValue) {
          boundingRect[key] = newValue;
          this.#changed.push({ boundingRect: newBoundingRect, target });
        }
      }
    }

    if(this.#changed.length > 0) {
      this.#callback([ ...this.#changed ]);
      this.#changed.splice(0);
    }
  }

  disconnect() {
    this.#observed.clear();
  }

  observe(element) {
    this.#observed.set(element, element.getBoundingClientRect());

    if(!this.#hasTick) {
      this.#hasTick = true;
      animationTick(this.#tick.bind(this))();
    }
  }

  unobserve(element) {
    this.#observed.delete(element);
  }
};
