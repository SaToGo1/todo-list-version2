/* eslint-disable camelcase */
// CONSTANTS with class/Id strings from addTask Bar
import {
  mainAddTaskDiv,
  mainAddTaskButton,
  mainAddTaskInput,
  mainAddTaskIcon,
  mainAddTaskDiv_focus
} from '../../views/Layouts/main/mainPage'

import {
  HOME_SECTION,
  TODAY_SECTION,
  TOMORROW_SECTION,
  WEEK_SECTION,
  MONTH_SECTION
} from '../../constants/section-constants.js'

import * as dateFunctions from '../date-functions/dateFunctions.js'

export default class ControllerMain {
  constructor ({ view, taskModel, getCurrentProject, getCurrentSection }) {
    // CLASSES
    this.view = view
    this.taskModel = taskModel

    // CALLBAKCS
    this.getCurrentProjectID = getCurrentProject // get project id
    this.getCurrentSection = getCurrentSection // get section string

    // DOM
    this.mainDiv = document.querySelector('.main')
  }

  initializeControllerMain = () => {
    this.mainDiv.addEventListener('focusin', this._addTaskBarFocusOutline)
    this.mainDiv.addEventListener('focusout', this._addTaskBarFocusOutline)

    this.mainDiv.addEventListener('click', this._handleClick)
  }

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

  _handleClick = (event) => {
    // ADD TASK BAR -> adds a task on click
    this._handleAddTask(event)
  }

  _handleAddTask = (event) => {
    // click on the + button on the ADD TASK BAR
    if (event.target.id === mainAddTaskButton ||
    event.target.id === mainAddTaskIcon) {
      const taskTitle = document.querySelector(`#${mainAddTaskInput}`).value
      const projectID = this.getCurrentProjectID() // null or ID

      // by default return today so if we are in a project we get today.
      // also in month and week sections get the last day of week and month.
      const date = this._getDateBySection()

      const { newTask, isStored } = this.taskModel.createTask({ taskTitle, projectID, date })

      if (isStored) {
        this.view.renderTask({ task: newTask })
      } else {
        console.error('Task Not Stored')
      }
    }
  }

  _getDateBySection = () => {
    const section = this.getCurrentSection()

    switch (section) {
      case HOME_SECTION:
      case TODAY_SECTION:
        return dateFunctions.today()

      case TOMORROW_SECTION:
        return dateFunctions.tomorrow()

      case WEEK_SECTION:
        return dateFunctions.endOfWeek()

      case MONTH_SECTION:
        return dateFunctions.endOfMonth()

      default:
        return dateFunctions.today()
    }
  }
}
