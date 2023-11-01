export function today () {
  return new Date().toISOString().split('T')[0]
}

export function tomorrow () {
  const tomorrowDate = new Date()
  tomorrowDate.setDate(tomorrowDate.getDate() + 1)
  return tomorrowDate.toISOString().split('T')[0]
}

export function endOfWeek () {
  const endOfWeekDate = new Date()
  endOfWeekDate.setDate(endOfWeekDate.getDate() + (6 - endOfWeekDate.getDay()) + 1)
  return endOfWeekDate.toISOString().split('T')[0]
}

export function startOfWeek () {
  const startOfWeekDate = new Date()
  startOfWeekDate.setDate(startOfWeekDate.getDate() - startOfWeekDate.getDay())
  return startOfWeekDate.toISOString().split('T')[0]
}

export function endOfMonth () {
  const currentDate = new Date()
  const endOfMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
  endOfMonthDate.setDate(endOfMonthDate.getDate() - 1)
  // Set to the end of the day
  // it didnt give the correct date for timezone problem, with the next
  // line we solve it.
  endOfMonthDate.setHours(23, 59, 59, 999)
  return endOfMonthDate.toISOString().split('T')[0]
}

export function startOfMonth () {
  const startOfMonthDate = new Date()
  startOfMonthDate.setDate(1)
  return startOfMonthDate.toISOString().split('T')[0]
}
