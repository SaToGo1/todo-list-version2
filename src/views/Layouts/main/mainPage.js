/* eslint-disable camelcase */
import './mainPage.css'
import addProjectIcon from '../asset/plusBlue.svg'

export function mainTemplate () {
  const mainClass = 'main'

  return (`
    <main class="${mainClass}">
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
export function inputTaskBar () {
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
