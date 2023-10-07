import {
  HOME_SECTION,
  TODAY_SECTION,
  TOMORROW_SECTION,
  WEEK_SECTION,
  MONTH_SECTION
} from '../../constants/section-constants.js'

import * as dateFunctions from '../date-functions/dateFunctions.js'

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
  const today = dateFunctions.today()
  return tasks.filter(task => task.date === today)
}

function tomorrowFilter ({ tasks }) {
  // get tomorrow date in YYYY-MM-DD format
  const tomorrow = dateFunctions.tomorrow()

  return tasks.filter(task => task.date === tomorrow)
}

function WeekFilter ({ tasks }) {
  const startOfWeek = dateFunctions.startOfWeek()
  const endOfWeek = dateFunctions.endOfWeek()

  return tasks.filter(task => task.date >= startOfWeek && task.date <= endOfWeek)
}

function MonthFilter ({ tasks }) {
  const startOfMonth = dateFunctions.startOfMonth()
  const endOfMonth = dateFunctions.endOfMonth()

  return tasks.filter(task => task.date >= startOfMonth && task.date <= endOfMonth)
}

// to be fair this is not a filter but it makes sense to have it here
export function colorfilter ({ tasks, projects }) {
  return tasks.map(task => {
    if (task.projectID === null || task.projectID === '') {
      return null
    }

    const project = projects.find(project => project.id === task.projectID)
    return project?.color ? project.color : null
  })
}
