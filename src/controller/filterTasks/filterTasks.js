import {
  HOME_SECTION,
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

export function filterByProject ({ tasks, projectID }) {
  return tasks.filter(task => task.projectID === projectID)
}

export function filterBySection ({ tasks, section }) {
  switch (section) {
    // Home case does not do anything just here to unify all the code of sections.
    case HOME_SECTION:
      return tasks

    case TODAY_SECTION:
      return todayFilter({ tasks })

    case TOMORROW_SECTION:
      return tomorrowFilter({ tasks })

    case WEEK_SECTION:
      return WeekFilter({ tasks })

    case MONTH_SECTION:
      return MonthFilter({ tasks })

    default:
      console.error('default case for filter sections, should not get here')
  }
  // should not get here after finishing
  return tasks
}

function todayFilter ({ tasks }) {
  // get today date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0]
  return tasks.filter(task => task.date === today)
}

function tomorrowFilter ({ tasks }) {
  // get tomorrow date in YYYY-MM-DD format
  let tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow = tomorrow.toISOString().split('T')[0]

  return tasks.filter(task => task.date === tomorrow)
}

function WeekFilter ({ tasks }) {
  const currentDate = new Date()

  const startOfWeek = new Date(currentDate)
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
  const startOfWeekFormatted = startOfWeek.toISOString().split('T')[0]

  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 6)
  const endOfWeekFormatted = endOfWeek.toISOString().split('T')[0]

  return tasks.filter(task => task.date >= startOfWeekFormatted && task.date <= endOfWeekFormatted)
}

function MonthFilter ({ tasks }) {
  const currentDate = new Date()

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  const startOfMonthFormatted = startOfMonth.toISOString().split('T')[0]

  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
  const endOfMonthFormatted = endOfMonth.toISOString().split('T')[0]

  return tasks.filter(task => task.date >= startOfMonthFormatted && task.date <= endOfMonthFormatted)
}
