/* eslint-disable camelcase */
// CONSTANTS with class/Id strings from addTask Bar
import {
  mainAddTaskDiv,
  mainAddTaskButton,
  mainAddTaskInput,
  mainAddTaskIcon,
  mainAddTaskDiv_focus
} from '../../views/Layouts/main/mainPage'

export default class ControllerMain {
  constructor ({ view, taskModel }) {
    this.view = view
    this.taskModel = taskModel
    this.mainDiv = document.querySelector('.main')
  }

  initializeControllerMain = () => {
    console.log('controllerMain initialized')
    this.mainDiv.addEventListener('focusin', this._addTaskBarFocusOutline)
    this.mainDiv.addEventListener('focusout', this._addTaskBarFocusOutline)
    // this.mainDiv.addEventListener('click', this._MainDivHandler)
  }

  // _MainDivHandler = (event) => {
  //   this._addTaskBarFocus(event)
  // }

  _addTaskBarFocusOutline = (event) => {
    if (event.target.id === mainAddTaskDiv ||
    event.target.id === mainAddTaskButton ||
    event.target.id === mainAddTaskInput ||
    event.target.id === mainAddTaskIcon) {
      if (event.type === 'focusin') {
        document.querySelector(`#${mainAddTaskInput}`).focus()
        document.querySelector(`#${mainAddTaskDiv}`).classList.add(mainAddTaskDiv_focus)
      } else if (event.type === 'focusout') {
        document.querySelector(`#${mainAddTaskDiv}`).classList.remove(mainAddTaskDiv_focus)
      }
    }
  }
}
