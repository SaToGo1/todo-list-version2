export function filterCompletedTasks (tasks) {
  return tasks.filter(task => task.completed === true)
}

export function filterNotCompletedTasks (tasks) {
  return tasks.filter(task => task.completed === false)
}
