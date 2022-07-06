/**
 * Executes a specified callback on browser screen repaint.
 * @param {Function} callback Callback to be executed on repaint.
 * @returns {Function} Function to call when the callback should be exectuted. When called, a function to cancel the tick would be returned.
 */
 export const animationTick = callback => {
  return (...args) => {
    let tickId = null;
    let canceled = false;

    const cancel = () => {
      canceled = true;
      cancelAnimationFrame(tickId);
    };

    /**
     * @type {FrameRequestCallback} 
     */
    const frame = timestamp => {
      if(typeof timestamp == 'number')
        callback(cancel, timestamp, ...args);

      if(!canceled)
        tickId = requestAnimationFrame(frame);
    };

    frame();
    return cancel;
  }
};

/**
 * Waits for a delay and executes a callback if not triggered before the delay time runs out.
 * @param {Function} callback Callback to be executed after the delay timer runs out.
 * @param {Number} [delay = 1000] Time in milliseconds specified for delay.
 * @returns {Function} Function to call when a debounce is to happen.
 */
export const debounce = (callback, delay = 1000) => {
  let timeoutId = null;

  const cancel = () => {
    if(timeoutId == null)
      return;

    globalThis.clearTimeout(timeoutId);
    timeoutId = null;
  }

  return (...args) => {
    cancel();
    timeoutId = setTimeout(() => callback(...args), delay);
  }
};

/**
 * Executes a specified callback on browser idle tick.
 * @param {Function} callback Callback to be executed on idle tick.
 * @param {IdleRequestOptions} options idle request options.
 * @returns {Function} Function to call when the callback should be exectuted. When called, a function to cancel the tick would be returned.
 */
 export const idleTick = (callback, options) => {
  return (...args) => {
    let tickId = null;
    let canceled = false;

    const cancel = () => {
      canceled = true;
      cancelIdleCallback(tickId);
    };

    /**
     * @type {IdleRequestCallback}
     */
    const frame = deadline => {
      while(deadline.timeRemaining() > 0)
        callback(cancel, deadline, ...args);

      if(!canceled)
        tickId = requestIdleCallback(frame, options);
    };

    frame({ didTimeout: true, timeRemaining: () => 0 });
    return cancel;
  }
};

/**
 * Executes callback in intervals of a specified delay if triggered.
 * @param {Function} callback Callback to be executed after the delay timer runs out.
 * @param {Number} [delay = 1000] Time in milliseconds specified for delay.
 * @returns {Function} Function to call when a throttle is to happen.
 */
export const throttle = (callback, delay = 1000) => {
  let waiting = false;
  let waitingArgs = null;

  const timeoutEndCallback = () => {
    if(!waitingArgs)
      return void (waiting = false);

    callback(...waitingArgs);
    setTimeout(timeoutEndCallback, delay);
    waitingArgs = null;
  };

  return (...args) => {
    if(waiting)
      return void (waitingArgs = args);

    callback(...args);
    setTimeout(timeoutEndCallback, delay);

    waiting = true;
  }
};

/**
 * Executes a specified callback after a specified every tick specified using a delay.
 * @param {Function} callback Callback to be executed after delay.
 * * @param {Number} [delay = 1000] Time in milliseconds specified for delay.
 * @param {Boolean} [immediate = false] Specifies whether the first tick happens immediately
 * @returns {Function} Function to call when the callback should be exectuted. When called, a function to cancel the tick would be returned.
 */
 export const tick = (callback, delay, immediate = false) => {
  return (...args) => {
    let tickId = null;
    let canceled = false;

    const cancel = () => {
      canceled = true;
      clearTimeout(tickId);
    };

    const frame = () => {
      callback(cancel, ...args);

      if(!canceled)
        tickId = setTimeout(frame, delay);
    };

    if(immediate)
      frame();
    else
      tickId = setTimeout(frame, delay);

    return cancel;
  }
};
