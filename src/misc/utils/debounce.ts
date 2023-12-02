export function debounce<T extends string>(
  func: (...arg: T[]) => void,
  timeout = 300,
): (...args: T[]) => void {
  let timer: NodeJS.Timeout;

  return (...args: T[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}
