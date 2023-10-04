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
export function renderPage ({ div, completedTasks, notCompletedTasks, name, projectModel }) {
  const template = `
  <main class="${mainClass}">
    <h2>${name}</h2>
    ${inputTaskBarTemplate()}
    <h3>Tasks</h3>
    <div class="${mainTaskList}" id="${mainTaskListNotCompleted}">
      ${notCompletedTasks.map(task => {
        const project = projectModel.getProject({ projectID: task.projectID })
        return taskTemplate({ task, completed: false, project })
      }).join('')}
    </div>
    <h3>Completed</h3>
    <div class="${mainTaskList}" id="${mainTaskListCompleted}">
      ${completedTasks.map(task => {
        const project = projectModel.getProject({ projectID: task.projectID })
        return taskTemplate({ task, completed: true, project })
      }).join('')}
    </div>
  </main>`

  div.innerHTML = template
}

const mainTaskClass = 'main__task'
const mainTaskIcon = 'main__taskIcon'
const mainTaskText = 'main__taskText'
const mainTaskProject = 'main__taskProject'
const mainTaskProjectText = 'main_taskProjectText'
const mainTaskDate = 'main__taskDate'
const mainTaskDelete = 'main__taskDelete'
function taskTemplate ({ task, completed, project }) {
  let icon
  if (completed) {
    icon = circleCheck
  } else {
    icon = circle
  }

  let projectTemplate
  if (project !== undefined) {
    projectTemplate = `    
    <div class="${mainTaskProject}">
      <img>
      <p class="${mainTaskProjectText}">${project.name}</p>
    </div>`
  } else {
    projectTemplate = `
    <div class="${mainTaskProject}"></div>
    `
  }

  return `
  <div class="${mainTaskClass}" data-task-id="${task.id}">
    <img class="${mainTaskIcon}" src="${icon}" alt="icon">
    <p class="${mainTaskText}">${task.title}</p>
    ${projectTemplate}
    <input type="date" class="${mainTaskDate}" value="${task.date}">
    <button class="${mainTaskDelete}">X</button>
  </div>
  `
}

export function renderTask ({ task, project }) {
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
  const template = taskTemplate({ task, completed, project })

  div.insertAdjacentHTML('beforeend', template)
}
