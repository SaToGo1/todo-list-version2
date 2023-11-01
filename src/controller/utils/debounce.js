export default function debounce (func, delay) {
  let timeoutID

  return function (...args) {
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      func(...args)
    }, delay)
  }
}
