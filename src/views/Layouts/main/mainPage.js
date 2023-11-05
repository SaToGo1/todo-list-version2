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

const mainTaskPage = 'main__taskPage'
const mainTaskList = 'main__taskList'
const mainTaskListCompleted = 'main__taskListCompleted'
const mainTaskListNotCompleted = 'main__taskListNotCompleted'
export function renderPage ({ div, completedTasks, notCompletedTasks, name, colorCompletedTasks, colorNotCompletedTasks }) {
  const template = `
  <div class=${mainTaskPage}>
    <h2>${name}</h2>
    ${inputTaskBarTemplate()}
    <h3>Tasks</h3>
    <div class="${mainTaskList}" id="${mainTaskListNotCompleted}">
      ${notCompletedTasks.map((task, index) => {
        const color = colorNotCompletedTasks[index]
        return taskTemplate({ task, completed: false, color })
      }).join('')}
    </div>
    <h3>Completed</h3>
    <div class="${mainTaskList}" id="${mainTaskListCompleted}">
      ${completedTasks.map((task, index) => {
        const color = colorCompletedTasks[index]
        return taskTemplate({ task, completed: true, color })
      }).join('')}
    </div>
  </div>`

  div.innerHTML = template
}

export const mainTaskClass = 'main__task'
export const mainTaskIcon = 'main__taskIcon'
const mainTaskText = 'main__taskText'
const mainTaskTextCompleted = 'main__taskText-Completed'
export const mainTaskDate = 'main__taskDate'
export const mainTaskDelete = 'main__taskDelete'
function taskTemplate ({ task, completed, color }) {
  let icon
  let inputClass
  let colorBg = ''

  if (completed) {
    icon = circleCheck
    inputClass = mainTaskTextCompleted
  } else {
    icon = circle
    inputClass = mainTaskText
  }

  if (color) {
    // 33 is like adding 0.2 alpha
    let bgColor
    if (color === '#ffffff') bgColor = color
    else bgColor = color + '33'

    colorBg = `style="background-color: ${bgColor}"`
  }
  return `
  <div class="${mainTaskClass}" ${colorBg} data-task-id="${task.id}">
    <img class="${mainTaskIcon}" src="${icon}" alt="icon">
    <p class="${inputClass}">${task.title}</p>
    <input type="date" class="${mainTaskDate}" value="${task.date}">
    <button class="${mainTaskDelete}">X</button>
  </div>
  `
}

// export function renderMultipleTasks ({ completedTasks, notCompletedTasks, colorCompletedTasks, colorNotCompletedTasks }) {
//   const notCompletedDiv = document.querySelector(`#${mainTaskListNotCompleted}`)
//   const completedDiv = document.querySelector(`#${mainTaskListCompleted}`)

//   notCompletedDiv.innerHTML = ''
//   completedDiv.innerHTML = ''

//   const notCompletedTasksTemplate = `
//     ${notCompletedTasks.map((task, index) => {
//       const color = colorNotCompletedTasks[index]
//       return taskTemplate({ task, completed: false, color })
//     }).join('')}
//   `

//   const completedTasksTemplate = `
//     ${completedTasks.map((task, index) => {
//       const color = colorCompletedTasks[index]
//       return taskTemplate({ task, completed: true, color })
//     }).join('')}
//   `
//   notCompletedDiv.append(notCompletedTasksTemplate)
//   completedDiv.append(completedTasksTemplate)
// }

export function renderTask ({ task, color }) {
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
  const template = taskTemplate({ task, completed, color })

  div.insertAdjacentHTML('beforeend', template)
}

export function updatedTask ({ task }) {
  const taskElement = document.querySelector(`[data-task-id="${task.id}"]`)
  const paragraph = taskElement.querySelector('p')
  const date = taskElement.querySelector('input')

  paragraph.textContent = task.title
  date.value = task.date
}

const taskDetailDiv = 'taskDetails__div'
const taskDetailDivTitle = 'taskDetails__divTitle'
export const taskDetailIcon = 'taskDetails__icon'
export const taskDetailTitle = 'taskDetails__title'
const taskDetailProject = 'taskDetails__projects'
export const taskDetailDate = 'taskDetails__date'
const taskDetailDivDescription = 'taskDetails__divDescription'
export const taskDetailDescription = 'taskDetails__description'
const taskDetailsLabel = 'taskDetails__label'
export function taskDetailTemplate ({ task, project, projectArray }) {
  let icon

  if (task.completed) {
    icon = circleCheck
  } else {
    icon = circle
  }

  return `
    <div class="${taskDetailDiv}" data-task-id="${task.id}">
      <div class="${taskDetailDivTitle}">
        <img class="${taskDetailIcon}" src="${icon}" alt="icon">
        <div class="${taskDetailTitle}" contenteditable="true" data-task-id="${task.id}">${task.title}</div>
      </div>
      <hr class="taskDetail__hr">
      <label for="${taskDetailProject}" class="${taskDetailsLabel}">Select Project:</label>
      <select id="${taskDetailProject}" class="${taskDetailProject}">
        ${projectArray.map(proj => `<option data-project-selection-id=${proj.id}>${proj.name}</option>`).join('')}
      </select>
      <label for="${taskDetailDate}" class="${taskDetailsLabel}">Due Date:</label>
      <input id="${taskDetailDate}" type="date" class="${taskDetailDate}" value="${task.date}">

      <label for="${taskDetailDescription}" class="${taskDetailsLabel}">Task Description:</label>
      <div class="${taskDetailDivDescription}">
        <div id="${taskDetailDescription}" class="${taskDetailDescription}" contenteditable="true" data-task-id="${task.id}">${task.description}</div>
      </div>
    </div>

  `
}

export function renderTaskDetail ({ div, task, project, projectArray }) {
  const template = taskDetailTemplate({ task, project, projectArray })

  div.insertAdjacentHTML('beforeend', template)
}

const mainTaskActive = 'main__task-active'
export function activeTaskStyle ({ div }) {
  // Delete the active class of the previous active page.
  const tasks = document.querySelectorAll(`.${mainTaskClass}`)
  tasks.forEach(task => task.classList.remove(mainTaskActive))

  div?.classList.add(mainTaskActive)
}
