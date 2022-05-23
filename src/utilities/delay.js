export const debounce = (callback, delay = 1000) => {
  let timeout = null;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(...args), delay);
  }
};

export const throttle = (callback, delay = 1000) => {
  let wait = false;
  let lastArgs = null;

  const timeoutCallback = () => {
    if(!lastArgs)
      return void (wait = false);

    callback(...lastArgs);
    lastArgs = null;
    setTimeout(timeoutCallback, delay);
  };

  return (...args) => {
    if(wait)
      return void (lastArgs = args);

    callback(...args);
    wait = true;
    setTimeout(
      timeoutCallback, 
      delay
    );
  }
};
