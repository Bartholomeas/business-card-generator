/**
 *
 * @description Util to debounce passed function effect by custom timeout.
 * @param callback - function that should be debounced
 * @param timeout - time after which function should be fired
 */
export const debounce = <T extends unknown[]>(callback: (...args: T) => void, timeout = 300) => {
  let timer: NodeJS.Timeout;

  return (...args: T) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, timeout);
  };
};
