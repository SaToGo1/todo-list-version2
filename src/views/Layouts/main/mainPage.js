/* eslint-disable camelcase */
import './mainPage.css'
import addProjectIcon from '../asset/plusBlue.svg'

import circle from '../asset/circle.svg'
import circleCheck from '../asset/circle-check.svg'

const mainClass = 'main'
export function mainTemplate () {
  return (`
    <main class="${mainClass}" id="${mainClass}">
      ${inputTaskBarTemplate()}
      <h3>TasksProjects</h3>
      <h3>Completed Tasks</h3>
    </main>
  `)
}

export const mainAddTaskDiv = 'main__addTaskDiv'
export const mainAddTaskDiv_focus = 'main__addTaskDiv-focus'
export const mainAddTaskButton = 'main__addTaskButton'
export const mainAddTaskInput = 'main__addTaskInput'
export const mainAddTaskIcon = 'main__addTaskIcon'
function inputTaskBarTemplate () {
  return `
    <div class=${mainAddTaskDiv} id=${mainAddTaskDiv}>
      <button class=${mainAddTaskButton} id="${mainAddTaskButton}">
        <img class="${mainAddTaskIcon}" id="${mainAddTaskIcon}" 
          src="${addProjectIcon}"
        >
      </button>
      <input class="${mainAddTaskInput}" id="${mainAddTaskInput}" 
        type="text" 
      >
    </div>
  `
}

const mainTaskList = 'main__taskList'
const mainTaskListCompleted = 'main__taskListCompleted'
const mainTaskListNotCompleted = 'main__taskListNotCompleted'
export function renderPage ({ div, completedTasks, notCompletedTasks, name }) {
  const template = `
  <main class="${mainClass}">
    <h2>${name}</h2>
    ${inputTaskBarTemplate()}
    <h3>Tasks</h3>
    <div class="${mainTaskList}" id="${mainTaskListNotCompleted}">
      ${notCompletedTasks.map(task => {
        return taskTemplate({ task, completed: false })
      }).join('')}
    </div>
    <h3>Completed</h3>
    <div class="${mainTaskList}" id="${mainTaskListCompleted}">
      ${completedTasks.map(task => {
        return taskTemplate({ task, completed: true })
      }).join('')}
    </div>
  </main>`

  div.innerHTML = template
}

const mainTaskClass = 'main__task'
export const mainTaskIcon = 'main__taskIcon'
const mainTaskText = 'main__taskText'
const mainTaskTextCompleted = 'main__taskText-Completed'
export const mainTaskDate = 'main__taskDate'
export const mainTaskDelete = 'main__taskDelete'
function taskTemplate ({ task, completed }) {
  let icon
  let inputClass
  if (completed) {
    icon = circleCheck
    inputClass = mainTaskTextCompleted
  } else {
    icon = circle
    inputClass = mainTaskText
  }
  return `
  <div class="${mainTaskClass}" data-task-id="${task.id}">
    <img class="${mainTaskIcon}" src="${icon}" alt="icon">
    <p class="${inputClass}">${task.title}</p>
    <input type="date" class="${mainTaskDate}" value="${task.date}">
    <button class="${mainTaskDelete}">X</button>
  </div>
  `
}

export function renderTask ({ task }) {
  let div
  let completed

  // render on completed list or not completed list.
  if (task.completed) {
    div = document.querySelector(`#${mainTaskListCompleted}`)
    completed = true
  } else {
    div = document.querySelector(`#${mainTaskListNotCompleted}`)
    completed = false
  }
  const template = taskTemplate({ task, completed })

  div.insertAdjacentHTML('beforeend', template)
}
