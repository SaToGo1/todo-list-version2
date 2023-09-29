/* eslint-disable camelcase */
import './mainPage.css'
import addProjectIcon from '../asset/plusBlue.svg'

const mainClass = 'main'
export function mainTemplate () {
  return (`
    <main class="${mainClass}" id="${mainClass}">
      ${inputTaskBar()}
      <h3>TasksProjects</h3>
      <h3>Completed Tasks</h3>
    </main>
  `)
}

// export function sectionLoad (data) {
//     return (`
//
//     `)
// }
export const mainAddTaskDiv = 'main__addTaskDiv'
export const mainAddTaskDiv_focus = 'main__addTaskDiv-focus'
export const mainAddTaskButton = 'main__addTaskButton'
export const mainAddTaskInput = 'main__addTaskInput'
export const mainAddTaskIcon = 'main__addTaskIcon'
function inputTaskBar () {
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

export function renderPage ({ div, completedTasks, notCompletedTasks, name }) {
  const template = `
  <main class="${mainClass}">
    <h2>${name}</h2>
    ${inputTaskBar()}
    <h3>Tasks</h3>
      ${notCompletedTasks.map(task => {
        return renderTask({ task })
      })}
    <h3>Completed</h3>
    ${completedTasks.map(task => {
      return renderTask({ task })
    })}
  </main>`

  div.innerHTML = `${template}`
}

const mainTaskClass = 'main__task'
const mainTaskIcon = 'main__taskIcon'
const mainTaskText = 'main__taskText'
const mainTaskDate = 'main__taskDate'
const mainTaskDelete = 'main__taskDelete'
function renderTask ({ task }) {
  return `
  <div class="${mainTaskClass}" id="${mainTaskClass}" data-task-id="${task.id}">
    <span class="${mainTaskIcon}"></span>
    <p class="${mainTaskText}">${task.title}</p>
    <input type="date" class="${mainTaskDate}" value="${task.date}">
    <button class="${mainTaskDelete}" id="${mainTaskDelete}">X</button>
  </div>
  `
}
