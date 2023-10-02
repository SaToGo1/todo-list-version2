import {
  TODAY_SECTION,
  TOMORROW_SECTION,
  WEEK_SECTION,
  MONTH_SECTION
} from '../../constants/section-constants.js'

export function filterCompletedTasks ({ tasks }) {
  return tasks.filter(task => task.completed === true)
}

export function filterNotCompletedTasks ({ tasks }) {
  return tasks.filter(task => task.completed === false)
}

export function filterBySection ({ tasks, section }) {
  switch (section) {
    // Today don't need a filter as it loads all the tasks.
    case TODAY_SECTION:
      console.log('Today filter')
      return todayFilter({ tasks })
    case TOMORROW_SECTION:
      console.log('Tomorrow filter')
      break
    case WEEK_SECTION:
      console.log('Week filter')
      break
    case MONTH_SECTION:
      console.log('Week filter')
      break
    default:
      console.error('default case for filter sections, should not get here')
  }
  return tasks
}

export function filterByProject ({ tasks, projectID }) {
  return tasks.filter(task => task.projectID === projectID)
}

function todayFilter ({ tasks }) {
  // get today date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0]
  return tasks.filter(task => task.date === today)
}
