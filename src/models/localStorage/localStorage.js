export function saveLocalStorage ({ item, array }) {
  // LOCAL STORAGE
  const taskJsonString = JSON.stringify(array)
  localStorage.setItem(item, taskJsonString)
}

export function loadLocalStorage ({ item }) {
  const storedTasks = localStorage.getItem(item)
  if (storedTasks) {
    const storedData = JSON.parse(storedTasks)

    return {
      isStoredInLocal: true,
      storedData
    }
  }

  return {
    isStoredInLocal: false,
    storedData: null
  }
}
