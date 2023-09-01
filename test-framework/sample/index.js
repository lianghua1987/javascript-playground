export function forEach(arr, fn) {
  for (let element of arr) {
    fn(element);
  }
}