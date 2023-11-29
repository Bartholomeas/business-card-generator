export function debounce<T>(
  func: (...args: unknown[]) => void,
  timeout = 300,
): (...args: T[]) => void {
  let timer: NodeJS.Timeout;

  return (...args: T[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      console.log({ args });
      func(args);
    }, timeout);
  };
}
