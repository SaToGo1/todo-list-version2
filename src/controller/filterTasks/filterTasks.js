export function filterCompletedTasks (tasks) {
  return tasks.filter(task => task.completed === true)
}

export function filterNotCompletedTasks (tasks) {
  return tasks.filter(task => task.completed === false)
}

export function filterBySection ({ tasks, section }) {
  return tasks
}

export function filterByProject ({ tasks, projectID }) {
  return tasks
}
